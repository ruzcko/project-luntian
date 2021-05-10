import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import { csv } from "d3";

interface HydroponicsProps {}

const TestCard: React.FC<{ classes?: string }> = ({ classes, children }) => {
  return (
    <div className={`bg-gray-300 shadow rounded-xl overflow-hidden ${classes}`}>
      {children}
    </div>
  );
};

type DT = {
  date_time: number;
  water_level: number;
};

const Hydroponics: React.FC<HydroponicsProps> = () => {
  const [data, setData] = useState<Array<DT>>([]);
  console.log(...data);
  useEffect(() => {
    // @ts-ignore
    csv("/data/MOCK_DT.csv", (d: DT) => {
      d.water_level = +d.water_level;
      d.date_time = +d.date_time;
      return [new Date(d.date_time), d.water_level];
    }).then((data) => {
      // @ts-ignore
      setData(data);
    });
  }, []);

  return (
    <div className="w-full">
      <div className="grid grid-cols-12 gap-6">
        <TestCard classes="col-span-4">
          <Chart
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            style={{ left: 0, top: 0, width: "100%", height: "400px" }}
            data={[
              ["x", "dogs"],
              [0, 0],
              [1, 10],
              [2, 23],
              [3, 17],
              [4, 18],
              [5, 9],
              [6, 11],
              [7, 27],
              [8, 33],
              [9, 40],
              [10, 32],
              [11, 35],
            ]}
            options={{ backgroundColor: "#D1D5DB", legend: "none" }}
          />
        </TestCard>
        <TestCard classes="col-span-4">
          <Chart
            width={"100%"}
            height={"400px"}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[
              ["Task", "Hours per Day"],
              ["Work", 11],
              ["Eat", 2],
              ["Commute", 2],
              ["Watch TV", 2],
              ["Sleep", 7],
            ]}
            options={{
              legend: "none",
              backgroundColor: "#D1D5DB",
            }}
            rootProps={{ "data-testid": "1" }}
          />
        </TestCard>
        <TestCard classes="col-span-4 p-4">
          <Chart
            width="100%"
            height="300px"
            chartType="Gauge"
            loader={<div>Loading Chart</div>}
            data={[
              ["Label", "Value"],
              ["Memory", 90.23],
              ["CPU", 43.57],
            ]}
            options={{
              redFrom: 90,
              redTo: 100,
              yellowFrom: 75,
              yellowTo: 90,
              minorTicks: 5,
            }}
            rootProps={{ "data-testid": "1" }}
          />
          <p>Speed</p>
        </TestCard>
        <TestCard classes="col-span-8 p-4">
          <Chart
            width={"100%"}
            height={"300px"}
            chartType="Calendar"
            style={{ color: "#000" }}
            loader={<div>Loading Chart</div>}
            data={[["Year", "DT Level"], ...data]}
            options={{
              backgroundColor: "#D1D5DB",
              colors: ["#000", "#0d0d0d"],
            }}
          />
        </TestCard>
      </div>
    </div>
  );
};

export default Hydroponics;
