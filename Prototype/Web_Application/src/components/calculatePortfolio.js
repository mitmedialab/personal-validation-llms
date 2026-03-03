import { quizData } from "../lib/stores/store-quiz.js";

let currentRound = 1;

quizData.subscribe((currentQuizData) => {
  currentRound = currentQuizData.round;

  // console.log("CHECK ROUND " + currentRound);
});

function simulateOutcome(probabilities, outcomes) {
  let rnd = Math.random();
  let cumulative = 0;
  for (let i = 0; i < probabilities.length; i++) {
    cumulative += probabilities[i];
    if (rnd < cumulative) {
      return outcomes[i];
    }
  }
  return "probability doesn't add up to 1";
}

export function calculatePortfolioValue(
  allocations,
  initial_value,
  // highRiskValue,
  // mediumRiskValue,
  // lowRiskValue,
) {
  const investment_options = {
    high_risk: {
      probabilities: [0.5, 0.2, 0.3],
      outcomes: [3, 1, 0.5],
    },
    medium_risk: {
      probabilities: [0.5, 0.3, 0.2],
      outcomes: [2, 1, 0.75],
    },
    low_risk: {
      probabilities: [0.6, 0.3, 0.1],
      outcomes: [1.1, 1, 0.95],
    },
  };

  const investment_options_bull = {
    high_risk: {
      probabilities: [0.8, 0.2, 0],
      outcomes: [3, 1, 0.5],
    },
    medium_risk: {
      probabilities: [0.5, 0.2, 0.3],
      outcomes: [2, 1, 0.75],
    },
    low_risk: {
      probabilities: [0.7, 0.2, 0.1],
      outcomes: [1.1, 1, 0.95],
    },
  };

  const investment_options_bear = {
    high_risk: {
      probabilities: [0, 0.2, 0.8],
      outcomes: [3, 1, 0.5],
    },
    medium_risk: {
      probabilities: [0.3, 0.2, 0.5],
      outcomes: [2, 1, 0.8],
    },
    low_risk: {
      probabilities: [0.1, 0.2, 0.7],
      outcomes: [1.1, 1, 0.95],
    },
  };

  let reallocated_values = {};

  let updated_values = {
    high_risk: 0,
    medium_risk: 0,
    low_risk: 0,
  };

  let percentage_change_per_option = {};
  let values_change_per_option = {};
  let total_portfolio_value = 0;
  let nextRound = currentRound + 1;
  // console.log("this round: " + nextRound);

  Object.keys(allocations).forEach((option) => {
    let probabilities;
    let outcomes;

    if (
      (nextRound >= 1 && nextRound < 4) ||
      (nextRound >= 6 && nextRound < 8)
    ) {
      ({ probabilities, outcomes } = investment_options_bull[option]);
      // console.log("probabilities: " + probabilities);
    } else if (
      (nextRound >= 4 && nextRound < 6) ||
      (nextRound >= 8 && nextRound < 11)
    ) {
      ({ probabilities, outcomes } = investment_options_bear[option]);
      // console.log("probabilities: " + probabilities);
    } else {
      ({ probabilities, outcomes } = investment_options_bull[option]);
      // console.log("probabilities: " + probabilities);
    }

    const outcome = simulateOutcome(probabilities, outcomes);
    // console.log(
    //   "total initial value " + initial_value,
    //   "Allocations per option: " + allocations[option],
    // );
    //reallocate based on new allocation
    reallocated_values[option] = (initial_value * allocations[option]) / 100;
    // console.log("reallocated values: " + reallocated_values[option]);

    //update values after simulation
    updated_values[option] = reallocated_values[option] * outcome;
    //total portfolio value after simulation
    total_portfolio_value += updated_values[option];

    // console.log("Outcome per option: " + outcome);
    // console.log("updated value: " + updated_values[option]);

    //percentage change per option based on simulated outcome only
    if (allocations[option] === 0) {
      percentage_change_per_option[option] =
        ((reallocated_values[option] * outcome - reallocated_values[option]) /
          0.00000000000000001) *
        100;
    } else {
      percentage_change_per_option[option] =
        ((reallocated_values[option] * outcome - reallocated_values[option]) /
          reallocated_values[option]) *
        100;
    }
    // console.log(
    //   "Percentage changes per option: " + percentage_change_per_option[option],
    // );
    //value change per option based on simulated outcome only
    values_change_per_option[option] =
      reallocated_values[option] * outcome - reallocated_values[option];
    // console.log(
    //   "Value changes per option: " + values_change_per_option[option],
    // );
  });

  // console.log("Total portfolio value: " + total_portfolio_value);

  let total_percentage_change =
    ((total_portfolio_value - initial_value) / initial_value) * 100;

  // console.log("Total percentage change: " + total_percentage_change);

  return [
    total_portfolio_value.toFixed(2),
    total_percentage_change.toFixed(0),
    updated_values,
    percentage_change_per_option,
    values_change_per_option,
  ];
}
