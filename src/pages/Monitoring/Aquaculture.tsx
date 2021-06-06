import React from "react";
import AquaGraphs from "../../components/Admin/Monitoring/Aquaculture/AquaGraphs";
import PondFeed from "../../components/Admin/Monitoring/Aquaculture/PondFeed";
import FishGrowth from "../../components/Admin/Monitoring/Aquaculture/FishGrowth";

const Aquaculture: React.FC = () => {
  return (
    <div className="w-full">
      <PondFeed />
      <FishGrowth />
      <AquaGraphs />
    </div>
  );
};

export default Aquaculture;
