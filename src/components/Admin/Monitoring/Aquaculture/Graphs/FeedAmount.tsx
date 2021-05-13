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
          return value + "mg";
        },
      },
      min: 0,
    },
  },
  maintainAspectRatio: false,
};

type PDinput = {
  unix_time: string;
  feed_amount: string;
};

type PDoutput = {
  date: Date;
  feed_amount: number;
};

const formatDate = (n: Date) => {
  return `${n.getMinutes()}:${n.getSeconds()}`;
};

const FeedAmount: React.FC = () => {
  const [data, setData] = useState<Array<PDoutput>>();
  const bars = 10;
  const frequency = 1500;
  const ref = useRef<any>(null);

  useEffect(() => {
    csv("/data/aquaculture/pond_feed_amount.csv", (_): PDoutput => {
      const d = _ as PDinput;
      return {
        date: new Date(+d.unix_time * 1000),
        feed_amount: +d.feed_amount,
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
      bar?.push(Math.floor(Math.random() * 4250));

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
            label: `Feed Amount (mg)`,
            data: data?.map((el) => el.feed_amount),
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

export default FeedAmount;
