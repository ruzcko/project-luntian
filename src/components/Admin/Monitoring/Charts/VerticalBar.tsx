import React, { useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import { csv } from "d3-fetch";

const options: ChartOptions = {
  animation: { duration: 300 },
  animations: {},
  scales: {
    y: {
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

const VerticalBar: React.FC = () => {
  const [data, setData] = useState<Array<DToutput>>();
  const bars = 10;
  const frequency = 1000;
  const ref = useRef<any>(null);

  useEffect(() => {
    csv("/data/hydroponics/dt_water_level.csv", (_): DToutput => {
      const d = _ as DTinput;
      return { date: new Date(+d.unix_time), water_level: +d.water_level };
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
      let line = ref.current?.data.datasets[1].data as Array<number>;
      let labels = ref.current?.data.labels as Array<string>;

      const n = bar.length;

      bar?.splice(0, n - bars);
      bar?.push(Math.floor(Math.random() * 100));

      line?.splice(0, n - bars);
      line?.push(Math.floor(Math.random() * 100));

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
            label: `DT Water Bar`,
            data: data?.map((el) => el.water_level),
            backgroundColor: "#1D4ED84D",
            borderColor: "#1D4ED880",
            borderWidth: 1,
          },
          {
            type: "line",
            label: "DT Water Line",
            data: data?.map((el) => el.water_level),
            backgroundColor: "#1118274D",
            borderColor: "#11182780",
            borderWidth: 1,
            tension: 0.5,
          },
        ],
      }}
      options={options}
    />
  );
};

export default VerticalBar;
