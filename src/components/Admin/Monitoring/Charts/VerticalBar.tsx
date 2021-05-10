import React from "react";
import { Bar } from "react-chartjs-2";
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

const VerticalBar: React.FC<{ n?: number; frequency?: number }> = ({
  n,
  frequency,
}) => {
  const [data, labels, colors, hour] = useDtWaterLevel({
    frequency,
    n,
  });

  return (
    <Bar
      type="Bar"
      data={{
        labels,
        datasets: [
          {
            label: `DT Water Level (${hour}:00)`,
            data: data,
            backgroundColor: colors,
            borderColor: "#11182780",
            borderWidth: 1,
          },
        ],
      }}
      options={options}
    />
  );
};

export default VerticalBar;
