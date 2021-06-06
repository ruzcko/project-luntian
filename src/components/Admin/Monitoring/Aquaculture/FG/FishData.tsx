import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import { csv } from "d3-fetch";

const options: ChartOptions = {
  animation: { duration: 0 },
  scales: {
    y: {
      min: 0,
      max: 1,
    },
  },
  maintainAspectRatio: false,
};

type PDinput = {
  unix_time: string;
  contrast: string;
  energy: string;
  correlation: string;
  homogeneity: string;
};

type PDoutput = {
  date: Date;
  contrast: number;
  energy: number;
  correlation: number;
  homogeneity: number;
};

const formatDate = (n: Date) => {
  return `${n.getMonth()}:${n.getDate()}`;
};

const FishData: React.FC<{ index: number }> = ({ index }) => {
  const [data, setData] = useState<Array<PDoutput>>();
  const ref = useRef<any>(null);

  useEffect(() => {
    csv("/data/aquaculture/fish_growth_parameters.csv", (_): PDoutput => {
      const d = _ as PDinput;
      return {
        date: new Date(+d.unix_time * 1000),
        contrast: +d.contrast,
        energy: +d.energy,
        correlation: +d.correlation,
        homogeneity: +d.homogeneity,
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
            label: `Contrast`,
            data: data?.map((el) => el.contrast),
            backgroundColor: "#1D4ED84D",
            borderColor: "#1D4ED880",
            borderWidth: 1,
          },
          {
            type: "line",
            label: `Energy`,
            data: data?.map((el) => el.energy),
            backgroundColor: "#1D4ED84D",
            borderColor: "#1D4ED880",
            borderWidth: 1,
          },
          {
            type: "line",
            label: `Correlation`,
            data: data?.map((el) => el.correlation),
            backgroundColor: "#1D4ED84D",
            borderColor: "#1D4ED880",
            borderWidth: 1,
          },
          {
            type: "line",
            label: `Homogeneity`,
            data: data?.map((el) => el.homogeneity),
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

export default FishData;
