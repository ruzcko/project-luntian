import React from "react";
import chamber from "./assets/chamber_2.jpg";

const ChamberStatic: React.FC = () => {
  return (
    <img
      className="object-cover w-full h-full rounded"
      alt={chamber}
      src={chamber}
    />
  );
};

export default ChamberStatic;
