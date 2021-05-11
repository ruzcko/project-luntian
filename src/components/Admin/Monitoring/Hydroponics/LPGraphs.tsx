import React from "react";
import { Disclosure, Transition } from "@headlessui/react";
import ChartCard from "../ChartCard";
import LPData from "./LP/LPData";
import LPGrowth from "./LP/LPGrowth";
interface LPGraphsProps {}

const LPGraphs: React.FC<LPGraphsProps> = () => {
  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <div>
          <Disclosure.Button className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold">Lettuce Phenotype</h2>
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
              <div className="grid grid-cols-12 gap-6 mt-4">
                <ChartCard className="col-span-12 p-4 lg:col-span-6 xl:col-span-4">
                  <p className="text-sm text-center">Temperature</p>
                  <div style={{ height: "350px" }}></div>
                </ChartCard>

                <ChartCard className="col-span-12 p-4 lg:col-span-6 xl:col-span-4">
                  <p className="text-sm text-center">Lettuce Phenotype</p>
                  <div style={{ height: "350px", width: "100%" }}>
                    <LPData />
                  </div>
                </ChartCard>

                <ChartCard className="col-span-12 p-4 lg:col-span-6 xl:col-span-4">
                  <p className="text-sm text-center">Fresh Weight</p>
                  <div style={{ height: "350px" }}>
                    <LPGrowth />
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

export default LPGraphs;
