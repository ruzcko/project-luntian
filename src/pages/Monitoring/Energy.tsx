import React from "react";
import Battery from "../../components/Admin/Monitoring/Energy/Battery";
import Solar from "../../components/Admin/Monitoring/Energy/Solar";

const Energy: React.FC = () => {
  return (
    <div className="w-full">
      <Battery />
      <Solar />
    </div>
  );
};

export default Energy;
