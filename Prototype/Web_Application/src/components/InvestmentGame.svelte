<script>
  import { onMount } from "svelte";
  import { calculatePortfolioValue } from "../components/calculatePortfolio.js";
  import { send_dinosaur } from "../components/post2sheet.js";
  import Portfolio from "../components/Portfolio.svelte";
  import EmotionSurvey from "../components/EmotionSurvey.svelte";
  import { quizData } from "../lib/stores/store-quiz.js";
  // import { currentPage } from "$lib/stores/currentPage.js";

  let currentQuizData = $quizData;
  let prophecyOrder = currentQuizData.prophecy_order;

  export let onNavigate;
  // export let currentPage;

  // const next = (n) => () => onNavigate($currentPage + n);

  let initial_value = 10000; // Starting portfolio value
  let current_value = initial_value;
  let percentage_change = 0;
  let total_assets = initial_value;

  let currentRound = 1;
  let totalRounds = 10;
  let progress = 0;
  let decisionTime = 0;
  let roundStartTime = new Date().getTime();

  let highRisk = 30;
  let mediumRisk = 40;
  let lowRisk = 30;
  let lastEdited = "";
  let highRiskValue = initial_value * (highRisk / 100);
  let mediumRiskValue = initial_value * (mediumRisk / 100);
  let lowRiskValue = initial_value * (lowRisk / 100);

  let prevHighRisk = highRisk;
  let prevMediumRisk = mediumRisk;
  let prevLowRisk = lowRisk;

  let valuesHistory = [initial_value];
  let roundHistory = ["Start"];
  let highRiskHistory = [highRisk];
  let mediumRiskHistory = [mediumRisk];
  let lowRiskHistory = [lowRisk];
  let decisionTimeHistory = ["na"];

  import { initializeAreaChart } from "./area-chart.js";
  import { initializePieChart } from "./pie-chart.js";

  let areaChart;
  let pieChart;

  let showModal = false; // view category details
  let showModal_alert = false;
  let showModal_emotion = false;
  let showModal_nextRound = false;
  let showModal_news = false;
  let showModal_portfolio = false;
  let showModal_viewPredictions = false;

  function formatNumber(number) {
    return new Intl.NumberFormat("en-US").format(number);
  }

  $: roundMessage =
    currentRound === totalRounds - 1
      ? `Fast forward to <strong>Year ${
          currentRound + 1
        }</strong>...<br>This is the <strong>final</strong> round.`
      : `Fast forward to <strong>Year ${currentRound + 1}</strong>...`;

  function closeModal() {
    showModal = !showModal;
  }

  function closeModal_alert() {
    showModal_alert = !showModal_alert;
  }

  function closeModal_emotion() {
    showModal_emotion = !showModal_emotion;
  }

  function closeModal_portfolio() {
    showModal_portfolio = !showModal_portfolio;
  }

  function handleOutsideClick(event) {
    if (event.target.classList.contains("modal")) {
      closeModal();
    }
  }

  let showLoading = false;

  let messages = ["", "", "", ""]; // Placeholder for messages to show in sequence
  let currentMessageIndex = 0; // Current index of the message to show

  export function showModalWithDelay() {
    showLoading = true; // Show loading effect
    messages = [
      "Gathering the stars for guidance...",
      "Mixing the elixirs of insight...",
      "Whizzing up the prophecies...",
      // "A human expert is reviewing your results...",
    ];
    currentMessageIndex = 0;

    const showMessage = (index) => {
      if (index < messages.length) {
        messages[index] = messages[index]; // Update the current message to be visible
        currentMessageIndex = index;
        setTimeout(() => showMessage(index + 1), 3000);
      } else {
        showLoading = false;
        showModal_viewPredictions = true;
      }
    };

    showMessage(0); // Start showing messages from the first one
  }

  onMount(() => {
    showModal_portfolio = true;
    areaChart = initializeAreaChart("area-chart");
    pieChart = initializePieChart("pie-chart");
  });

  function update_pie_chart(values) {
    pieChart.data.datasets[0].data = [
      values.high_risk,
      values.medium_risk,
      values.low_risk,
    ];
    pieChart.update();
  }

  function add_to_area_chart(label, value) {
    areaChart.data.labels.push(label);

    areaChart.data.datasets.forEach((dataset) => {
      dataset.data.push(value);
    });
    areaChart.update();
  }

  $: allocations = {
    high_risk: highRisk,
    medium_risk: mediumRisk,
    low_risk: lowRisk,
  };

  $: totalAllocation = highRisk + mediumRisk + lowRisk;

  $: total_assets = (current_value * totalAllocation) / 100;

  $: (prevHighRisk = highRisk),
    (prevMediumRisk = mediumRisk),
    (prevLowRisk = lowRisk);

  let alertMessage = "";

  function updateAllocation(type) {
    lastEdited = type; // Update last edited field
    // console.log("last edited: " + lastEdited);

    if (!validateTotal()) {
      var totalAllocationElement = document.getElementById("total-allocation");
      if (totalAllocationElement) {
        totalAllocationElement.style.color = "red";
      }
      return;
    } else {
      var totalAllocationElement = document.getElementById("total-allocation");
      if (totalAllocationElement) {
        totalAllocationElement.style.color = "";
      }
      update_pie_chart(allocations); // Update pie chart only if total is valid
    }
    // if (!greaterThanZero()) {
    //   alertMessage = "Allocation cannot be 0.";
    //   showModal_alert = true;
    //   revertLastEdited();
    // }
  }

  function validateTotal() {
    return totalAllocation <= 100;
  }

  // function greaterThanZero() {
  //   return highRisk > 0 && mediumRisk > 0 && lowRisk > 0;
  // }

  // Revert last edited allocation if total exceeds 100%
  // function revertLastEdited() {
  //   if (lastEdited === "highRisk") highRisk -= totalAllocation - 100;
  //   else if (lastEdited === "mediumRisk") mediumRisk -= totalAllocation - 100;
  //   else if (lastEdited === "lowRisk") lowRisk -= totalAllocation - 100;
  // }

  function updateProgressBar() {
    progress = (currentRound / totalRounds) * 100;
  }

  updateProgressBar(); // Initialize progress bar

  function nextRound() {
    if (currentRound < totalRounds) {
      currentRound += 1;
      // console.log(`Moving to round ${currentRound}`);
      initial_value = current_value;

      updateProgressBar();
      // reallocate();
      showNextString();
      roundStartTime = new Date().getTime(); // Record the start time of the round
    } else {
      // Handle end of game scenario
      showModalWithDelay();
    }
  }

  // re-allocate assets based on recent allocation at the start of each round -> not needed since will be reallocated based on user-made allocation anyways
  // function reallocate() {
  //   highRiskValue = initial_value * (highRisk / 100);
  //   mediumRiskValue = initial_value * (mediumRisk / 100);
  //   lowRiskValue = initial_value * (lowRisk / 100);
  //   console.log(
  //     "re-allocated category values: " + highRiskValue,
  //     mediumRiskValue,
  //     lowRiskValue
  //   );
  // }

  function confirmChoices() {
    if (!validateTotal()) {
      alertMessage =
        "Total allocation exceeds 100.<br />Please adjust your inputs.";
      showModal_alert = true;
      // revertLastEdited();
    } else {
      // Calculate decision time
      let currentTime = new Date().getTime();
      decisionTime = (currentTime - roundStartTime) / 1000; // Convert to seconds
      // console.log(
      //   "Decision time: " +
      //     currentTime +
      //     "-" +
      //     roundStartTime +
      //     "=" +
      //     decisionTime +
      //     " seconds"
      // );

      if (currentRound <= totalRounds) {
        showModal_emotion = true;
      }
    }
  }

  function afterEmotionSurvey() {
    if (currentRound < totalRounds) {
      showModal_nextRound = true;
    } else {
      afterRoundCompleted();
    }
  }

  function showInvestmentNews() {
    showModal_nextRound = false;
    showNextNews();
    showModal_news = true;
  }

  function afterRoundCompleted() {
    showModal_news = false;
    calculateRound();
    // console.log("calculated round");

    valuesHistory.push(current_value);
    roundHistory.push(`Round ${roundHistory.length}`);
    highRiskHistory.push(highRisk);
    mediumRiskHistory.push(mediumRisk);
    lowRiskHistory.push(lowRisk);
    decisionTimeHistory.push(decisionTime);

    quizData.update((currentData) => {
      return {
        ...currentData,
        round: currentRound,
        highRisk,
        mediumRisk,
        lowRisk,
        initialValue: initial_value,
        currentValue: current_value,
        decisionTime: decisionTime,
        valuesHistory: valuesHistory,
        roundHistory: roundHistory,
        highRiskHistory: highRiskHistory,
        mediumRiskHistory: mediumRiskHistory,
        lowRiskHistory: lowRiskHistory,
        decisonTimeHistory: decisionTimeHistory,
      };
    });

    // quizData.subscribe((value) => {
    //   console.log(value);
    // });

    let formData = new FormData();

    // Subscribe to the store to dynamically respond to data changes
    quizData.subscribe(($quizData) => {
      Object.keys($quizData).forEach((key) => {
        formData.append(key, $quizData[key]);
      });
    });
    send_dinosaur(formData);
    nextRound();
  }

  let new_highRisk = highRiskValue;
  let new_mediumRisk = mediumRiskValue;
  let new_lowRisk = lowRiskValue;
  let percentage_change_high_risk = 0;
  let percentage_change_medium_risk = 0;
  let percentage_change_low_risk = 0;
  let value_difference = 0;
  let value_difference_high_risk = 0;
  let value_difference_medium_risk = 0;
  let value_difference_low_risk = 0;

  // Function to handle the calculation on each round
  function calculateRound() {
    // calculate new portfolio value based on new allocation
    let new_total_values = calculatePortfolioValue(
      allocations,
      current_value,
      // highRiskValue,
      // mediumRiskValue,
      // lowRiskValue
    );

    current_value = new_total_values[0];
    percentage_change = new_total_values[1];
    value_difference = current_value - initial_value;

    new_highRisk = new_total_values[2].high_risk;
    new_mediumRisk = new_total_values[2].medium_risk;
    new_lowRisk = new_total_values[2].low_risk;
    // console.log(
    //   "new values per category: " + new_highRisk,
    //   new_mediumRisk,
    //   new_lowRisk
    // );

    value_difference_high_risk = new_total_values[4].high_risk.toFixed(2);
    value_difference_medium_risk = new_total_values[4].medium_risk.toFixed(2);
    value_difference_low_risk = new_total_values[4].low_risk.toFixed(2);
    // console.log(
    //   "value difference per category: " + value_difference_high_risk,
    //   value_difference_medium_risk,
    //   value_difference_low_risk
    // );

    percentage_change_high_risk = new_total_values[3].high_risk.toFixed(0);
    percentage_change_medium_risk = new_total_values[3].medium_risk.toFixed(0);
    percentage_change_low_risk = new_total_values[3].low_risk.toFixed(0);

    // console.log(
    //   "percentage change per category: " + percentage_change_high_risk,
    //   percentage_change_medium_risk,
    //   percentage_change_low_risk
    // );

    add_to_area_chart(currentRound, current_value);
    // console.log("added to area chart");
    // valuesHistory.push(current_value); // Add new value to history
    // roundLabels.push(`Round ${roundLabels.length}`); // Update round labels
    // console.log(valuesHistory);
    // console.log(roundLabels);
  }

  // 9 annoucements. 3 positive -> 2 negative -> 2 positive -> 2 negative
  let announcements = [
    "Financial analysts, referencing Bloomberg, anticipate substantial returns in the high risk high return sector within the upcoming quarter.",
    "Ongoing market trends suggest a growing interest in high risk high return investment opportunities, as new investors flock to the sector.",
    "Experts in finance predict a robust performance in the high risk high return segment, forecasting notable gains in the near term.",
    "Due to an unexpected market downturn, a major company in the high risk high return category abruptly declares bankruptcy, leaving investors in shock.",
    "Due to continuing volatile market conditions, the performance of high risk high return segment is plummeting.",
    "A company in the high risk high return sector just launches a new groundbreaking product that is projected to increase the company’s value by 10x, shifting investor sentiment.",
    "Warren Buffett reveals that he has just invested $1 million in a company in the high risk high return sector.",
    "The Central Bank has just declared economic recession, and many businesses in the high risk high return segment are filing for bankruptcy, pushing investors into panic mode. ",
    "In the face of ongoing economic challenges, stakeholders in high risk high return ventures are rapidly withdrawing their funds.",
  ];

  let shuffledList = announcements.slice(); // Create a copy to shuffle
  shuffle(shuffledList); // Shuffle the copy

  // Function to shuffle the array using the Fisher-Yates algorithm
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  let currentIndex = 0;
  let currentString;
  let investmentNews;
  let isShaking = false;

  // for news pop-up before each round
  function showNextNews() {
    currentString = announcements[currentIndex];
    investmentNews = currentString;
    // currentIndex++;
  }

  // Function to show the next string - no shuffle
  function showNextString() {
    currentString = announcements[currentIndex];
    investmentNews = ""; //hide before showing
    currentIndex++;

    setTimeout(() => {
      isShaking = true;
      // investmentNews = "Market Report: " + currentString;
      investmentNews = currentString;
      setTimeout(() => {
        isShaking = false;
      }, 3000); // Delay before showing the next news
    }, 1000); // Delay to make the previous news disappear
  }

  // Function to show the next string - shuffle
  // function showNextString() {
  //   if (currentIndex < shuffledList.length) {
  //     currentString = shuffledList[currentIndex];
  //     investmentNews = "";
  //     currentIndex++;

  //     setTimeout(() => {
  //       isShaking = true;
  //       investmentNews = "Market Trends: " + currentString;
  //       setTimeout(() => {
  //         isShaking = false;
  //       }, 3000); // Delay before showing the next news
  //     }, 1000); // Delay to make the previous news disappear
  //   } else {
  //     currentIndex = 0;
  //     shuffle(shuffledList);
  //     currentString = shuffledList[currentIndex]; // Update to trigger reactivity
  //     currentIndex++;
  //   }
  // }
</script>

<!-- pop-up modals -->

<Portfolio show={showModal_portfolio} onClose={closeModal_portfolio} />

<EmotionSurvey
  show={showModal_emotion}
  onClose={closeModal_emotion}
  onSubmitted={afterEmotionSurvey}
/>

{#if showModal_alert === true}
  <div class="modal">
    <div class="modal-content-loading" on:click|stopPropagation>
      <p>{@html alertMessage}</p>
      <button on:click={closeModal_alert}>OK</button>
    </div>
  </div>
{/if}

{#if showModal_nextRound === true}
  <div class="modal">
    <div class="modal-content-loading" on:click|stopPropagation>
      <img src="/images/Clock.gif" alt="Clock turning" style="width: 50px;" />
      <p>Re-allocating your portfolio based on your choices...</p>
      <p>{@html roundMessage}</p>

      <button on:click={showInvestmentNews}>Continue</button>
    </div>
  </div>
{/if}

{#if showModal_news === true}
  <div class="modal">
    <div class="modal-content-loading" on:click|stopPropagation>
      <p><strong>Latest Market Report </strong></p>
      <p>
        {#each investmentNews.split(/\b(high risk high return|medium risk medium return|low risk low return)\b/) as word}
          {#if word == "high risk high return" || word == "medium risk medium return" || word == "low risk low return"}
            <strong style="color:#ED2277;">{word}</strong>
          {:else}
            {word}
          {/if}
        {/each}
      </p>

      <button on:click={afterRoundCompleted}>OK</button>
    </div>
  </div>
{/if}

{#if showLoading}
  <div class="modal">
    <div
      class="modal-content"
      style="text-align: center;"
      on:click|stopPropagation
    >
      <img src="/images/diagram_2.gif" alt="diagram" style="width: 100%;" />
      <p>{messages[currentMessageIndex]}</p>
    </div>
  </div>
{/if}

{#if showModal_viewPredictions === true}
  <div class="modal">
    <div
      class="modal-content"
      style="text-align: center;"
      on:click|stopPropagation
    >
      <img src="/images/crystal.gif" alt="crystal ball" style="width: 50px;" />
      <h3>Your predictions are ready!</h3>
      <p>
        We've gathered three predictions about your future investment behavior
        based on your answers and game interactions. As you review them one by
        one, we'll ask you to answer some questions.
      </p>
      <button on:click={onNavigate(prophecyOrder[0])}
        >View my predictions</button
      >
    </div>
  </div>
{/if}

<!-- game container -->

<div id="investment-game">
  <div class="header">
    <h2>Your investment dashboard</h2>
    <!-- <h3>Current Year: {currentRound}</h3> -->
  </div>
  <div class="sub-header">
    <div>
      <div id="portfolio-value">
        Current Portfolio Value: ${formatNumber(current_value)}
      </div>
      <div
        id="percentage-change"
        style="color: {percentage_change >= 0 ? '#018709' : '#d12f06'}; 
        background-color: {percentage_change >= 0 ? '#daf2db' : '#ffe0d9'};"
      >
        {percentage_change > 0 ? "+" : ""}{formatNumber(
          value_difference.toFixed(2),
        )} ({percentage_change}%)
      </div>
    </div>
    <div>Current Year: {currentRound}</div>
  </div>
  <div class="container">
    <div id="chart" class="one">
      <div class="area-chart-container">
        <canvas id="area-chart" />
      </div>
    </div>

    <div class="two">
      <div id="news" class:shake={isShaking}>
        <p>
          {#if currentRound === 1}
            <p>
              <strong>Instructions: </strong>
              Your recommended allocation has been set for the first year. You may
              edit your allocation at every round. Your assets will be re-allocated
              based on your choices.
            </p>
            <p><i>*Any announcements will appear here.</i></p>
          {:else}
            {#each investmentNews.split(/\b(Market Report: |high risk high return|medium risk medium return|low risk low return)\b/) as word}
              {#if word == "Market Report: "}
                <strong>{word}</strong>
              {:else if word == "high risk high return" || word == "medium risk medium return" || word == "low risk low return"}
                <strong style="color:#ED2277;">{word}</strong>
              {:else}
                {word}
              {/if}
            {/each}
          {/if}
        </p>
      </div>
    </div>

    <div id="allocation" class="three" style="text-align: center;">
      <div class="pie-chart-container">
        <canvas id="pie-chart" />
      </div>

      <div id="portfolio-recommendation">
        <button id="view-details" on:click={() => (showModal = true)}
          >View details</button
        >
        <!-- The Modal -->
        {#if showModal}
          <div class="modal" on:click={handleOutsideClick}>
            <!-- Modal content -->
            <div class="modal-content" on:click|stopPropagation>
              <span class="close" on:click={closeModal}>&times;</span>
              <h3>Details</h3>
              <h4>High Risk/Return Option:</h4>
              <ul>
                <li>
                  1/3 probability of winning <strong>3x</strong> each round
                </li>
                <li>
                  2/3 probability of losing up to <strong>50%</strong> each round
                </li>
              </ul>
              <h4>Medium Risk/Return Option:</h4>
              <ul>
                <li>
                  1/2 probability of winning <strong>2x</strong> each round
                </li>
                <li>
                  1/2 probability of losing up to <strong>25%</strong> each round
                </li>
              </ul>
              <h4>Low Risk/Return Option:</h4>
              <ul>
                <li>
                  2/3 probability of winning <strong>10%</strong> each round
                </li>
                <li>
                  1/3 probability of losing up to <strong>5%</strong> each round
                </li>
              </ul>
            </div>
          </div>
        {/if}
      </div>
    </div>

    <div class="four">
      <div id="investment">
        <div id="choices">
          <div class="choice" style="margin: 0 0 5px 0;">
            <div style="display: inline-block; width: 19em;" />
            <div style="display: inline-block; width: 13em;">
              <strong>New allocation</strong>
            </div>
            <div style="display: inline-block;">
              <strong>Current value</strong>
            </div>
          </div>
          <div class="choice">
            <svg width="12" height="12" style="margin: 0 7px 0 0;">
              <rect width="12" height="12" style="fill:#ED2277;" />
            </svg>
            <div style="display: inline-block; width: 19em;">
              <p style="display: inline-block;">High Risk High Returns</p>
            </div>
            <div style="display: inline-block; width: 12em;">
              <input
                class="allocation-input"
                id="highRisk"
                type="number"
                bind:value={highRisk}
                on:input={() => updateAllocation("highRisk")}
              /> %
            </div>
            <div>
              <p style="display: inline-block; margin: 0 5px 0 0;">
                <strong>${formatNumber(new_highRisk.toFixed(2))}</strong>
              </p>
              <br />
              <div
                id="percentage-change"
                style="color: {percentage_change_high_risk >= 0
                  ? '#018709'
                  : '#d12f06'}; 
            background-color: {percentage_change_high_risk >= 0
                  ? '#daf2db'
                  : '#ffe0d9'};"
              >
                {percentage_change_high_risk > 0 ? "+" : ""}{formatNumber(
                  value_difference_high_risk,
                )} ({percentage_change_high_risk}%)
              </div>
            </div>
          </div>
          <div class="choice">
            <svg width="12" height="12" style="margin: 0 5px 0 0;">
              <rect width="12" height="12" style="fill:#B8EB27;" />
            </svg>
            <div style="display: inline-block; width: 19em;">
              <p style="display: inline-block;">Medium Risk Medium Returns</p>
            </div>
            <div style="display: inline-block; width: 12em;">
              <input
                class="allocation-input"
                id="highRisk"
                type="number"
                bind:value={mediumRisk}
                on:input={() => updateAllocation("mediumRisk")}
              /> %
            </div>
            <div>
              <p style="display: inline-block; margin: 0 5px 0 0;">
                <strong>${formatNumber(new_mediumRisk.toFixed(2))}</strong>
              </p>
              <br />
              <div
                id="percentage-change"
                style="color: {percentage_change_medium_risk >= 0
                  ? '#018709'
                  : '#d12f06'}; 
              background-color: {percentage_change_medium_risk >= 0
                  ? '#daf2db'
                  : '#ffe0d9'};"
              >
                {percentage_change_medium_risk > 0 ? "+" : ""}{formatNumber(
                  value_difference_medium_risk,
                )} ({percentage_change_medium_risk}%)
              </div>
            </div>
          </div>
          <div class="choice">
            <svg width="12" height="12" style="margin: 0 5px 0 0;">
              <rect width="12" height="12" style="fill:#2F58E6;" />
            </svg>
            <div style="display: inline-block; width: 19em;">
              <p style="display: inline-block;">Low Risk Low Returns</p>
            </div>
            <div style="display: inline-block; width: 12em;">
              <input
                class="allocation-input"
                id="highRisk"
                type="number"
                bind:value={lowRisk}
                on:input={() => updateAllocation("lowRisk")}
              /> %
            </div>
            <div>
              <p style="display: inline-block; margin: 0 5px 0 0;">
                <strong>${formatNumber(new_lowRisk.toFixed(2))}</strong>
              </p>
              <br />
              <div
                id="percentage-change"
                style="color: {percentage_change_low_risk >= 0
                  ? '#018709'
                  : '#d12f06'}; 
              background-color: {percentage_change_low_risk >= 0
                  ? '#daf2db'
                  : '#ffe0d9'};"
              >
                {percentage_change_low_risk > 0 ? "+" : ""}{formatNumber(
                  value_difference_low_risk,
                )} ({percentage_change_low_risk}%)
              </div>
            </div>
          </div>
        </div>
        <div>
          <p id="total-allocation" style="margin: 2px; text-align: center;">
            Total allocated: <strong>{formatNumber(totalAllocation)}%</strong>
          </p>
          <p style="margin-top: 2px; text-align: center;">
            Assets to be re-allocated: <strong
              >${formatNumber(total_assets.toFixed(2))} out of ${formatNumber(
                current_value,
              )}</strong
            >
          </p>
        </div>
        <button id="confirm-choices" on:click={confirmChoices}>
          Confirm allocation and continue
        </button>
      </div>
    </div>
  </div>
  <div id="progress-bar">
    <div style="width: {progress}%;" />
  </div>
</div>

<style>
  * {
    box-sizing: border-box;
  }

  #investment-game {
    width: 100%;
    margin: auto;
  }

  #investment {
    margin-bottom: 25px;
  }

  .header {
    display: flex; /* This turns flexbox on for the container */
    justify-content: space-between; /* This spaces the h3 and p apart */
    align-items: center;
    margin-bottom: 0px;
    margin-top: 0;
  }
  .sub-header {
    display: flex; /* This turns flexbox on for the container */
    justify-content: space-between; /* This spaces the h3 and p apart */
    align-items: center;
    margin-top: 8px;
    margin-bottom: 15px;
    font-size: 17px;
    font-weight: bold;
  }
  #portfolio-value {
    display: inline-block;
    margin-right: 10px;
  }
  #percentage-change {
    display: inline-block;
    font-size: 11.5px;
    /* width: 65px; */
    text-align: center;
    padding: 3px 5px;
    border-radius: 5px;
    font-weight: bold;
  }

  .container {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
    grid-auto-rows: 48% 52%;
  }

  .one {
    grid-column: 1 / 5;
    grid-row: 1;
    /* display: grid;
    place-items: center; */
    /* background: #f2f2f2; */
  }
  .two {
    grid-column: 5 / 8;
    grid-row: 1;
    display: grid;
    place-items: center;
    /* background: #f2f2f2; */
  }
  .three {
    grid-column: 1 / 3;
    grid-row: 2;
    /* display: grid;
    place-items: center; */
    /* background: #f2f2f2; */
  }
  .four {
    grid-column: 3 / 8;
    grid-row: 2;
    display: grid;
    place-items: center;
    padding: 0 0 0.5em 0;
    /* background: #f2f2f2; */
  }

  #news {
    padding: 1em 2.2em;
    margin: 0.2em 0.2em 1.7em;
    border-radius: 20px;
    background: #f2f2f2;
    width: 83%;
    height: 85%;
  }

  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    10%,
    30%,
    50%,
    70%,
    90% {
      transform: translateX(-5px);
    }
    20%,
    40%,
    60%,
    80% {
      transform: translateX(5px);
    }
  }

  .shake {
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  .area-chart-container {
    display: grid;
    place-items: center;
    height: 100%;
  }

  .pie-chart-container {
    display: grid;
    place-items: center;
    height: 70%;
  }

  /* Responsive layout for screens narrower than 600px */
  @media (max-width: 600px) {
    .one,
    .two,
    .three,
    .four {
      flex-basis: 100%;
      /* Each child takes full width of the container */
    }
  }

  .choice {
    display: flex;
    align-items: center; /* center vertically */
    justify-content: start; /* center horizontally */
  }

  #confirm-choices {
    padding: 10px;
    background-color: #404040;
    color: white;
    border: none;
    cursor: pointer;
    width: 300px;
    margin-top: 13px;
    align-items: right;
  }

  #confirm-choices:hover {
    background-color: #7d7d7d;
  }

  #view-details {
    padding: 10px 0;
    background-color: inherit;
    color: #303030;
    border: none;
    cursor: pointer;
    text-decoration: underline;
  }

  #view-details:hover {
    background-color: inherit;
    color: #3db92d;
  }

  input[type="number"] {
    width: 55px;
    padding: 2px;
    border-radius: 5px;
    border: 2px solid grey;
    text-align: center;
  }

  #progress-bar {
    height: 15px;
    background-color: #e0e0e0;
    width: 100%;
    border-radius: 50px;
    margin: 0 auto;
    margin-top: 0.3em;
  }

  #progress-bar > div {
    height: 100%;
    background-color: #404040;
    border-radius: inherit;
  }

  /* The Modal (background) */
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    /* Enable scroll if needed */
    background-color: rgb(0, 0, 0);
    /* Fallback color */
    background-color: rgba(0, 0, 0, 0.9);
    /* Black w/ opacity */
  }

  .modal-content-loading {
    background-color: #fefefe;
    margin: auto;
    padding: 1.5em 2.2em;
    border: 0px solid #888;
    width: 28em;
    border-radius: 25px;
    text-align: left;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 1.5em 2.2em;
    border: 0px solid #888;
    width: 35em;
    border-radius: 25px;
    text-align: left;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  /* The Close Button */
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
</style>
