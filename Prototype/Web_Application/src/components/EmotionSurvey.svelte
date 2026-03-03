<script>
  import { quizData } from "../lib/stores/store-quiz.js";

  export let show = false;
  export let onClose = () => {};
  export let onSubmitted;

  let emotion = "";
  let emotionHistory = ["na"];
  let currentRound = 1;

  function updateStore() {
    quizData.update((currentData) => {
      return {
        ...currentData,
        emotion: emotion,
        emotionHistory: emotionHistory,
      };
    });
    // console.log("current round: " + currentRound);
    // console.log("emotion: " + emotion);
    currentRound += 1;
    emotion = "";
  }

  function handleOutsideClick(event) {
    if (event.target.classList.contains("modal")) {
      onClose();
    }
  }

  function handleSubmit(event) {
    updateStore();
    show = false; // This will close the modal by hiding it
    onClose();
    if (typeof onSubmitted === "function") {
      onSubmitted(); // Call the callback after closing the modal
    }
  }
</script>

{#if show}
  <div class="modal" on:click={handleOutsideClick}>
    <div class="modal-content" on:click|stopPropagation>
      <span class="close" on:click={onClose}>&times;</span>
      <h3>How confident do you feel about your choices?</h3>

      <div class="question">
        <div class="emotion-options">
          <p>Not at all <br />confident<br />😱</p>

          <label>
            <!-- <p>Extremely nervous</p> -->
            <input
              type="radio"
              bind:group={emotion}
              value="not at all confident"
              style="display: block;"
            />
          </label>
          <label>
            <!-- <p>nervous</p> -->
            <input
              type="radio"
              bind:group={emotion}
              value="much less confident"
              style="display: block;"
            />
          </label>
          <label>
            <!-- <p>Slightly nervous</p> -->
            <input
              type="radio"
              bind:group={emotion}
              value="less confident"
              style="display: block;"
            />
          </label>
          <label>
            <!-- <p>Neutral</p> -->
            <input
              type="radio"
              bind:group={emotion}
              value="neutral"
              style="display: block;"
            />
          </label>
          <label>
            <!-- <p>Slighly confident</p> -->
            <input
              type="radio"
              bind:group={emotion}
              value="slightly confident"
              style="display: block;"
            />
          </label>
          <label>
            <!-- <p>confident</p> -->
            <input
              type="radio"
              bind:group={emotion}
              value="moderately confident"
              style="display: block;"
            />
          </label>
          <label>
            <!-- <p>Very confident</p> -->
            <input
              type="radio"
              bind:group={emotion}
              value="extremely confident"
              style="display: block;"
            />
          </label>
          <p>Extremely <br />confident<br />😎</p>
        </div>
      </div>

      <form on:submit|preventDefault={handleSubmit}>
        <button disabled={!emotion} type="submit">Submit</button>
      </form>
    </div>
  </div>
{/if}

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
    margin: 0 auto;
    padding: 1.8em 2.5em;
    width: 34em;
    border-radius: 27px;
    text-align: center;
  }

  /* table {
    margin: auto;
    width: 100%;
  } */

  /* td,
  th {
    padding: 0.5em 0;
    min-width: 80px;
  } */

  /* td:first-child {
    padding: 0 20px 0 0;
    min-width: 130px;
  } */

  .emotion-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1em;
    padding: 0 1em;
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
