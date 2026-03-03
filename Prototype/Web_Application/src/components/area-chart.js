// const ctx = document.getElementById("area-chart").getContext("2d");

const labels = ["Month 0"];

const portfolio_value = {
  labels: labels,
  datasets: [
    {
      label: "Portfolio value",
      backgroundColor: "rgb(29, 171, 107, 0.3)",
      borderColor: "rgb(29, 171, 107)",
      fill: true,
      tension: 0.5,
      data: [1000],
    },
  ],
};

const area_config = {
  type: "line",
  data: portfolio_value,
  responsive: true,
  maintainAspectRatio: false,
  options: {
    plugins: {
      legend: {
        display: false,
      },
    },
  },
};

// myChart = new Chart(ctx, area_config);

export function initializeAreaChart(canvasID) {
  const ctx = document.getElementById(canvasID).getContext("2d");
  const areaChart = new Chart(ctx, area_config);

  return areaChart;
}

// export function add_to_area_chart(myChart, label, value) {
//   myChart.data.labels.push(label);

//   myChart.data.datasets.forEach((dataset) => {
//     dataset.data.push(value);
//   });

//   myChart.update();
// }
