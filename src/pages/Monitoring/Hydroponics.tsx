import React from "react";
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

export default Hydroponics;
