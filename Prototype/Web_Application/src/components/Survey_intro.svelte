<script>
  import { currentPage } from "$lib/stores/currentPage.js";
  import Diagram from "./diagram.svelte";
  export let onNavigate; // Passed in to control view state transition.
  // export let currentPage;

  // To handle the operation to transit between answers or survey pages.
  const next = (n) => () => onNavigate($currentPage + n);
  // const previous = (n) => () => onNavigate(currentPage - n);
</script>

<div class="survey-page">
  <h1>
    Are you an <strong>impulsive or rational</strong> investor? <br /> We can predict
    your future investment behavior!
  </h1>
  <div id="diagram-container">
    <!-- <Diagram /> -->
    <img src="/images/diagram_1.gif" alt="diagram" style="width: 100%;" />
    <div id="diagram-label-container">
      <p>Birthdate</p>
      +
      <p>Personality</p>
      +
      <p>Game data</p>
      <p />
      <p>------></p>
      <p />
      <p>AI model</p>
      <p />
      <p>Astrology</p>
      <p />
      <p>Personality</p>
    </div>
  </div>
  <p>
    You will complete a short questionnaire about your <strong>birthdate</strong
    >
    and your <strong>personality</strong>, then participate in a
    <strong>simulated investing game</strong>.
  </p>
  <!-- <p>
    Based on your answers and interactions, we will provide predictions about
    your future invest behavior generated from four different sources: 1) your
    zodiac sign, 2) your personality, 3) a human psychologist, and 4) our custom
    AI model.
  </p> -->

  <p>
    At the end, you will be provided with three different versions of
    predictions about your future investment behavior, based on analysis based
    on: 1) your
    <strong>zodiac sign</strong>, 2) your <strong>personality</strong>, and 3)
    your interaction data monitored by our
    <strong>AI model</strong>.
  </p>
  <p>
    Please answer honestly and to the best of your ability for accurate
    predictions. The information you provide in the questionnaire will only be
    used for the purpose of creating personalized answers for you and will not
    be shared with anyone else.

    <button on:click={next(1)}>Get started</button>
  </p>
</div>
