import React from "react";
import chamberOn from "./assets/chamber_1_on.jpg";
import chamberOff from "./assets/chamber_1_off.jpg";

interface Props {
  on: boolean;
  isOn: boolean;
  isAuto: boolean;
}

const ChamberMain: React.FC<Props> = ({ on, isOn, isAuto }) => {
  return (
    <img
      className="object-cover w-full h-full rounded"
      alt={chamberOn}
      src={
        !isAuto ? (isOn ? chamberOn : chamberOff) : on ? chamberOn : chamberOff
      }
    />
  );
};

export default ChamberMain;
