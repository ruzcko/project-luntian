import React from "react";
import {
  DTWaterLevel,
  DTAmmonia,
  DTTemperature,
  DTPHLevel,
} from "../../components/Admin/Monitoring/Hydroponics";

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
      <h2 className="text-lg font-semibold">DT Graphs</h2>
      <div className="grid grid-cols-12 gap-6 mt-4">
        <ChartCard className="col-span-12 p-4 lg:col-span-6 xl:col-span-4">
          <p className="text-sm text-center">PH Level</p>
          <div style={{ height: "350px" }}>
            <DTPHLevel />
          </div>
        </ChartCard>

        <ChartCard className="col-span-12 p-4 lg:col-span-6 xl:col-span-4">
          <p className="text-sm text-center">Ammonia Level</p>
          <div style={{ height: "350px" }}>
            <DTAmmonia />
          </div>
        </ChartCard>

        <ChartCard className="col-span-12 p-4 lg:col-span-6 xl:col-span-4">
          <p className="text-sm text-center">Temperature</p>
          <div style={{ height: "350px" }}>
            <DTTemperature />
          </div>
        </ChartCard>

        <ChartCard className="col-span-12 p-4 lg:col-span-6 xl:col-span-8">
          <p className="text-sm text-center">Water Level</p>
          <div style={{ height: "400px", width: "100%" }}>
            <DTWaterLevel />
          </div>
        </ChartCard>
      </div>
    </div>
  );
};

export default Hydroponics;
