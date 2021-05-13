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
  mean: string;
  standard_deviation: string;
};

type PDoutput = {
  date: Date;
  mean: number;
  standard_deviation: number;
};

const formatDate = (n: Date) => {
  return `${n.getMinutes()}:${n.getSeconds()}`;
};

const FishMS: React.FC<{ index: number }> = ({ index }) => {
  const [data, setData] = useState<Array<PDoutput>>();
  const ref = useRef<any>(null);

  useEffect(() => {
    csv("/data/aquaculture/fish_growth_parameters.csv", (_): PDoutput => {
      const d = _ as PDinput;
      return {
        date: new Date(+d.unix_time * 1000),
        mean: +d.mean,
        standard_deviation: +d.standard_deviation,
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
            label: `mean`,
            data: data?.map((el) => el.mean),
            backgroundColor: "#1D4ED84D",
            borderColor: "#1D4ED880",
            borderWidth: 1,
          },
          {
            type: "line",
            label: `standard_deviation`,
            data: data?.map((el) => el.standard_deviation),
            backgroundColor: "#B91C1C4D",
            borderColor: "#B91C1C80",
            borderWidth: 1,
          },
        ],
      }}
      options={options}
    />
  );
};

export default FishMS;
