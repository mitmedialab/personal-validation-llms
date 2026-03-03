<script>
  export let show = false;
  export let onClose = () => {};

  function handleOutsideClick(event) {
    if (event.target.classList.contains("modal")) {
      show = false;
    }
  }

  let showDetails = false; // State to control the visibility of the details

  function toggleDetails() {
    showDetails = !showDetails; // Toggle the state
  }
</script>

{#if show}
  <div class="modal" on:click={handleOutsideClick}>
    <div class="modal-content" on:click|stopPropagation>
      <h3>Your recommended portfolio</h3>
      <img
        src="/images/portfolio.png"
        alt="recommended portfolio allocation: 30% in high risk high return, 40% in medium risk medium return, 30% in low risk low return"
        style="width: 100%;"
      />
      <p>
        We recommend a moderate strategy to diversify the risks and maximize the
        returns.
      </p>
      <button id="view-details" on:click={toggleDetails}>
        <strong
          >{showDetails
            ? "▼ Close details"
            : "▶ Click to view details on each category"}</strong
        >
      </button>
      {#if showDetails}
        <div class="details">
          <h4>High Risk/Return Option:</h4>
          <ul>
            <li>1/3 probability of winning <strong>3x</strong> each round</li>
            <li>
              2/3 probability of losing up to <strong>50%</strong> each round
            </li>
          </ul>
          <h4>Medium Risk/Return Option:</h4>
          <ul>
            <li>1/2 probability of winning <strong>2x</strong> each round</li>
            <li>
              1/2 probability of losing up to <strong>25%</strong> each round
            </li>
          </ul>
          <h4>Low Risk/Return Option:</h4>
          <ul>
            <li>2/3 probability of winning <strong>10%</strong> each round</li>
            <li>
              1/3 probability of losing up to <strong>5%</strong> each round
            </li>
          </ul>
        </div>
      {/if}

      <button on:click={onClose}>Start game</button>
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
    margin: auto;
    padding: 2em 3.5em;
    width: 34em;
    border-radius: 27px;
    text-align: left;
  }

  #view-details {
    padding: 5px 0;
    background-color: #ffffff;
    color: #303030;
    border: none;
    cursor: pointer;
    /* text-decoration: underline; */
    display: inline;
    margin: 0;
  }

  #view-details:hover {
    background-color: #ffffff;
    color: #3db92d;
  }

  ul {
    line-height: 1.3;
  }
</style>
