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
  convhull_length: string;
  convhull_width: string;
};

type PDoutput = {
  date: Date;
  convhull_length: number;
  convhull_width: number;
};

const formatDate = (n: Date) => {
  return `${n.getMinutes()}:${n.getSeconds()}`;
};

const FishConv: React.FC<{ index: number }> = ({ index }) => {
  const [data, setData] = useState<Array<PDoutput>>();
  const ref = useRef<any>(null);

  useEffect(() => {
    csv("/data/aquaculture/fish_growth_parameters.csv", (_): PDoutput => {
      const d = _ as PDinput;
      return {
        date: new Date(+d.unix_time * 1000),
        convhull_length: +d.convhull_length,
        convhull_width: +d.convhull_width,
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
            label: `convhull_length`,
            data: data?.map((el) => el.convhull_length),
            backgroundColor: "#1D4ED84D",
            borderColor: "#1D4ED880",
            borderWidth: 1,
          },
          {
            type: "line",
            label: `convhull_width`,
            data: data?.map((el) => el.convhull_width),
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

export default FishConv;
