import React, { useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import { csv } from "d3-fetch";

const options: ChartOptions = {
  animation: { duration: 300 },
  scales: {
    y: {
      ticks: {
        callback: function (value) {
          return value + "L";
        },
      },
      min: 0,
      max: 100,
    },
  },
  maintainAspectRatio: false,
};

type DTinput = {
  unix_time: string;
  water_level: string;
};

type DToutput = {
  date: Date;
  water_level: number;
};

const formatDate = (n: Date) => {
  return `${n.getMinutes()}:${n.getSeconds()}`;
};

const DTWaterLevel: React.FC = () => {
  const [data, setData] = useState<Array<DToutput>>();
  const prevRef = useRef(0);
  const up = useRef(true);
  const bars = 20;
  const frequency = 2500;
  const ref = useRef<any>(null);

  useEffect(() => {
    csv("/data/hydroponics/dt_water_level.csv", (_): DToutput => {
      const d = _ as DTinput;
      return {
        date: new Date(+d.unix_time * 1000),
        water_level: +d.water_level,
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
      let bar1 = ref.current?.data.datasets[0].data as Array<number>;
      let labels = ref.current?.data.labels as Array<string>;

      const n = bar1.length;

      bar1?.splice(0, n - bars);

      if (prevRef.current >= 10) up.current = false;
      if (prevRef.current <= 2) up.current = true;

      if (up.current) prevRef.current += 0.5;
      else prevRef.current -= 2;

      bar1?.push(prevRef.current * 10);

      labels?.splice(0, n - bars);
      labels?.push(formatDate(new Date()));

      ref.current?.update();
    }, frequency);

    return () => clearInterval(interval);
  }, [bars, frequency]);

  return (
    <Bar
      type="bar"
      ref={ref}
      data={{
        labels: data?.map((el) => formatDate(el.date)),
        datasets: [
          {
            type: "bar",
            label: `DT Water Level (H2O1)`,
            data: data?.map((el) => el.water_level),
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

export default DTWaterLevel;
