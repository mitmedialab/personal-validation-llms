<script>
	import { currentPage } from "$lib/stores/currentPage.js";
	import PopUp from "./PopUp.svelte";

	export let onNavigate;
	// export let currentPage;

	import { quizData } from "../lib/stores/store-quiz.js";

	let personality_1 = "";
	let personality_2 = "";
	let personality_3 = "";
	let personality_4 = "";
	let personality_5 = "";
	let personality_6 = "";
	let personality_7 = "";
	let personality_8 = "";
	let personality_9 = "";
	let personality_10 = "";
	let personality_11 = "";
	let personality_12 = "";

	let areRequiredFieldsFilled = false;

	$: areRequiredFieldsFilled =
		personality_1 !== "" &&
		personality_2 !== "" &&
		personality_3 !== "" &&
		personality_4 !== "" &&
		personality_5 !== "" &&
		personality_6 !== "" &&
		personality_7 !== "" &&
		personality_8 !== "" &&
		personality_9 !== "" &&
		personality_10 !== "" &&
		personality_11 !== "" &&
		personality_12 !== "";

	function updateStore() {
		quizData.update((currentData) => {
			return {
				...currentData,
				personality_1: personality_1,
				personality_2: personality_2,
				personality_3: personality_3,
				personality_4: personality_4,
				personality_5: personality_5,
				personality_6: personality_6,
				personality_7: personality_7,
				personality_8: personality_8,
				personality_9: personality_9,
				personality_10: personality_10,
				personality_11: personality_11,
				personality_12: personality_12,
			};
		});
	}

	// quizData.subscribe((value) => {
	// 	console.log(value);
	// });

	let showModal = false;

	function closeModal() {
		showModal = !showModal;
	}

	const next = (n) => () => {
		if (!areRequiredFieldsFilled) {
			showModal = true;
		} else {
			updateStore();
			onNavigate($currentPage + n);
		}
	};
	// const previous = (n) => () => onNavigate(currentPage - n);
</script>

<PopUp show={showModal} onClose={closeModal} />

<div class="survey-page-table">
	<h2>Rate the following statements about yourself</h2>
	<p>Don't overthink!</p>

	<!-- <div id="quiz-table">
    <form on:submit|preventDefault={next}>
      <table>
        <tr>
          <th />
          <th>Strongly disagree</th>
          <th>Disagree</th>
          <th>Somewhat disagree</th>
          <th>Neutral</th>
          <th>Somewhat agree</th>
          <th>Agree</th>
          <th>Strongly agree</th>
        </tr>
        <tr>
          <td>You regularly make new friends.</td>
          {#each ["1", "2", "3", "4", "5", "6", "7"] as rating}
            <td>
              <div class="options">
                <label class="option">
                  <input
                    type="radio"
                    bind:group={personality_1}
                    value={rating}
                  />
                </label>
              </div>
            </td>
          {/each}
        </tr>
        <tr>
          <td
            >You spend a lot of your free time exploring various random topics
            that pique your interest.</td
          >
          {#each ["1", "2", "3", "4", "5", "6", "7"] as rating}
            <td>
              <div class="options">
                <label class="option">
                  <input
                    type="radio"
                    bind:group={personality_2}
                    value={rating}
                  />
                </label>
              </div>
            </td>
          {/each}
        </tr>
        <tr>
          <td
            >Seeing other people cry can easily make you feel like you want to
            cry too.</td
          >
          {#each ["1", "2", "3", "4", "5", "6", "7"] as rating}
            <td>
              <div class="options">
                <label class="option">
                  <input
                    type="radio"
                    bind:group={personality_3}
                    value={rating}
                  />
                </label>
              </div>
            </td>
          {/each}
        </tr>
        <tr>
          <td>You often make a backup plan for a backup plan.</td>
          {#each ["1", "2", "3", "4", "5", "6", "7"] as rating}
            <td>
              <div class="options">
                <label class="option">
                  <input
                    type="radio"
                    bind:group={personality_4}
                    value={rating}
                  />
                </label>
              </div>
            </td>
          {/each}
        </tr>

        <tr>
          <td>You usually stay calm, even under a lot of pressure.</td>
          {#each ["1", "2", "3", "4", "5", "6", "7"] as rating}
            <td>
              <div class="options">
                <label class="option">
                  <input
                    type="radio"
                    bind:group={personality_5}
                    value={rating}
                  />
                </label>
              </div>
            </td>
          {/each}
        </tr>
        <tr>
          <td
            >At social events, you rarely try to introduce yourself to new
            people and mostly talk to the ones you already know..</td
          >
          {#each ["1", "2", "3", "4", "5", "6", "7"] as rating}
            <td>
              <div class="options">
                <label class="option">
                  <input
                    type="radio"
                    bind:group={personality_6}
                    value={rating}
                  />
                </label>
              </div>
            </td>
          {/each}
        </tr>
        <tr>
          <td
            >You prefer to completely finish one project before starting
            another.</td
          >
          {#each ["1", "2", "3", "4", "5", "6", "7"] as rating}
            <td>
              <div class="options">
                <label class="option">
                  <input
                    type="radio"
                    bind:group={personality_7}
                    value={rating}
                  />
                </label>
              </div>
            </td>
          {/each}
        </tr>
        <tr>
          <td>You are very sentimental.</td>
          {#each ["1", "2", "3", "4", "5", "6", "7"] as rating}
            <td>
              <div class="options">
                <label class="option">
                  <input
                    type="radio"
                    bind:group={personality_8}
                    value={rating}
                  />
                </label>
              </div>
            </td>
          {/each}
        </tr>
        <tr>
          <td>You like to use organizing tools like schedules and lists.</td>
          {#each ["1", "2", "3", "4", "5", "6", "7"] as rating}
            <td>
              <div class="options">
                <label class="option">
                  <input
                    type="radio"
                    bind:group={personality_9}
                    value={rating}
                  />
                </label>
              </div>
            </td>
          {/each}
        </tr>
        <tr>
          <td
            >Even a small mistake can cause you to doubt your overall abilities
            and knowledge.</td
          >
          {#each ["1", "2", "3", "4", "5", "6", "7"] as rating}
            <td>
              <div class="options">
                <label class="option">
                  <input
                    type="radio"
                    bind:group={personality_10}
                    value={rating}
                  />
                </label>
              </div>
            </td>
          {/each}
        </tr>
        <tr>
          <td
            >You feel comfortable just walking up to someone you find
            interesting and striking up a conversation.</td
          >
          {#each ["1", "2", "3", "4", "5", "6", "7"] as rating}
            <td>
              <div class="options">
                <label class="option">
                  <input
                    type="radio"
                    bind:group={personality_11}
                    value={rating}
                  />
                </label>
              </div>
            </td>
          {/each}
        </tr>
        <tr>
          <td
            >You are not too interested in discussing various interpretations
            and analyses of creative works.</td
          >
          {#each ["1", "2", "3", "4", "5", "6", "7"] as rating}
            <td>
              <div class="options">
                <label class="option">
                  <input
                    type="radio"
                    bind:group={personality_12}
                    value={rating}
                  />
                </label>
              </div>
            </td>
          {/each}
        </tr>
      </table>

      <button
        id="submitQuestionnaire"
        type="submit"
        disabled={!areRequiredFieldsFilled}>Submit</button
      >
    </form>
  </div> -->

	<div id="quiz">
		<div class="question">
			<p>You regularly make new friends.</p>
			<div class="options-likert">
				<div style="text-align:center; padding-top: 0;">
					<p>Strongly <br />disagree</p>
				</div>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_1}
						value="strongly disagree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_1}
						value="disagree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_1}
						value="slightly disagree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_1}
						value="neutral"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_1}
						value="slightly agree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_1}
						value="agree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_1}
						value="strongly agree"
						style="display: block;"
					/></label
				>
				<div style="text-align:center;">
					<p>Strongly <br />agree</p>
				</div>
			</div>
		</div>
		<div class="question">
			<p>
				You spend a lot of your free time exploring various random
				topics that pique your interest.
			</p>
			<div class="options-likert">
				<div style="text-align:center;">
					<p>Strongly <br />disagree</p>
				</div>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_2}
						value="strongly disagree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_2}
						value="disagree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_2}
						value="slightly disagree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_2}
						value="neutral"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_2}
						value="slightly agree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_2}
						value="agree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_2}
						value="strongly agree"
						style="display: block;"
					/></label
				>
				<div style="text-align:center;">
					<p>Strongly <br />agree</p>
				</div>
			</div>
		</div>
		<div class="question">
			<p>
				Seeing other people cry can easily make you feel like you want
				to cry too.
			</p>
			<div class="options-likert">
				<div style="text-align:center;">
					<p>Strongly <br />disagree</p>
				</div>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_3}
						value="strongly disagree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_3}
						value="disagree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_3}
						value="slightly disagree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_3}
						value="neutral"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_3}
						value="slightly agree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_3}
						value="agree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_3}
						value="strongly agree"
						style="display: block;"
					/></label
				>
				<div style="text-align:center;">
					<p>Strongly <br />agree</p>
				</div>
			</div>
		</div>
		<div class="question">
			<p>You often make a backup plan for a backup plan.</p>
			<div class="options-likert">
				<div style="text-align:center;">
					<p>Strongly <br />disagree</p>
				</div>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_4}
						value="strongly disagree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_4}
						value="disagree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_4}
						value="slightly disagree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_4}
						value="neutral"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_4}
						value="slightly agree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_4}
						value="agree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_4}
						value="strongly agree"
						style="display: block;"
					/></label
				>
				<div style="text-align:center;">
					<p>Strongly <br />agree</p>
				</div>
			</div>
		</div>
		<div class="question">
			<p>You usually stay calm, even under a lot of pressure.</p>
			<div class="options-likert">
				<div style="text-align:center;">
					<p>Strongly <br />disagree</p>
				</div>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_5}
						value="strongly disagree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_5}
						value="disagree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_5}
						value="slightly disagree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_5}
						value="neutral"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_5}
						value="slightly agree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_5}
						value="agree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_5}
						value="strongly agree"
						style="display: block;"
					/></label
				>
				<div style="text-align:center;">
					<p>Strongly <br />agree</p>
				</div>
			</div>
		</div>
		<div class="question">
			<p>
				At social events, you mostly talk to the ones you already know.
			</p>
			<div class="options-likert">
				<div style="text-align:center;">
					<p>Strongly <br />disagree</p>
				</div>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_6}
						value="strongly disagree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_6}
						value="disagree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_6}
						value="slightly disagree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_6}
						value="neutral"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_6}
						value="slightly agree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_6}
						value="agree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_6}
						value="strongly agree"
						style="display: block;"
					/></label
				>
				<div style="text-align:center;">
					<p>Strongly <br />agree</p>
				</div>
			</div>
		</div>
		<div class="question">
			<p>
				You prefer to completely finish one project before starting
				another.
			</p>
			<div class="options-likert">
				<div style="text-align:center;">
					<p>Strongly <br />disagree</p>
				</div>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_7}
						value="strongly disagree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_7}
						value="disagree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_7}
						value="slightly disagree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_7}
						value="neutral"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_7}
						value="slightly agree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_7}
						value="agree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_7}
						value="strongly agree"
						style="display: block;"
					/></label
				>
				<div style="text-align:center;">
					<p>Strongly <br />agree</p>
				</div>
			</div>
		</div>
		<div class="question">
			<p>You are very sentimental.</p>
			<div class="options-likert">
				<div style="text-align:center;">
					<p>Strongly <br />disagree</p>
				</div>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_8}
						value="strongly disagree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_8}
						value="disagree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_8}
						value="slightly disagree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_8}
						value="neutral"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_8}
						value="slightly agree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_8}
						value="agree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_8}
						value="strongly agree"
						style="display: block;"
					/></label
				>
				<div style="text-align:center;">
					<p>Strongly <br />agree</p>
				</div>
			</div>
		</div>
		<div class="question">
			<p>You like to use organizing tools like schedules and lists.</p>
			<div class="options-likert">
				<div style="text-align:center;">
					<p>Strongly <br />disagree</p>
				</div>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_9}
						value="strongly disagree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_9}
						value="disagree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_9}
						value="slightly disagree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_9}
						value="neutral"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_9}
						value="slightly agree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_9}
						value="agree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_9}
						value="strongly agree"
						style="display: block;"
					/></label
				>
				<div style="text-align:center;">
					<p>Strongly <br />agree</p>
				</div>
			</div>
		</div>
		<div class="question">
			<p>
				Even a small mistake can cause you to doubt your overall
				abilities and knowledge.
			</p>
			<div class="options-likert">
				<div style="text-align:center;">
					<p>Strongly <br />disagree</p>
				</div>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_10}
						value="strongly disagree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_10}
						value="disagree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_10}
						value="slightly disagree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_10}
						value="neutral"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_10}
						value="slightly agree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_10}
						value="agree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_10}
						value="strongly agree"
						style="display: block;"
					/></label
				>
				<div style="text-align:center;">
					<p>Strongly <br />agree</p>
				</div>
			</div>
		</div>
		<div class="question">
			<p>
				You feel comfortable just walking up to someone you find
				interesting and striking up a conversation.
			</p>
			<div class="options-likert">
				<div style="text-align:center;">
					<p>Strongly <br />disagree</p>
				</div>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_11}
						value="strongly disagree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_11}
						value="disagree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_11}
						value="slightly disagree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_11}
						value="neutral"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_11}
						value="slightly agree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_11}
						value="agree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_11}
						value="strongly agree"
						style="display: block;"
					/></label
				>
				<div style="text-align:center;">
					<p>Strongly <br />agree</p>
				</div>
			</div>
		</div>
		<div class="question">
			<p>
				You are not too interested in discussing various interpretations
				and analyses of creative works.
			</p>
			<div class="options-likert">
				<div style="text-align:center;">
					<p>Strongly <br />disagree</p>
				</div>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_12}
						value="strongly disagree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_12}
						value="disagree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_12}
						value="slightly disagree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_12}
						value="neutral"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_12}
						value="slightly agree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_12}
						value="agree"
						style="display: block;"
					/></label
				>
				<label class="option">
					<input
						type="radio"
						bind:group={personality_12}
						value="strongly agree"
						style="display: block;"
					/></label
				>
				<div style="text-align:center;">
					<p>Strongly <br />agree</p>
				</div>
			</div>
		</div>
	</div>

	<!-- <button on:click={previous(1)}>Previous</button> -->
	<button on:click={next(1)}>Next</button>
</div>
