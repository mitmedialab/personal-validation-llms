<script>
  import { currentPage } from "$lib/stores/currentPage.js";

  export let onNavigate; // control view state transition
  // export let currentPage;

  import { quizData } from "../lib/stores/store-quiz.js";

  let month = "";
  let day = "";
  let year = "";
  let birthHour = "";
  let birthMinute = "";
  let birthCity = "";

  let areRequiredFieldsFilled = false;

  $: areRequiredFieldsFilled = month !== "" && day !== "" && year !== "";

  // When the user progresses to the next page or on input change
  function updateStore() {
    quizData.update((currentData) => {
      return {
        ...currentData,
        birthdate_month: month,
        birthdate_day: day,
        birthdate_year: year,
        birth_hour: birthHour,
        birth_minute: birthMinute,
        birth_city: birthCity,
      };
    });
  }

  // quizData.subscribe((value) => {
  //   console.log(value);
  // });

  const next = (n) => () => {
    if (areRequiredFieldsFilled) {
      updateStore();
      onNavigate($currentPage + n);
    } else {
      showPopup(); // Call this if you want to show a popup
    }
  };

  // const previous = (n) => () => onNavigate(currentPage - n);

  import Diagram from "../components/diagram.svelte";
  let activatedIcons = {
    calendar: true,
    survey: false,
    data: false,
    astrology: false,
    personality: false,
    expert: false,
    ai: false,
  };
</script>

<!-- <div class="diagram-container">
  <Diagram {activatedIcons} />
</div> -->
<div class="survey-page">
  <h2>Tell us about yourself</h2>

  <p>
    We will use this information to predict your future investment behavior
    based on your zodiac sign.
  </p>
  <div id="quiz">
    <div class="question">
      <label for="birthDate">What is your birthdate?</label>
      <select bind:value={month} id="month">
        <option value="" disabled selected>month</option>
        <option value="jan">January</option>
        <option value="feb">February</option>
        <option value="mar">March</option>
        <option value="apr">April</option>
        <option value="may">May</option>
        <option value="jun">June</option>
        <option value="jul">July</option>
        <option value="aug">August</option>
        <option value="sep">September</option>
        <option value="oct">October</option>
        <option value="nov">November</option>
        <option value="dec">December</option>
      </select>
      <select bind:value={day} id="day">
        <option value="" disabled selected>day</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16">16</option>
        <option value="17">17</option>
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="20">20</option>
        <option value="21">21</option>
        <option value="22">22</option>
        <option value="23">23</option>
        <option value="24">24</option>
        <option value="25">25</option>
        <option value="26">26</option>
        <option value="27">27</option>
        <option value="28">28</option>
        <option value="29">29</option>
        <option value="30">30</option>
        <option value="31">31</option>
      </select>
      <select bind:value={year} id="year">
        <option value="" disabled selected>year</option>
        <option value="2006">2006</option>
        <option value="2005">2005</option>
        <option value="2004">2004</option>
        <option value="2003">2003</option>
        <option value="2002">2002</option>
        <option value="2001">2001</option>
        <option value="2000">2000</option>
        <option value="1999">1999</option>
        <option value="1998">1998</option>
        <option value="1997">1997</option>
        <option value="1996">1996</option>
        <option value="1995">1995</option>
        <option value="1994">1994</option>
        <option value="1993">1993</option>
        <option value="1992">1992</option>
        <option value="1991">1991</option>
        <option value="1990">1990</option>
        <option value="1989">1989</option>
        <option value="1988">1988</option>
        <option value="1987">1987</option>
        <option value="1986">1986</option>
        <option value="1985">1985</option>
        <option value="1984">1984</option>
        <option value="1983">1983</option>
        <option value="1982">1982</option>
        <option value="1981">1981</option>
        <option value="1980">1980</option>
        <option value="1979">1979</option>
        <option value="1978">1978</option>
        <option value="1977">1977</option>
        <option value="1976">1976</option>
        <option value="1975">1975</option>
        <option value="1974">1974</option>
        <option value="1973">1973</option>
        <option value="1972">1972</option>
        <option value="1971">1971</option>
        <option value="1970">1970</option>
        <option value="1969">1969</option>
        <option value="1968">1968</option>
        <option value="1967">1967</option>
        <option value="1966">1966</option>
        <option value="1965">1965</option>
        <option value="1964">1964</option>
        <option value="1963">1963</option>
        <option value="1962">1962</option>
        <option value="1961">1961</option>
        <option value="1960">1960</option>
      </select>
    </div>

    <div class="question">
      <label for="birthTime">What time were you born? (Optional)</label>
      <select bind:value={birthHour} id="birthHour">
        <option value="" disabled selected>hour</option>
        <option value="">n/a</option>
        <option value="0">12am</option>
        <option value="1">1am</option>
        <option value="2">2am</option>
        <option value="3">3am</option>
        <option value="4">4am</option>
        <option value="5">5am</option>
        <option value="6">6am</option>
        <option value="7">7am</option>
        <option value="8">8am</option>
        <option value="9">9am</option>
        <option value="10">10am</option>
        <option value="11">11am</option>
        <option value="12">12pm</option>
        <option value="13">1pm</option>
        <option value="14">2pm</option>
        <option value="15">3pm</option>
        <option value="16">4pm</option>
        <option value="17">5pm</option>
        <option value="18">6pm</option>
        <option value="19">7pm</option>
        <option value="20">8pm</option>
        <option value="21">9pm</option>
        <option value="22">10pm</option>
        <option value="23">11pm</option>
      </select>
      <select bind:value={birthMinute} id="birthMinute">
        <option value="" disabled selected>min</option>
        <option value="">n/a</option>
        <option value="00">00</option>
        <option value="01">01</option>
        <option value="02">02</option>
        <option value="03">03</option>
        <option value="04">04</option>
        <option value="05">05</option>
        <option value="06">06</option>
        <option value="07">07</option>
        <option value="08">08</option>
        <option value="09">09</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16">16</option>
        <option value="17">17</option>
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="20">20</option>
        <option value="21">21</option>
        <option value="22">22</option>
        <option value="23">23</option>
        <option value="24">24</option>
        <option value="25">25</option>
        <option value="26">26</option>
        <option value="27">27</option>
        <option value="28">28</option>
        <option value="29">29</option>
        <option value="30">30</option>
        <option value="31">31</option>
        <option value="32">32</option>
        <option value="33">33</option>
        <option value="34">34</option>
        <option value="35">35</option>
        <option value="36">36</option>
        <option value="37">37</option>
        <option value="38">38</option>
        <option value="39">39</option>
        <option value="40">40</option>
        <option value="41">41</option>
        <option value="42">42</option>
        <option value="43">43</option>
        <option value="44">44</option>
        <option value="45">45</option>
        <option value="46">46</option>
        <option value="47">47</option>
        <option value="48">48</option>
        <option value="49">49</option>
        <option value="50">50</option>
        <option value="51">51</option>
        <option value="52">52</option>
        <option value="53">53</option>
        <option value="54">54</option>
        <option value="55">55</option>
        <option value="56">56</option>
        <option value="57">57</option>
        <option value="58">58</option>
        <option value="59">59</option>
      </select>
    </div>

    <div class="question">
      <label for="birthCity">Which city were you born in? (Optional)</label>
      <input
        bind:value={birthCity}
        type="text"
        id="birthCity"
        name="birthCity"
        placeholder="Enter city, state, country         "
      />
    </div>
  </div>

  <!-- <button on:click={previous(1)}>Previous</button> -->
  <button on:click={next(1)} disabled={!areRequiredFieldsFilled}>Next</button>
</div>
