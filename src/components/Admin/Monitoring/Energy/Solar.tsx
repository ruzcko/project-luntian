import React, { useEffect, useRef, useState } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { EnergyData } from "../../../../luntian-types";
import { formatDate } from "../../../../utils/helpers";
import panel from "./solar_panel.png";
import ChartCard from "../ChartCard";
import { SolarCurrent, SolarPower, SolarVoltage } from "./Charts";
import data from "./energy.json";

const Solar: React.FC = () => {
  const frequency = 1500;

  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <div className="mt-4">
          <Disclosure.Button className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold">Solar Cells</h2>
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
                  <p className="text-sm text-center">Power</p>
                  <div style={{ height: "300px" }}>
                    <SolarPower {...{ data, frequency }} />
                  </div>
                </ChartCard>

                <ChartCard className="col-span-12 p-4 lg:col-span-6 xl:col-span-4">
                  <p className="text-sm text-center">Voltage</p>
                  <div style={{ height: "300px" }}>
                    <SolarVoltage {...{ data, frequency }} />
                  </div>
                </ChartCard>

                <ChartCard className="col-span-12 p-4 lg:col-span-6 xl:col-span-4">
                  <p className="text-sm text-center">Current</p>
                  <div style={{ height: "300px" }}>
                    <SolarCurrent {...{ data, frequency }} />
                  </div>
                </ChartCard>
              </div>

              <ParentPanels />

              <div className="h-[200px]" />
            </Disclosure.Panel>
          </Transition>
        </div>
      )}
    </Disclosure>
  );
};

const ParentPanels: React.FC = () => {
  const frequency = 1500;
  const n = useRef(9);
  const [current, setCurrent] = useState<EnergyData>(data[0]);
  const [time, setTime] = useState(
    formatDate(new Date(current.unix_time * 1000))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      n.current = n.current >= 23 ? 0 : n.current + 1;
      setCurrent(data[n.current]);
      setTime(formatDate(new Date(data[n.current].unix_time * 1000)));
    }, frequency);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p className="mt-4 text-sm text-gray-600">
        Time: <span className="text-base text-black">{time}</span>
      </p>
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <div key={`parent-panel-${i}`} className="grid grid-cols-12 gap-6">
            {Array(3)
              .fill(0)
              .map((_, j) => (
                <Panel key={`panel-${j}`} data={current} />
              ))}
          </div>
        ))}
    </div>
  );
};

interface CellProps {
  data: EnergyData;
}

const Panel: React.FC<CellProps> = ({ data }) => {
  return (
    <div className="h-auto col-span-4 mt-4">
      <p className="mb-2 ml-2 text-sm text-black">{data.solar_temperature}°C</p>
      <img src={panel} alt={panel} className="object-contain w-full" />
    </div>
  );
};

export default Solar;
