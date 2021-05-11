import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import { csv } from "d3-fetch";

const options: ChartOptions = {
  animation: { duration: 300 },
  scales: {
    y: {
      ticks: {
        callback: function (value) {
          return value + "mg/g";
        },
      },
      min: 0,
    },
  },
  maintainAspectRatio: false,
};

type LPinput = {
  unix_time: string;
  chlorophyll_a: string;
  chlorophyll_b: string;
  vitamin_c: string;
};

type LPoutput = {
  date: Date;
  chlorophyll_a: number;
  chlorophyll_b: number;
  vitamin_c: number;
};

const formatDate = (n: Date) => {
  return `${n.getMinutes()}:${n.getSeconds()}`;
};

const LPData: React.FC = () => {
  const [data, setData] = useState<Array<LPoutput>>();
  const ref = useRef<any>(null);

  useEffect(() => {
    csv("/data/hydroponics/lettuce_phenotype.csv", (_): LPoutput => {
      const d = _ as LPinput;
      return {
        date: new Date(+d.unix_time),
        chlorophyll_a: +d.chlorophyll_a,
        chlorophyll_b: +d.chlorophyll_b,
        vitamin_c: +d.vitamin_c,
      };
    }).then((data) => {
      setData(() => {
        return data;
      });
    });
  }, []);

  return (
    <Line
      type="line"
      ref={ref}
      data={{
        labels: data?.map((el) => formatDate(el.date)),
        datasets: [
          {
            type: "line",
            label: "Chlorophyll A",
            data: data?.map((el) => el.chlorophyll_a),
            backgroundColor: "#1D4ED84D",
            borderColor: "#1D4ED880",
            borderWidth: 1,
          },
          {
            type: "line",
            label: "Chlorophyll B",
            data: data?.map((el) => el.chlorophyll_b),
            backgroundColor: "#1D4ED84D",
            borderColor: "#1D4ED880",
            borderWidth: 1,
          },
          {
            type: "line",
            label: "Vitamin C",
            data: data?.map((el) => el.vitamin_c),
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

export default LPData;
