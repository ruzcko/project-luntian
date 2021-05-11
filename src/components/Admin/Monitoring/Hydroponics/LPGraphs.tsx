import React, { useEffect, useState } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import ChartCard from "../ChartCard";
import LPData from "./LP/LPData";
import LPGrowth from "./LP/LPGrowth";
import LPImage from "./LP/LPImage";
import { csv } from "d3-fetch";

type LPinput = {
  unix_time: string;
  chlorophyll_a: string;
  chlorophyll_b: string;
  vitamin_c: string;
  freshweight: string;
  week_number: string;
};

type LPoutput = {
  date: Date;
  chlorophyll_a: number;
  chlorophyll_b: number;
  vitamin_c: number;
  freshweight: number;
  week_number: number;
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const formatDate = (n: Date) => {
  return `${months[n.getMonth()]} ${n.getDay()}, ${n.getFullYear()}`;
};

const LPGraphs: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState<Array<LPoutput>>();

  useEffect(() => {
    csv("/data/hydroponics/lettuce_phenotype.csv", (_): LPoutput => {
      const d = _ as LPinput;
      return {
        date: new Date(+d.unix_time * 1000),
        chlorophyll_a: +d.chlorophyll_a,
        chlorophyll_b: +d.chlorophyll_b,
        vitamin_c: +d.vitamin_c,
        freshweight: +d.freshweight,
        week_number: +d.week_number,
      };
    }).then((data) => {
      setData(() => {
        return data;
      });
    });
  }, []);

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
                  <div style={{ height: "300px" }}>
                    <LPImage setIndex={setIndex} />
                  </div>
                  {data && (
                    <div className="pt-2">
                      <p>{formatDate(data[index].date)}</p>
                      <p>{data[index].chlorophyll_a}</p>
                    </div>
                  )}
                </ChartCard>

                <ChartCard className="col-span-12 p-4 lg:col-span-6 xl:col-span-4">
                  <p className="text-sm text-center">Lettuce Phenotype</p>
                  <div className="w-full h-full">
                    <LPData index={index} />
                  </div>
                </ChartCard>

                <ChartCard className="col-span-12 p-4 lg:col-span-6 xl:col-span-4">
                  <p className="text-sm text-center">Fresh Weight</p>
                  <div className="w-full h-full">
                    <LPGrowth index={index} />
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
