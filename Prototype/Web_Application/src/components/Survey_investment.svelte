<script>
  import { currentPage } from "$lib/stores/currentPage.js";

  import { quizData } from "../lib/stores/store-quiz.js";

  export let onNavigate;
  // export let currentPage;

  let investingPeriod = "";
  let investingPriority = "";
  let riskPreference = "";
  let riskyScenario = "";

  let areRequiredFieldsFilled = false;

  $: areRequiredFieldsFilled =
    investingPeriod !== "" &&
    investingPriority !== "" &&
    riskPreference !== "" &&
    riskyScenario !== "";

  // When the user progresses to the next page or on input change
  function updateStore() {
    quizData.update((currentData) => {
      return {
        ...currentData,
        investing_period: investingPeriod,
        investing_priority: investingPriority,
        risk_preference: riskPreference,
        sell_in_risky_scenario: riskyScenario,
      };
    });
  }

  // quizData.subscribe((value) => {
  //   console.log(value);
  // });

  let showLoading = false;
  let showModal_creatingPortfolio = false;

  // Function to show the modal with a delay and display a loading effect in the meantime
  export function showModalWithDelay() {
    showLoading = true; // Show loading effect
    setTimeout(() => {
      showLoading = false; // Hide loading effect
      showModal_creatingPortfolio = true; // Show the modal
    }, 3000); // miliseconds
  }

  function handleNextClick() {
    updateStore();
    showModalWithDelay();
  }

  function goToNextPage() {
    onNavigate($currentPage + 1);
    showModal_creatingPortfolio = false;
  }
</script>

{#if showLoading}
  <div class="modal">
    <div on:click|stopPropagation id="which-month" class="modal-content">
      <img
        src="/images/drawing.gif"
        alt="pencil doodling"
        style="width: 150px;"
      />
      <p>Creating your customized investment portfolio...</p>
    </div>
  </div>
{/if}

{#if showModal_creatingPortfolio}
  <div class="modal">
    <div on:click|stopPropagation id="which-month" class="modal-content">
      <p>Your portfolio is ready!</p>
      <button on:click={goToNextPage}>View my recommended portfolio</button>
    </div>
  </div>
{/if}

<div class="survey-page">
  <h2>First, tell us about your investing preferences</h2>
  <p>Based on this information, we'll create a customized portfolio for you.</p>
  <div id="quiz">
    <div class="question">
      <label for="investingPeriod"
        ><p>
          When making a long-term investment, I plan to keep the money invested
          for
        </p></label
      >
      <select bind:value={investingPeriod} id="investingPeriod">
        <option value="1 to 2">1 to 2 years</option>
        <option value="3 to 5">3 to 5 years</option>
        <option value="6 to 8">6 to 8 years</option>
        <option value="more than 8">More than 8 years</option>
      </select>
    </div>
    <div class="question">
      <label for="investingPriority"
        ><p>What's your main investing priority when investing?</p></label
      >
      <select bind:value={investingPriority} id="investingPriority">
        <option value="Avoid loss"
          >I prioritize avoiding losses above all other considerations</option
        >
        <option value="Prefer safety"
          >I prefer low-risk investments even if it means earning less money</option
        >
        <option value="Prefer profit"
          >I prefer investments with the potential for higher returns, despite
          the higher risk</option
        >
        <option value="Maximize profit"
          >Maximizing profits is my top priority, even if it involves high risk</option
        >
      </select>
    </div>
    <div class="question">
      <label for="riskPreference"
        ><p>How do you feel about taking risks, in general?</p>
      </label>
      <select bind:value={riskPreference} id="riskPreference">
        <option value="Avoid risk"
          >I avoid risks. Better safe than sorry.</option
        >
        <option value="Low risk"
          >Little risk is okay. I'm a bit cautious.</option
        >
        <option value="Medium risk">I like to take risks sometimes.</option>
        <option value="High risk">I love risk. I'm a bit of a gambler.</option>
      </select>
    </div>

    <div class="question">
      <p>
        During market declines, I would sell portions of my riskier assets and
        invest the money in safe assets.
      </p>
      <label>
        <input type="radio" bind:group={riskyScenario} value="strongly agree" />
        Strongly agree
      </label>
      <br />
      <label>
        <input type="radio" bind:group={riskyScenario} value="agree" />
        Agree
      </label>
      <br />
      <label>
        <input type="radio" bind:group={riskyScenario} value="neither" />
        Neither agree or disagree
      </label>
      <br />
      <label>
        <input type="radio" bind:group={riskyScenario} value="disagree" />
        Disagree
      </label>
      <br />
      <label>
        <input
          type="radio"
          bind:group={riskyScenario}
          value="strongly disagree"
        />
        Strongly disagree
      </label>
    </div>
  </div>
  <button on:click={handleNextClick} disabled={!areRequiredFieldsFilled}
    >Next</button
  >
  <!-- <button on:click={previous(1)}>Previous</button> -->

  <!-- <form on:submit|preventDefault={handleSubmit}>
    <button disabled={!riskPreference} type="submit">Submit</button>
  </form> -->
</div>

<style>
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
    background-color: rgba(0, 0, 0, 0.6);
    /* Black w/ opacity */
  }

  /* Modal Content */
  .modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 1.5em 2.2em;
    border: 0px solid #888;
    width: 26em;
    border-radius: 25px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
</style>
