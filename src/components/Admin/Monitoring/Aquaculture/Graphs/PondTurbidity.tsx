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
          return value + "NTU";
        },
      },
      min: 0,
      max: 15,
    },
  },
  maintainAspectRatio: false,
};

type PDinput = {
  unix_time: string;
  turbidity_voltage: string;
};

type PDoutput = {
  date: Date;
  turbidity_voltage: number;
};

const formatDate = (n: Date) => {
  return `${n.getMinutes()}:${n.getSeconds()}`;
};

const PondTurbidity: React.FC = () => {
  const [data, setData] = useState<Array<PDoutput>>();
  const bars = 10;
  const frequency = 1500;
  const ref = useRef<any>(null);

  useEffect(() => {
    csv("/data/aquaculture/pond_turbidity_voltage.csv", (_): PDoutput => {
      const d = _ as PDinput;
      return {
        date: new Date(+d.unix_time * 1000),
        turbidity_voltage: +d.turbidity_voltage,
      };
    }).then((data) => {
      setData(() => {
        data.splice(0, data.length - bars - 1);
        return data;
      });
    });
  }, [bars]);

  useEffect(() => {
    const interval = setInterval(() => {
      let bar = ref.current?.data.datasets[0].data as Array<number>;
      let labels = ref.current?.data.labels as Array<string>;

      const n = bar.length;

      bar?.splice(0, n - bars);
      bar?.push(Math.floor(Math.random() * 14 + 1));

      labels?.splice(0, n - bars);
      labels?.push(formatDate(new Date()));

      ref.current?.update();
    }, frequency);

    return () => clearInterval(interval);
  }, [bars, frequency]);

  return (
    <Line
      type="line"
      ref={ref}
      data={{
        labels: data?.map((el) => formatDate(el.date)),
        datasets: [
          {
            type: "line",
            label: `Turbidity Voltage (NTU)`,
            data: data?.map((el) => el.turbidity_voltage),
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

export default PondTurbidity;
