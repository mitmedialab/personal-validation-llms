<script>
  import { currentPage } from "$lib/stores/currentPage.js";
  import Header from "./Header.svelte";

  import "./styles.css";
</script>

<div class="app">
  {#if $currentPage !== 6 && $currentPage !== 1}
    <Header />
  {/if}
  <main>
    <slot />
  </main>

  <!-- <footer>
    <p>Footer</p>
  </footer> -->
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0.5em 0;
    width: 90%;
    max-width: 64rem;
    margin: 0 auto;
    box-sizing: border-box;
    /* justify-content: center; */
  }

  /* footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 18px;
    font-size: 12px;
    color: grey;
  }

  footer a {
    font-weight: bold;
  }

  @media (min-width: 480px) {
    footer {
      padding: 12px 0;
    }
  } */
</style>
