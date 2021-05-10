import React, { useEffect, useState } from "react";
import { csv } from "d3";
import {
  VerticalBar,
  Doughnut,
  Line,
  MultiAxisLine,
} from "../../components/Admin/Monitoring/Charts";

interface HydroponicsProps {}

const ChartCard: React.FC<{
  className?: string;
  style?: React.CSSProperties;
}> = ({ className, children, style }) => {
  return (
    <div
      style={style}
      className={`bg-gray-300 shadow rounded-xl overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};

type DT = {
  date_time: number;
  water_level: number;
};

const Hydroponics: React.FC<HydroponicsProps> = () => {
  const [data, setData] = useState<Array<DT>>([]);
  console.log(...data);
  useEffect(() => {
    // @ts-ignore
    csv("/data/MOCK_DT.csv", (d: DT) => {
      d.water_level = +d.water_level;
      d.date_time = +d.date_time;
      return [new Date(d.date_time), d.water_level];
    }).then((data) => {
      // @ts-ignore
      setData(data);
    });
  }, []);

  return (
    <div className="w-full">
      <div className="grid grid-cols-12 gap-6">
        <ChartCard className="col-span-12 p-4 lg:col-span-6 xl:col-span-4">
          <div style={{ height: "350px" }}>
            <VerticalBar />
          </div>
        </ChartCard>

        <ChartCard className="col-span-12 p-4 lg:col-span-6 xl:col-span-4">
          <div style={{ height: "350px" }}>
            <Doughnut />
          </div>
        </ChartCard>

        <ChartCard
          className="col-span-12 p-4 lg:col-span-6 xl:col-span-4"
          style={{ height: "350px" }}
        >
          <div style={{ height: "350px" }}>
            <Line />
          </div>
        </ChartCard>

        <ChartCard
          className="col-span-12 p-4 md:col-span-8"
          style={{ height: "400px" }}
        >
          <div style={{ height: "350px" }}>
            <MultiAxisLine />
          </div>
        </ChartCard>
      </div>
    </div>
  );
};

export default Hydroponics;
