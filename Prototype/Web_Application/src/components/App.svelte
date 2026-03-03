<script>
  import { currentPage } from "$lib/stores/currentPage.js";
  import SurveyIntro from "../components/Survey_intro.svelte";
  import SurveyZodiac from "../components/Survey_zodiac.svelte";
  import SurveyPersonality from "../components/Survey_personality.svelte";
  import SurveyInvestment from "../components/Survey_investment.svelte";
  import InvestmentGame from "../components/InvestmentGame.svelte";
  import GameInstructions from "../components/GameInstructions.svelte";
  import ProphecyZodiac from "../components/Prophecy_zodiac.svelte";
  import ProphecyPersonality from "../components/Prophecy_personality.svelte";
  import ProphecyAI from "../components/Prophecy_AI.svelte";
  import RankProphecies from "../components/RankProphecies.svelte";
  import LastPage from "./LastPage.svelte";
  import { quizData } from "../lib/stores/store-quiz.js";
  import { send_dinosaur } from "../components/post2sheet.js";

  let pages_to_shuffle = [7, 8, 9];

  // shuffle function using the Fisher-Yates algorithm
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Shuffled pages
  let prophecyOrder = shuffleArray(pages_to_shuffle);
  // console.log(prophecyOrder);

  let prediction_group = ["rational", "impulsive"];

  // Function to randomly assign a user to a group
  function assignUserToGroup() {
    const randomIndex = Math.floor(Math.random() * prediction_group.length);
    return prediction_group[randomIndex];
  }

  let prophecyGroup = assignUserToGroup();

  let predictions_rational = [
    "you are more likely to make rational investment decisions based on reason rather than emotion. You have a good grasp of your emotions especially when it comes to decisions about money. Therefore, we predict that your portfolio will have higher-than-average performance in the long run.",
    "your investment choices tend to be guided more by logic than by feelings. Having control over your emotions, particularly in financial decisions, is a strength of yours. Thus, we anticipate your portfolio will perform above the average in the long run.",
    "you tend to base your investment decisions more on logical reasoning than on emotional reactions. You manage your emotions well and resort to rational thinking, especially in financial matters. As a result, we expect your portfolio to outperform the average in the long run.",
    "your approach to investing is more often influenced by logical thought than by emotional impulses. Your ability to control your emotions, especially regarding financial decisions, is commendable. Therefore, we foresee that your portfolio will achieve higher than average returns in the long run.",
  ];
  let predictions_impulsive = [
    "you are more likely to make impulsive investment decisions based on emotion rather than reason. You may become emotionally invested in your choices, which can influence your decision-making. Therefore, we predict that your portfolio will have lower-than-average performance in the long run.",
    "you tend to make quick investment choices driven by feelings instead of logical thinking. Your decision-making is strongly influenced by your gut feelings. Thus we foresee below-average outcomes for your portfolio in the long run.",
    "your investment decisions are often impulsive, swayed by emotions rather than thoughtful analysis. Your emotions play a significant role in your investment decisions. As a result, it's expected that your portfolio's performance will be under the average in the long run.",
    "the likelihood is high that you'll make hasty financial choices based on your emotions rather than on rational considerations. You're inclined to be influenced by feelings when it comes to investment decisions. Therefore, your portfolio is anticipated to perform below average in the long run.",
  ];

  function updateStore() {
    quizData.update((currentData) => {
      return {
        ...currentData,
        prophecy_order: prophecyOrder,
        prophecy_group: prophecyGroup,
        predictions_impulsive: predictions_impulsive,
        predictions_rational: predictions_rational,
      };
    });
  }

  updateStore();

  // quizData.subscribe((value) => {
  //   console.log(value);
  // });

  //for prediction pages
  function navigateToPage() {
    if ($currentPage === prophecyOrder[2]) {
      goToPage(10);
    } else {
      goToNextPage();
    }
  }

  //for all other pages
  function goToPage(pageNumber) {
    if ($currentPage === 10) {
      let formData = new FormData();

      quizData.subscribe(($quizData) => {
        Object.keys($quizData).forEach((key) => {
          formData.append(key, $quizData[key]);
        });
      });
      send_dinosaur(formData);
    }

    currentPage.set(pageNumber);
    // console.log("current page: " + $currentPage);
    window.scrollTo(0, 0); //start page at the top
  }

  function goToNextPage() {
    const currentIndex = prophecyOrder.findIndex(
      (page) => page === $currentPage
    );
    // console.log("current index:" + currentIndex);
    // console.log("current page:" + $currentPage);
    const nextIndex = currentIndex + 1;
    if (nextIndex < prophecyOrder.length) {
      $currentPage = prophecyOrder[nextIndex];
      window.scrollTo(0, 0);
    }
    // console.log("next index:" + nextIndex);
    // console.log("new currentpage:" + $currentPage);
  }
</script>

{#if $currentPage === 1}
  <SurveyIntro onNavigate={goToPage} />
{:else if $currentPage === 2}
  <SurveyZodiac onNavigate={goToPage} />
{:else if $currentPage === 3}
  <SurveyPersonality onNavigate={goToPage} />
{:else if $currentPage === 4}
  <GameInstructions onNavigate={goToPage} />
{:else if $currentPage === 5}
  <SurveyInvestment onNavigate={goToPage} />
{:else if $currentPage === 6}
  <InvestmentGame onNavigate={goToPage} />
{:else if $currentPage === 7}
  <ProphecyZodiac onNavigate={navigateToPage} />
{:else if $currentPage === 8}
  <ProphecyPersonality onNavigate={navigateToPage} />
{:else if $currentPage === 9}
  <ProphecyAI onNavigate={navigateToPage} />
{:else if $currentPage === 10}
  <RankProphecies onNavigate={goToPage} />
{:else if $currentPage === 11}
  <LastPage onNavigate={goToPage} />
{/if}
