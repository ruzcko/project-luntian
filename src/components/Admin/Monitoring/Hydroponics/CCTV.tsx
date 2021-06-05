import { Disclosure, Transition } from "@headlessui/react";
import React, { useEffect, useRef, useState } from "react";
import ChartCard from "../ChartCard";
import { ChamberMain, ChamberStatic, LightStatus } from "./Chamber";
import data from "./hydroponics.json";

const CCTV: React.FC = () => {
  const frequency = 1500;
  const n = useRef(9);
  const [on, setOn] = useState(false);
  const [isAuto, setIsAuto] = useState(true);
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      n.current = n.current >= 23 ? 0 : n.current + 1;
      if (data[n.current].cctv_light_status === 1) setOn(true);
      else setOn(false);
    }, frequency);

    return () => clearInterval(interval);
  }, []);

  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <div>
          <Disclosure.Button className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold">Chamber Monitoring</h2>
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
                (1) Turns on and off the solenoid valve of freshwater; (2)
                Controls pump for water flow
              </p>

              <div className="grid grid-cols-12 gap-6 mt-4">
                <ChartCard className="col-span-12 p-4 lg:col-span-5 xl:col-span-4">
                  <div style={{ height: "350px" }}>
                    <LightStatus
                      {...{ isAuto, isOn, on, setIsAuto, setIsOn, setOn }}
                    />
                  </div>
                </ChartCard>

                <ChartCard className="col-span-12 p-4 lg:col-span-6 xl:col-span-4">
                  <p className="pb-2 text-sm text-center">Chamber 1</p>
                  <div style={{ height: "350px" }}>
                    <ChamberMain {...{ on, isAuto, isOn }} />
                  </div>
                </ChartCard>

                <ChartCard className="col-span-12 p-4 lg:col-span-6 xl:col-span-4">
                  <p className="pb-2 text-sm text-center">Chamber 2</p>
                  <div style={{ height: "350px" }}>
                    <ChamberStatic />
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

export default CCTV;
