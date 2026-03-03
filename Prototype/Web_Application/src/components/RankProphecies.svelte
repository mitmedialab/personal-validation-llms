<script>
  import { currentPage } from "$lib/stores/currentPage.js";
  import { quizData } from "../lib/stores/store-quiz.js";

  export let onNavigate;

  let showModal = false;

  let options = [
    { id: 1, text: "🥇 Rank 1" },
    { id: 2, text: "🥈 Rank 2" },
    { id: 3, text: "🥉 Rank 3" },
  ];

  // Define ranking levels as an array of strings
  let rankingLevels = [
    "Select option",
    "AI predictions",
    "Astrology predictions",
    "Personality predictions",
  ];

  let defaultRanking = "Select option";
  let rankings = Array(options.length).fill(defaultRanking);

  function resetRankings() {
    rankings = rankings.map(() => defaultRanking); // Reset all rankings to the default state
  }

  $: availableRankingLevels = rankingLevels.map((level) => {
    return {
      level,
      available: !rankings.includes(level) || level === "",
    };
  });

  function handleRankChange(optionIndex, newRank) {
    rankings[optionIndex] = newRank;
  }

  let areRequiredFieldsFilled = false;

  $: areRequiredFieldsFilled =
    rankings[0] !== "Select option" &&
    rankings[1] !== "Select option" &&
    rankings[2] !== "Select option";

  function updateStore() {
    quizData.update((currentData) => {
      return {
        ...currentData,
        rank_1: rankings[0],
        rank_2: rankings[1],
        rank_3: rankings[2],
      };
    });
  }

  // quizData.subscribe((value) => {
  //   console.log(value);
  // });

  function showModalWithDelay() {
    showModal = true;
    setTimeout(() => {
      showModal = false;
      onNavigate($currentPage + 1);
    }, 3000); // miliseconds
  }

  function handleSubmit() {
    updateStore();
    showModalWithDelay();
  }
</script>

{#if showModal}
  <div class="modal">
    <div class="modal-content" on:click|stopPropagation>
      <img src="/images/diagram_2.gif" alt="diagram" style="width: 100%;" />
      <p>Recording your responses...</p>
    </div>
  </div>
{/if}

<div class="survey-page">
  <h2>Please rank the predictions in order of preference</h2>
  <p>Which one are you most likely to walk away with today?</p>
  <div id="quiz">
    <form on:submit|preventDefault={handleSubmit}>
      {#each options as option, optionIndex}
        <div>
          <label for={`rank-${option.id}`}>
            {option.text}
          </label>
          <select
            id={`rank-${option.id}`}
            bind:value={rankings[optionIndex]}
            on:change={() =>
              handleRankChange(optionIndex, rankings[optionIndex])}
          >
            {#each availableRankingLevels as { level, available }}
              {#if available || rankings[optionIndex] === level}
                <option value={level}>
                  {level || "Select option"}
                </option>
              {/if}
            {/each}
          </select>
        </div>
      {/each}
      <button id="reset-button" type="button" on:click={resetRankings}
        >Reset options</button
      >
      <button
        id="submit-ranking-button"
        type="submit"
        disabled={!areRequiredFieldsFilled}>Submit</button
      >
    </form>
  </div>
</div>

<style>
  div {
    margin-bottom: 1em;
  }

  form {
    padding-top: 1.5em;
  }

  .survey-page {
    width: 40em;
  }

  #quiz {
    text-align: center;

    margin-bottom: 0.5em;
  }

  label {
    font-size: 17px;
    font-weight: bold;
  }

  select {
    margin-left: 8px;
    width: 13em;
  }

  #reset-button {
    padding: 1px 0;
    background-color: inherit;
    color: #303030;
    border: none;
    cursor: pointer;
    text-decoration: underline;
    display: inline-block;
    margin-top: 1em;
  }

  #reset-button:hover {
    background-color: inherit;
    color: #3db92d;
  }

  #submit-ranking-button {
    margin-bottom: 1.3em;
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

  .modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 2em 3.5em;
    width: 35em;
    border-radius: 27px;
    text-align: center;
  }
</style>
