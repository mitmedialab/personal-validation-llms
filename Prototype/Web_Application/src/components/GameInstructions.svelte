<script>
  import { currentPage } from "$lib/stores/currentPage.js";

  export let onNavigate;

  const next = (n) => () => onNavigate($currentPage + n);
</script>

<div class="survey-page">
  <h2>💸 Investment game instructions</h2>
  <p>In this part, you will play a simulated investment game.</p>
  <p>
    You will be provided with virtual currency of <strong>$10,000</strong>. You
    may invest across three investment categories (<strong>high</strong>
    risk/return, <strong>medium</strong>
    risk/return, <strong>low</strong> risk/return). You will invest over
    <strong>10 rounds</strong>
    (representing years).
  </p>
  <p>
    In the next page, you will answer a short risk preference questionnaire and
    receive a recommended portfolio allocation (%). You may revise your
    allocation at any round. After each round, we will ask you how confident you
    feel about your choices. Good luck!
  </p>
  <p />

  <p class="important">
    <mark>Important note:</mark> Your investment performance will increase your total
    compensation for participating in the study (10% increase for every $100,000).
  </p>
  <button on:click={next(1)}>I'm ready</button>
</div>

<style>
  .important {
    font-weight: bold;
    background-color: white;
    padding: 1em;
    border-radius: 15px;
    margin: 1em 0;
  }

  mark {
    -webkit-animation: 1.5s highlight 1.5s 1 normal forwards;
    animation: 1.5s highlight 1.5s 1 normal forwards;
    background-color: none;
    background: linear-gradient(90deg, #7efff5 50%, rgba(255, 255, 255, 0) 50%);
    background-size: 200% 100%;
    background-position: 100% 0;
  }

  @-webkit-keyframes highlight {
    to {
      background-position: 0 0;
    }
  }

  @keyframes highlight {
    to {
      background-position: 0 0;
    }
  }
</style>
