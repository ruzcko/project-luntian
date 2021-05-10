import React from "react";
import { Line } from "react-chartjs-2";

const options = {
  animation: { duration: 0 },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
    xAxes: [
      {
        ticks: {
          autoSkip: false,
          maxRotation: 90,
          minRotation: 90,
        },
      },
    ],
  },
  maintainAspectRatio: false,
};

const LineChart: React.FC = () => {
  return (
    <Line
      type="Line"
      data={{
        labels: "1",
        datasets: [
          {
            label: `line`,
            data: [2],
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
            tension: 0.5,
          },
        ],
      }}
      options={options}
    />
  );
};

export default LineChart;
