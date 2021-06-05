import React, { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import { HydroponicsData } from "../../../../../luntian-types";
import { formatDate } from "../../../../../utils/helpers";

const options: ChartOptions = {
  animation: { duration: 300 },
  scales: {
    y: {
      ticks: {
        callback: function (value) {
          return value + "uS/cm";
        },
      },
      min: 0,
      max: 2500,
    },
  },
  maintainAspectRatio: false,
};

interface Props {
  data: Array<HydroponicsData>;
  frequency: number;
}

const NMElecCond: React.FC<Props> = ({ data, frequency }) => {
  const n = useRef(9);
  const toShow: Array<HydroponicsData> = data.slice(0, 10);
  const ref = useRef<any>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      let _data = ref.current?.data.datasets[0].data as Array<number>;
      let _time = ref.current?.data.labels as Array<string>;
      n.current = n.current >= 23 ? 0 : n.current + 1;

      _time?.splice(0, 1);
      _time?.push(formatDate(new Date(data[n.current].unix_time * 1000)));

      _data?.splice(0, 1);
      _data?.push(data[n.current].nm_electric_conductivity);

      ref.current?.update();
    }, frequency);

    return () => clearInterval(interval);
  }, [data, frequency]);

  return (
    <Line
      type="line"
      ref={ref}
      data={{
        labels: toShow?.map((el) => formatDate(new Date(el.unix_time * 1000))),
        datasets: [
          {
            type: "line",
            label: `DT Electric Conductivity`,
            data: toShow?.map((el) => el.nm_electric_conductivity),
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

export default NMElecCond;
