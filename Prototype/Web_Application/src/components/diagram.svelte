<script>
  export let iconSize = "70";
  export let activatedIcons = {};

  import CalendarIcon from "../lib/icons/calendar-icon.svelte";
  import SurveyIcon from "../lib/icons/survey-icon.svelte";
  import DataIcon from "../lib/icons/data-icon.svelte";
  import AstrologyIcon from "../lib/icons/astrology-icon.svelte";
  import PersonalityIcon from "../lib/icons/personality-icon.svelte";
  import AiIcon from "../lib/icons/ai-icon.svelte";
</script>

<div class="icon-container">
  <CalendarIcon isActivated={activatedIcons["calendar"] ?? false} />

  <SurveyIcon isActivated={activatedIcons["survey"] ?? false} />

  <DataIcon isActivated={activatedIcons["data"] ?? false} />

  <svg
    width={iconSize}
    height={iconSize}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polygon points="75,50 25,22.5 25,77.5 75,50" fill="#e2e2e2" />
  </svg>

  <AiIcon isActivated={activatedIcons["ai"] ?? false} />

  <AstrologyIcon isActivated={activatedIcons["astrology"] ?? false} />

  <PersonalityIcon isActivated={activatedIcons["personality"] ?? false} />
</div>

<style>
  .icon-container {
    display: flex;
    justify-content: space-around; /* This spreads out the icons evenly */
    align-items: center; /* Aligns icons vertically in the center */
  }
</style>
