import React, { useState, useEffect } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import {
  FishMS,
  FishArea,
  FishConv,
  FishData,
  FishEntropy,
  FishImage,
} from "./FG";
import ChartCard from "../ChartCard";
import { csv } from "d3-fetch";
import { formatDate } from "../Hydroponics/LPGraphs";

type Finput = {
  unix_time: string;
  mean: string;
  standard_deviation: string;
  entropy: string;
  contrast: string;
  energy: string;
  correlation: string;
  homogeneity: string;
  week: string;
  growth_stage: "Fingerling" | "Juvenile" | "Adult";
  convhull_length: string;
  convhull_width: string;
  area: string;
};

type Foutput = {
  date: Date;
  mean: number;
  standard_deviation: number;
  entropy: number;
  contrast: number;
  energy: number;
  correlation: number;
  homogeneity: number;
  week: number;
  growth_stage: "Fingerling" | "Juvenile" | "Adult";
  convhull_length: number;
  convhull_width: number;
  area: number;
};

const FishGrowth: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState<Array<Foutput>>();

  useEffect(() => {
    csv("/data/aquaculture/fish_growth_parameters.csv", (_): Foutput => {
      const d = _ as Finput;
      return {
        date: new Date(+d.unix_time * 1000),
        mean: +d.mean,
        standard_deviation: +d.standard_deviation,
        contrast: +d.contrast,
        energy: +d.energy,
        correlation: +d.correlation,
        homogeneity: +d.homogeneity,
        entropy: +d.entropy,
        week: +d.week,
        growth_stage: d.growth_stage,
        convhull_length: +d.convhull_length,
        convhull_width: +d.convhull_width,
        area: +d.area,
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
        <div className="mt-4">
          <Disclosure.Button className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold">Fish Growth</h2>
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
                <ChartCard className="flex flex-col items-center col-span-12 p-4 md:flex-row md:space-x-4 lg:col-span-6 xl:col-span-6">
                  <div className="w-full md:w-1/2" style={{ height: "300px" }}>
                    <FishImage setIndex={setIndex} />
                  </div>
                  <div className="flex-shrink-0 w-full md:w-1/2">
                    {data && (
                      <div className="pt-2 font-mono">
                        <p className="flex-1">{`${formatDate(
                          data[index].date
                        )} | Week ${data[index].week}`}</p>

                        <p className="flex-1 text-sm text-gray-700">
                          growth_stage:{" "}
                          <span className="text-base text-black">
                            {data[index].growth_stage}
                          </span>
                        </p>

                        <p className="flex-1 text-sm text-gray-700">
                          convhull_length:{" "}
                          <span className="text-base text-black">
                            {data[index].convhull_length}
                          </span>
                        </p>

                        <p className="flex-1 text-sm text-gray-700">
                          convhull_width:{" "}
                          <span className="text-base text-black">
                            {data[index].convhull_width}
                          </span>
                        </p>

                        <p className="flex-1 text-sm text-gray-700">
                          area:{" "}
                          <span className="text-base text-black">
                            {data[index].area}
                          </span>
                        </p>

                        <p className="flex-1 text-sm text-gray-700">
                          mean:{" "}
                          <span className="text-base text-black">
                            {data[index].mean.toFixed(4)}
                          </span>
                        </p>

                        <p className="flex-1 text-sm text-gray-700">
                          standard deviation:{" "}
                          <span className="text-base text-black">
                            {data[index].standard_deviation.toFixed(4)}
                          </span>
                        </p>

                        <p className="flex-1 text-sm text-gray-700">
                          entropy:{" "}
                          <span className="text-base text-black">
                            {data[index].entropy.toFixed(4)}
                          </span>
                        </p>

                        <p className="flex-1 text-sm text-gray-700">
                          contrast:{" "}
                          <span className="text-base text-black">
                            {data[index].contrast.toFixed(4)}
                          </span>
                        </p>

                        <p className="flex-1 text-sm text-gray-700">
                          energy:{" "}
                          <span className="text-base text-black">
                            {data[index].energy.toFixed(4)}
                          </span>
                        </p>

                        <p className="flex-1 text-sm text-gray-700">
                          correlation:{" "}
                          <span className="text-base text-black">
                            {data[index].correlation.toFixed(4)}
                          </span>
                        </p>

                        <p className="flex-1 text-sm text-gray-700">
                          homogeneity:{" "}
                          <span className="text-base text-black">
                            {data[index].homogeneity.toFixed(4)}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                </ChartCard>

                <ChartCard className="col-span-12 p-4 lg:col-span-6 xl:col-span-6">
                  <p className="text-sm text-center">Growth Parameters</p>
                  <div style={{ height: "300px" }}>
                    <FishConv index={index} />
                  </div>
                </ChartCard>

                <ChartCard className="col-span-12 p-4 lg:col-span-6 xl:col-span-8">
                  <p className="text-sm text-center">Growth Parameters</p>
                  <div style={{ height: "300px" }}>
                    <FishData index={index} />
                  </div>
                </ChartCard>

                <ChartCard className="col-span-12 p-4 lg:col-span-6 xl:col-span-4">
                  <p className="text-sm text-center">Growth Parameters</p>
                  <div style={{ height: "300px" }}>
                    <FishArea index={index} />
                  </div>
                </ChartCard>

                <ChartCard className="col-span-12 p-4 lg:col-span-6 xl:col-span-4">
                  <p className="text-sm text-center">Growth Parameters</p>
                  <div style={{ height: "300px" }}>
                    <FishEntropy index={index} />
                  </div>
                </ChartCard>

                <ChartCard className="col-span-12 p-4 lg:col-span-6 xl:col-span-8">
                  <p className="text-sm text-center">Growth Parameters</p>
                  <div style={{ height: "300px" }}>
                    <FishMS index={index} />
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

export default FishGrowth;
