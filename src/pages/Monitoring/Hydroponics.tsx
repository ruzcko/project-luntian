import React from "react";
import DTGraphs from "../../components/Admin/Monitoring/Hydroponics/DTGraphs";
import ACGraphs from "../../components/Admin/Monitoring/Hydroponics/ACGraphs";
import NMGraphs from "../../components/Admin/Monitoring/Hydroponics/NMGraphs";
import LPGraphs from "../../components/Admin/Monitoring/Hydroponics/LPGraphs";
import CCTV from "../../components/Admin/Monitoring/Hydroponics/CCTV";

const Hydroponics: React.FC = () => {
  return (
    <div className="w-full">
      <CCTV />
      <LPGraphs />
      <DTGraphs />
      <ACGraphs />
      <NMGraphs />
    </div>
  );
};

export default Hydroponics;
