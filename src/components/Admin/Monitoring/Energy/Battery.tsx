import React, { useEffect, useRef, useState } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import data from "./energy.json";
import { EnergyData } from "../../../../luntian-types";
import { formatDate } from "../../../../utils/helpers";

const Battery: React.FC = () => {
  const n = useRef(9);
  const frequency = 1500;
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
    <Disclosure defaultOpen>
      {({ open }) => (
        <div>
          <Disclosure.Button className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold">Battery Cells</h2>
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
              <div className="w-full mt-2">
                <p className="text-sm text-gray-600">
                  Time: <span className="text-base text-black">{time}</span>
                </p>

                <div className="flex mt-2 space-x-2">
                  {Array(16)
                    .fill(0)
                    .map((_, i) => (
                      <Cell key={`cell-${i}`} data={current} />
                    ))}
                </div>

                <div className="flex mt-2 space-x-2">
                  {Array(16)
                    .fill(0)
                    .map((_, i) => (
                      <Cell key={`cell-${i}`} data={current} />
                    ))}
                </div>
              </div>
            </Disclosure.Panel>
          </Transition>
        </div>
      )}
    </Disclosure>
  );
};

interface CellProps {
  data: EnergyData;
}

const Cell: React.FC<CellProps> = ({ data }) => {
  return (
    <div className="relative flex-1 h-[250px] overflow-hidden rounded xl:rounded-t-xl border-2 border-gray-500">
      <div
        className="absolute inset-x-0 bottom-0 flex flex-col items-start justify-end p-1 transition-all duration-700 bg-green-500 border-t border-gray-500"
        style={{ height: 250 * (data.battery_charge / 100) }}
      >
        <div className="hidden xl:block">
          <p className="text-xs text-white">{data.battery_charge}%</p>
          <p className="text-xs text-white">{data.battery_temperature}°C</p>
          <p className="text-xs text-white">{data.battery_health}</p>
        </div>
      </div>
    </div>
  );
};

export default Battery;
