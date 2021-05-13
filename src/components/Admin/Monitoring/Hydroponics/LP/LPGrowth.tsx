import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import { csv } from "d3-fetch";
import { months } from "../LPGraphs";

const options: ChartOptions = {
  animation: { duration: 0 },
  scales: {
    y: {
      ticks: {
        callback: function (value) {
          return value + "g";
        },
      },
      min: 0,
    },
  },
  maintainAspectRatio: false,
};

type LPinput = {
  unix_time: string;
  freshweight: string;
};

type LPoutput = {
  date: Date;
  freshweight: number;
};

const formatDate = (n: Date) => {
  return `${months[n.getMonth()]}:${n.getDate()}`;
};

const LPGrowth: React.FC<{ index: number }> = ({ index }) => {
  const [data, setData] = useState<Array<LPoutput>>();
  const ref = useRef<any>(null);

  useEffect(() => {
    csv("/data/hydroponics/lettuce_phenotype.csv", (_): LPoutput => {
      const d = _ as LPinput;
      return {
        date: new Date(+d.unix_time * 1000),
        freshweight: +d.freshweight,
      };
    }).then((data) => {
      setData(() => {
        return data.slice(0, index + 1);
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
            label: "Fresh Weight",
            data: data?.map((el) => el.freshweight),
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

export default LPGrowth;
