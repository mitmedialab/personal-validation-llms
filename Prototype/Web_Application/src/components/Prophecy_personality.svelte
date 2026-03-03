<script>
  import { currentPage } from "$lib/stores/currentPage.js";

  import { quizData } from "../lib/stores/store-quiz.js";
  import PersonalityIcon from "../lib/icons/personality-icon.svelte";
  import Scale from "../components/Scale.svelte";

  let currentQuizData = $quizData;
  let prophecyOrder = currentQuizData.prophecy_order;
  let prophecyGroup = currentQuizData.prophecy_group;
  let predictions_impulsive = currentQuizData.predictions_impulsive;
  let predictions_rational = currentQuizData.predictions_rational;
  let prophecy = "";

  const prophecyIndex = prophecyOrder.findIndex(
    (page) => page === $currentPage
  );

  function chooseProphecy() {
    if (prophecyGroup === "rational") {
      return predictions_rational[prophecyIndex];
    } else {
      return predictions_impulsive[prophecyIndex];
    }
  }

  prophecy = chooseProphecy();

  export let onNavigate;
  // export let currentPage;

  // control modal
  let show = true;
  let showNext = false;
  let onClose = () => {};

  function handleOutsideClick(event) {
    if (event.target.classList.contains("modal")) {
      show = false;
    }
  }

  function closeModal() {
    show = false;
    showNext = false;
    onClose();
  }

  export function showModalWithDelay() {
    showNext = true; // Show loading effect
    setTimeout(() => {
      showNext = false; // Hide loading effect
      onNavigate();
    }, 3000); // miliseconds
  }

  let personality_validity_1 = "";
  let personality_validity_2 = "";
  let personality_usefulness_1 = "";
  let personality_usefulness_2 = "";
  let personality_reliability_1 = "";
  let personality_reliability_2 = "";
  let personality_personalization_1 = "";
  let personality_personalization_2 = "";

  let areRequiredFieldsFilled = false;

  $: areRequiredFieldsFilled =
    personality_validity_1 !== "" &&
    personality_validity_2 !== "" &&
    personality_usefulness_1 !== "" &&
    personality_usefulness_2 !== "" &&
    personality_reliability_1 !== "" &&
    personality_reliability_2 !== "" &&
    personality_personalization_1 !== "" &&
    personality_personalization_2 !== "";

  function updateStore() {
    quizData.update((currentData) => {
      return {
        ...currentData,
        personality_validity_1: personality_validity_1,
        personality_validity_2: personality_validity_2,
        personality_usefulness_1: personality_usefulness_1,
        personality_usefulness_2: personality_usefulness_2,
        personality_reliability_1: personality_reliability_1,
        personality_reliability_2: personality_reliability_2,
        personality_personalization_1: personality_personalization_1,
        personality_personalization_2: personality_personalization_2,
      };
    });
  }

  // quizData.subscribe((value) => {
  //   console.log(value);
  // });

  function handleSubmit() {
    updateStore();
    if ($currentPage === prophecyOrder[2]) {
      onNavigate();
    } else {
      showModalWithDelay();
    }
  }
</script>

{#if show}
  <div class="modal">
    <div class="modal-content" on:click|stopPropagation>
      <h3>Result {prophecyIndex + 1} of 3</h3>

      <PersonalityIcon isActivated="true" />
      <h4>(based on your personality type)</h4>
      <Scale />
      <p>
        Whether you're an analytical thinker or led by intuition, your
        Myers-Briggs profile offers valuable insights into your behavior when it
        comes to making investment decisions. Based on your personality type, {prophecy}
      </p>
      <!-- <p>Confidence score: 98% (What is this?)</p> -->

      <button on:click={closeModal}>OK</button>
    </div>
  </div>
{/if}

{#if showNext}
  <div class="modal">
    <div class="modal-content-next-prediction" on:click|stopPropagation>
      <img src="/images/crystal.gif" alt="crystal ball" style="width: 50px;" />
      <p>Moving to prediction {prophecyIndex + 2} of 3...</p>
      <!-- <button on:click={onNavigate}>OK</button> -->
    </div>
  </div>
{/if}

<div class="survey-page-table">
  <h2>Personality-based prediction</h2>
  <button id="view-prediction" on:click={() => (show = true)}
    >View my result again</button
  >
  <p>Please tell us what you think about each of the following statements.</p>
  <div id="quiz-table">
    <form on:submit|preventDefault={handleSubmit}>
      <table>
        <tr>
          <th />
          <th>Strongly disagree</th>
          <th>Disagree</th>
          <th>Somewhat disagree</th>
          <th>Neutral</th>
          <th>Somewhat agree</th>
          <th>Agree</th>
          <th>Strongly agree</th>
        </tr>
        <tr class="row">
          <td>I find the prediction convincing.</td>
          {#each ["1", "2", "3", "4", "5", "6", "7"] as rating}
            <td>
              <div class="options">
                <label class="option">
                  <input
                    type="radio"
                    bind:group={personality_validity_1}
                    value={rating}
                  />
                </label>
              </div>
            </td>
          {/each}
        </tr>
        <tr class="row">
          <td>I can identify with the prediction.</td>
          {#each ["1", "2", "3", "4", "5", "6", "7"] as rating}
            <td>
              <div class="options">
                <label class="option">
                  <input
                    type="radio"
                    bind:group={personality_personalization_1}
                    value={rating}
                  />
                </label>
              </div>
            </td>
          {/each}
        </tr>
        <tr class="row">
          <td>The source of the prediction is reliable.</td>
          {#each ["1", "2", "3", "4", "5", "6", "7"] as rating}
            <td>
              <div class="options">
                <label class="option">
                  <input
                    type="radio"
                    bind:group={personality_reliability_1}
                    value={rating}
                  />
                </label>
              </div>
            </td>
          {/each}
        </tr>
        <tr class="row">
          <td>I find the prediction helpful.</td>
          {#each ["1", "2", "3", "4", "5", "6", "7"] as rating}
            <td>
              <div class="options">
                <label class="option">
                  <input
                    type="radio"
                    bind:group={personality_usefulness_1}
                    value={rating}
                  />
                </label>
              </div>
            </td>
          {/each}
        </tr>

        <tr class="row">
          <td>The prediction is accurate.</td>
          {#each ["1", "2", "3", "4", "5", "6", "7"] as rating}
            <td>
              <div class="options">
                <label class="option">
                  <input
                    type="radio"
                    bind:group={personality_validity_2}
                    value={rating}
                  />
                </label>
              </div>
            </td>
          {/each}
        </tr>
        <tr class="row">
          <td>The prediction describes me very well.</td>
          {#each ["1", "2", "3", "4", "5", "6", "7"] as rating}
            <td>
              <div class="options">
                <label class="option">
                  <input
                    type="radio"
                    bind:group={personality_personalization_2}
                    value={rating}
                  />
                </label>
              </div>
            </td>
          {/each}
        </tr>
        <tr class="row">
          <td>I trust the source of the prediction.</td>
          {#each ["1", "2", "3", "4", "5", "6", "7"] as rating}
            <td>
              <div class="options">
                <label class="option">
                  <input
                    type="radio"
                    bind:group={personality_reliability_2}
                    value={rating}
                  />
                </label>
              </div>
            </td>
          {/each}
        </tr>
        <tr class="row">
          <td>The prediction is useful for making future decisions.</td>
          {#each ["1", "2", "3", "4", "5", "6", "7"] as rating}
            <td>
              <div class="options">
                <label class="option">
                  <input
                    type="radio"
                    bind:group={personality_usefulness_2}
                    value={rating}
                  />
                </label>
              </div>
            </td>
          {/each}
        </tr>
      </table>

      <button
        id="submitQuestionnaire"
        type="submit"
        disabled={!areRequiredFieldsFilled}>Submit</button
      >
    </form>
  </div>
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
    background-color: rgba(0, 0, 0, 0.9);
    /* Black w/ opacity */
  }

  /* Modal Content */
  .modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 2em 3.5em;
    width: 36em;
    border-radius: 27px;
    text-align: center;
  }

  .modal-content-next-prediction {
    background-color: #fefefe;
    margin: auto;
    padding: 2em 3.5em;
    width: 18em;
    border-radius: 27px;
    text-align: center;
  }

  #submitQuestionnaire {
    margin: 20px auto;
  }
</style>
