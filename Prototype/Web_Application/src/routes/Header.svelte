<script>
  import { currentPage } from "$lib/stores/currentPage.js";

  import Diagram from "../components/diagram.svelte";
  let activatedIcons = {
    calendar: false,
    survey: false,
    data: false,
    astrology: false,
    personality: false,
    ai: false,
  };

  $: if ($currentPage === 2) {
    activatedIcons.calendar = true;
  } else if ($currentPage === 3) {
    activatedIcons.calendar = true;
    activatedIcons.survey = true;
  } else if ($currentPage === 4) {
    activatedIcons.calendar = true;
    activatedIcons.survey = true;
    activatedIcons.data = true;
  } else if ($currentPage === 5) {
    activatedIcons.calendar = true;
    activatedIcons.survey = true;
    activatedIcons.data = true;
  } else if ($currentPage === 7) {
    activatedIcons.calendar = true;
    activatedIcons.survey = true;
    activatedIcons.data = true;

    activatedIcons.astrology = true;
    activatedIcons.personality = false;
    activatedIcons.ai = false;
  } else if ($currentPage === 8) {
    activatedIcons.calendar = true;
    activatedIcons.survey = true;
    activatedIcons.data = true;
    activatedIcons.astrology = false;
    activatedIcons.personality = true;
    activatedIcons.ai = false;
  } else if ($currentPage === 9) {
    activatedIcons.calendar = true;
    activatedIcons.survey = true;
    activatedIcons.data = true;
    activatedIcons.astrology = false;
    activatedIcons.personality = false;
    activatedIcons.ai = true;
  } else if ($currentPage === 10) {
    activatedIcons.calendar = true;
    activatedIcons.survey = true;
    activatedIcons.data = true;
    activatedIcons.astrology = true;
    activatedIcons.personality = true;
    activatedIcons.ai = true;
  } else if ($currentPage === 11) {
    activatedIcons.calendar = true;
    activatedIcons.survey = true;
    activatedIcons.data = true;
    activatedIcons.astrology = true;
    activatedIcons.personality = true;
    activatedIcons.ai = true;
  }
</script>

<header>
  <Diagram {activatedIcons} />
</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.5em auto 0;
  }
</style>
