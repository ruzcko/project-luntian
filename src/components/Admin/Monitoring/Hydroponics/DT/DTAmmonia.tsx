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
          return value + "ppm";
        },
      },
      min: 0,
      max: 20,
    },
  },
  maintainAspectRatio: false,
};

type DTinput = {
  unix_time: string;
  ammonia_level: string;
};

type DToutput = {
  date: Date;
  ammonia_level: number;
};

const formatDate = (n: Date) => {
  return `${n.getMinutes()}:${n.getSeconds()}`;
};

const DTAmmonia: React.FC = () => {
  const [data, setData] = useState<Array<DToutput>>();
  const bars = 10;
  const frequency = 1500;
  const ref = useRef<any>(null);

  useEffect(() => {
    csv("/data/hydroponics/dt_ammonia_level.csv", (_): DToutput => {
      const d = _ as DTinput;
      return {
        date: new Date(+d.unix_time * 1000),
        ammonia_level: +d.ammonia_level,
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
      bar?.push(Math.floor(Math.random() * 15 + 5));

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
            label: `DT Ammonia (NH3)`,
            data: data?.map((el) => el.ammonia_level),
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

export default DTAmmonia;
