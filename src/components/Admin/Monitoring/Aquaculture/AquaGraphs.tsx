import React from "react";
import { Disclosure, Transition } from "@headlessui/react";
import ChartCard from "../ChartCard";
import {
  PondAmmonia,
  PondDissolved,
  PondElecCond,
  PondNitrate,
  PondNitrite,
  PondPHLevel,
  PondTotalSolids,
  PondTurbidity,
  PondWaterTemp,
} from "./Graphs";

interface AquaGraphsProps {}

const AquaGraphs: React.FC<AquaGraphsProps> = () => {
  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <div className="mt-4">
          <Disclosure.Button className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold">Water Quality</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-6 h-6 transition-transform duration-300 ${
                open ? "transform rotate-0" : "transform rotate-180"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </Disclosure.Button>
          <Transition
            enter="transition-all duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0 -mt-20"
            enterTo="transform scale-100 opacity-100 mt-0"
            leave="transition-all duration-50 ease-out"
            leaveFrom="transform scale-100 opacity-100 mt-0"
            leaveTo="transform scale-95 opacity-0 -mt-20"
          >
            <Disclosure.Panel>
              <p className="mt-2 text-sm text-gray-600">
                Monitor the water quality and calculate the water quality index.
                (there is no actuation needed here, the water quality index will
                be given to biofiltration team for appropriate actions)
              </p>
              <div className="grid grid-cols-12 gap-6 mt-4">
                {/* First Row */}
                <ChartCard className="col-span-12 p-4 lg:col-span-6 xl:col-span-3">
                  <p className="text-sm text-center">Pond Water Temperature</p>
                  <div style={{ height: "300px" }}>
                    <PondWaterTemp />
                  </div>
                </ChartCard>

                <ChartCard className="col-span-12 p-4 lg:col-span-6 xl:col-span-3">
                  <p className="text-sm text-center">Pond Ammonia Level</p>
                  <div style={{ height: "300px" }}>
                    <PondAmmonia />
                  </div>
                </ChartCard>

                <ChartCard className="col-span-12 p-4 lg:col-span-6 xl:col-span-3">
                  <p className="text-sm text-center">Pond Dissolved Oxygen</p>
                  <div style={{ height: "300px" }}>
                    <PondDissolved />
                  </div>
                </ChartCard>

                {/* Second Row */}
                <ChartCard className="col-span-12 p-4 lg:col-span-6 xl:col-span-3">
                  <p className="text-sm text-center">
                    Pond Electric Conductivity
                  </p>
                  <div style={{ height: "300px" }}>
                    <PondElecCond />
                  </div>
                </ChartCard>

                <ChartCard className="col-span-12 p-4 lg:col-span-6 xl:col-span-4">
                  <p className="text-sm text-center">
                    Pond Total Dissolved Solids
                  </p>
                  <div style={{ height: "300px" }}>
                    <PondTotalSolids />
                  </div>
                </ChartCard>

                {/* Third Row */}
                <ChartCard className="col-span-12 p-4 lg:col-span-6 xl:col-span-4">
                  <p className="text-sm text-center">Pond Turbidity Voltage</p>
                  <div style={{ height: "300px" }}>
                    <PondTurbidity />
                  </div>
                </ChartCard>

                <ChartCard className="col-span-12 p-4 lg:col-span-6 xl:col-span-4">
                  <p className="text-sm text-center">Pond pH Level</p>
                  <div style={{ height: "300px" }}>
                    <PondPHLevel />
                  </div>
                </ChartCard>

                <ChartCard className="col-span-12 p-4 lg:col-span-6 xl:col-span-6">
                  <p className="text-sm text-center">Pond pH Level</p>
                  <div style={{ height: "300px" }}>
                    <PondNitrate />
                  </div>
                </ChartCard>

                <ChartCard className="col-span-12 p-4 lg:col-span-6 xl:col-span-6">
                  <p className="text-sm text-center">Pond pH Level</p>
                  <div style={{ height: "300px" }}>
                    <PondNitrite />
                  </div>
                </ChartCard>
              </div>
            </Disclosure.Panel>
          </Transition>
        </div>
      )}
    </Disclosure>
  );
};

export default AquaGraphs;
