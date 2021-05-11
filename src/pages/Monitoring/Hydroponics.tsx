import React from "react";
import DTGraphs from "../../components/Admin/Monitoring/Hydroponics/DTGraphs";
import ACGraphs from "../../components/Admin/Monitoring/Hydroponics/ACGraphs";
import NMGraphs from "../../components/Admin/Monitoring/Hydroponics/NMGraphs";
import LPGraphs from "../../components/Admin/Monitoring/Hydroponics/LPGraphs";

const Hydroponics: React.FC = () => {
  return (
    <div className="w-full">
      <LPGraphs />
      <DTGraphs />
      <ACGraphs />
      <NMGraphs />
    </div>
  );
};

export default Hydroponics;
