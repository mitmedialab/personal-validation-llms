<script>
  export let show = false;
  export let onClose = () => {};
</script>

{#if show}
  <div class="modal">
    <div class="modal-content" on:click|stopPropagation>
      <p>Please complete all the questions!</p>
      <button on:click={onClose}>OK</button>
    </div>
  </div>
{/if}

<style>
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
    background-color: rgba(0, 0, 0, 0.7);
    /* Black w/ opacity */
  }

  .modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 2em 3.5em;
    width: 20em;
    border-radius: 27px;
    text-align: center;
  }
</style>
