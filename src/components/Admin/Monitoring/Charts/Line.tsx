import React, { useRef } from "react";
import { Line } from "react-chartjs-2";
import useDtWaterLevel from "../../../../hooks/useDtWaterLevel";

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
  const [dtdata, labels, _, hour] = useDtWaterLevel({ frequency: 1000, n: 10 });
  const chart = useRef<React.Ref<any>>(null);

  return (
    <Line
      ref={chart}
      type="Line"
      data={{
        labels,
        datasets: [
          {
            label: `DT Water Level (${hour}:00)`,
            data: dtdata,
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
