// const ctx2 = document.getElementById("pie-chart").getContext("2d");

const portfolio_allocation = {
  labels: [
    "High Risk High Returns",
    "Medium Risk Medium Returns",
    "Low Risk Low Returns",
  ],
  datasets: [
    {
      label: "Portfolio Allocation",
      data: [30, 40, 30],
      backgroundColor: ["#ED2277", "#B8EB27", "#2F58E6"],
      hoverOffset: 4,
    },
  ],
};

const pie_config = {
  type: "doughnut",
  data: portfolio_allocation,
  options: {
    animation: {
      animateRotate: false,
      animateScale: false, // optional
    },
    plugins: {
      legend: { display: false },
    },
  },
};

// const pieChart = new Chart(ctx2, pie_config);

export function initializePieChart(canvasID) {
  const ctx = document.getElementById(canvasID).getContext("2d");
  const pieChart = new Chart(ctx, pie_config);

  return pieChart;
}
