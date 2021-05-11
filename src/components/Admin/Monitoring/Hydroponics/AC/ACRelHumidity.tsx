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
          return value + "°C";
        },
      },
      min: 0,
      max: 100,
    },
  },
  maintainAspectRatio: false,
};

type ACinput = {
  unix_time: string;
  relative_humidity: string;
};

type ACoutput = {
  date: Date;
  relative_humidity: number;
};

const formatDate = (n: Date) => {
  return `${n.getMinutes()}:${n.getSeconds()}`;
};

const ACRelHumidity: React.FC = () => {
  const [data, setData] = useState<Array<ACoutput>>();
  const bars = 10;
  const frequency = 1000;
  const ref = useRef<any>(null);

  useEffect(() => {
    csv("/data/hydroponics/ac_humidity.csv", (_): ACoutput => {
      const d = _ as ACinput;
      return {
        date: new Date(+d.unix_time * 1000),
        relative_humidity: +d.relative_humidity,
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
      bar?.push(Math.floor(Math.random() * 100));

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
            label: `Relative Humidity`,
            data: data?.map((el) => el.relative_humidity),
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

export default ACRelHumidity;
