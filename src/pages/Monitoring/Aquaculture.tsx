import React from "react";
import AquaGraphs from "../../components/Admin/Monitoring/Aquaculture/AquaGraphs";
import PondFeed from "../../components/Admin/Monitoring/Aquaculture/PondFeed";
import FishGrowth from "../../components/Admin/Monitoring/Aquaculture/FishGrowth";
import FishVideo from "../../components/Admin/Monitoring/Aquaculture/FishVideo";

interface AquacultureProps {}

const Aquaculture: React.FC<AquacultureProps> = () => {
  return (
    <div className="w-full">
      <FishVideo />
      <FishGrowth />
      <AquaGraphs />
      <PondFeed />
    </div>
  );
};

export default Aquaculture;
