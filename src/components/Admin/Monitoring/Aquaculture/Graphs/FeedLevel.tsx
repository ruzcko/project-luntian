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
          return value + "%";
        },
      },
      min: 0,
      max: 100,
    },
  },
  maintainAspectRatio: false,
};

type PDinput = {
  unix_time: string;
  feed_level: string;
};

type PDoutput = {
  date: Date;
  feed_level: number;
};

const formatDate = (n: Date) => {
  return `${n.getMinutes()}:${n.getSeconds()}`;
};

const FeedLevel: React.FC = () => {
  const [data, setData] = useState<Array<PDoutput>>();
  const bars = 20;
  const frequency = 1500;
  const ref = useRef<any>(null);

  useEffect(() => {
    csv("/data/aquaculture/pond_feed_level.csv", (_): PDoutput => {
      const d = _ as PDinput;
      return {
        date: new Date(+d.unix_time * 1000),
        feed_level: +d.feed_level,
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

      const l = bar[bar.length - 1];
      const l2 = bar[bar.length - 2];

      if (l - l2 < 0) {
        if (l <= 10) bar.push(100);
        else {
          bar.push(l - Math.random() * 10);
        }
      } else {
        bar.push(l - Math.random() * 10);
      }

      // if (prevRef.current >= 9) up.current = false;
      // if (prevRef.current <= 1) up.current = true;

      // if (up.current) prevRef.current += 10;
      // else prevRef.current -= Math.random();

      // bar1?.push(prevRef.current * 10);

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
            label: `Pond Feed Level (%)`,
            data: data?.map((el) => el.feed_level),
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

export default FeedLevel;
