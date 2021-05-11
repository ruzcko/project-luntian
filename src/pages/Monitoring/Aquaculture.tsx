import React from "react";
import AquaGraphs from "../../components/Admin/Monitoring/Aquaculture/AquaGraphs";

interface AquacultureProps {}

const Aquaculture: React.FC<AquacultureProps> = () => {
  return (
    <div className="w-full">
      <AquaGraphs />
    </div>
  );
};

export default Aquaculture;
