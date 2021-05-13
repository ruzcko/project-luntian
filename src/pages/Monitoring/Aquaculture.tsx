import React from "react";
import AquaGraphs from "../../components/Admin/Monitoring/Aquaculture/AquaGraphs";
import PongFeed from "../../components/Admin/Monitoring/Aquaculture/PondFeed";
import FishGrowth from "../../components/Admin/Monitoring/Aquaculture/FishGrowth";

interface AquacultureProps {}

const Aquaculture: React.FC<AquacultureProps> = () => {
  return (
    <div className="w-full">
      <FishGrowth />
      <AquaGraphs />
      <PongFeed />
    </div>
  );
};

export default Aquaculture;
