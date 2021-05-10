import React, { useState } from "react";
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
      className={`bg-gray-300 shadow-md rounded-xl overflow-hidden flex flex-col justify-center ${className}`}
    >
      {children}
    </div>
  );
};

const Hydroponics: React.FC<HydroponicsProps> = () => {
  // const [data, setData] = useState<Array<DT>>([]);
  // useEffect(() => {
  // @ts-ignore
  //   csv("/data/MOCK_DT.csv", (d: DT) => {
  //     d.water_level = +d.water_level;
  //     d.date_time = +d.date_time;
  //     return [new Date(d.date_time), d.water_level];
  //   }).then((data) => {
  // @ts-ignore
  //     setData(data);
  //   });
  // }, []);

  return (
    <div className="w-full">
      <div className="grid grid-cols-12 gap-6">
        <DTChart />

        <ChartCard className="col-span-12 p-4 lg:col-span-6 xl:col-span-4">
          <div style={{ height: "350px" }}>
            <Doughnut />
          </div>
        </ChartCard>

        <ChartCard className="col-span-12 p-4 lg:col-span-6 xl:col-span-4">
          <div style={{ height: "350px" }}>
            <Line />
          </div>
        </ChartCard>

        <ChartCard className="flex col-span-12 p-4 md:col-span-8">
          <div style={{ height: "400px", width: "100%" }}>
            <MultiAxisLine />
          </div>
        </ChartCard>
      </div>
    </div>
  );
};

const DTChart: React.FC = () => {
  const [n, setN] = useState(10);
  const [frequency, setFrequency] = useState(2000);

  return (
    <ChartCard className="col-span-12 p-4 lg:col-span-6 xl:col-span-4">
      <p className="font-mono text-xs">Bars: {n}</p>
      <input
        type="range"
        min={10}
        max={50}
        value={n}
        onChange={(e) => setN(parseInt(e.target.value))}
      />

      <p className="font-mono text-xs">Frequency: {frequency}ms</p>
      <input
        type="range"
        min={100}
        max={5000}
        value={frequency}
        onChange={(e) => setFrequency(parseInt(e.target.value))}
      />

      <div style={{ height: "350px" }}>
        <VerticalBar {...{ n, frequency }} />
      </div>
    </ChartCard>
  );
};

export default Hydroponics;
