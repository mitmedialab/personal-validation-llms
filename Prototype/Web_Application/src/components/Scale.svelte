<script>
  let position = 0; // scale position, from 0 to 100

  import { quizData } from "../lib/stores/store-quiz.js";
  let currentQuizData = $quizData;
  let prophecyGroup = currentQuizData.prophecy_group;

  const rationalPositions = [70, 73, 75, 78, 80];
  const impulsivePositions = [20, 22, 25, 28, 30];

  if (prophecyGroup === "rational") {
    position =
      rationalPositions[Math.floor(Math.random() * rationalPositions.length)];
    // console.log("position: " + position);
  } else {
    position =
      impulsivePositions[Math.floor(Math.random() * impulsivePositions.length)];
    // console.log("position: " + position);
  }
</script>

<div class="scale-container">
  <div class="scale-line" />
  <!-- Use inline styles to position the knob according to the 'position' variable -->
  <div class="scale-knob" style="left: {position}%;" />
  <div class="label-left">impulsive</div>
  <div class="label-right">rational</div>
</div>

<style>
  .scale-container {
    position: relative;
    width: 40%;
    height: 3.5em;
    margin: 0 auto;
  }

  .scale-line {
    position: absolute;
    width: 100%;
    height: 8px;
    background: linear-gradient(to right, #ff737a, #54a1ff);
    border-radius: 5px;
    top: 50%;
    transform: translateY(-50%);
  }

  .scale-knob {
    position: absolute;
    width: 30px;
    height: 30px;
    background: #707070;
    border: 2px solid #fff; /* Add border for better visibility */
    border-radius: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    /* The left position will be set dynamically in the next step */
  }
  .label-left {
    position: absolute;
    top: 50%;
    transform: translate(-130%, -50%);
    left: 0;
  }

  .label-right {
    position: absolute;
    top: 50%;
    transform: translate(140%, -50%);
    right: 0;
  }

  /* .label {
    position: absolute;
    width: 100%;
    text-align: center;
    top: 70%;
  } */
</style>
