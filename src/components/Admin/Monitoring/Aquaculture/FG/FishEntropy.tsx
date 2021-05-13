import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import { csv } from "d3-fetch";

const options: ChartOptions = {
  animation: { duration: 0 },
  scales: {
    y: {
      min: 0,
    },
  },
  maintainAspectRatio: false,
};

type PDinput = {
  unix_time: string;
  entropy: string;
};

type PDoutput = {
  date: Date;
  entropy: number;
};

const formatDate = (n: Date) => {
  return `${n.getMinutes()}:${n.getSeconds()}`;
};

const FishEntropy: React.FC<{ index: number }> = ({ index }) => {
  const [data, setData] = useState<Array<PDoutput>>();
  const ref = useRef<any>(null);

  useEffect(() => {
    csv("/data/aquaculture/fish_growth_parameters.csv", (_): PDoutput => {
      const d = _ as PDinput;
      return {
        date: new Date(+d.unix_time * 1000),
        entropy: +d.entropy,
      };
    }).then((data) => {
      setData(() => {
        return data.slice(Math.max(index - 15, 0), index + 1);
      });
    });
  }, [index]);

  return (
    <Line
      type="line"
      ref={ref}
      data={{
        labels: data?.map((el) => formatDate(el.date)),
        datasets: [
          {
            type: "line",
            label: `entropy`,
            data: data?.map((el) => el.entropy),
            backgroundColor: "#1D4ED84D",
            borderColor: "#1D4ED880",
            borderWidth: 1,
          },
        ],
      }}
      options={options}
    />
  );
};

export default FishEntropy;
