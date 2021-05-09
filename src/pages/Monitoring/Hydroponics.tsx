import React from "react";
import Chart from "react-google-charts";

interface HydroponicsProps {}

const TestCard: React.FC<{ classes?: string }> = ({ classes, children }) => {
  return (
    <div className={`bg-gray-300 shadow rounded-xl overflow-hidden ${classes}`}>
      {children}
    </div>
  );
};

const Hydroponics: React.FC<HydroponicsProps> = () => {
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
            width="100%"
            height="350px"
            chartType="Calendar"
            loader={<div>Loading Chart</div>}
            data={[
              [
                { type: "date", id: "Date" },
                { type: "number", id: "Won/Loss" },
              ],
              [new Date(2012, 3, 13), 37032],
              [new Date(2012, 3, 14), 38024],
              [new Date(2012, 3, 15), 38024],
              [new Date(2012, 3, 16), 38108],
              [new Date(2012, 3, 17), 38229],
              [new Date(2013, 1, 4), 38177],
              [new Date(2013, 1, 5), 38705],
              [new Date(2013, 1, 12), 38210],
              [new Date(2013, 1, 13), 38029],
              [new Date(2013, 1, 19), 38823],
              [new Date(2013, 1, 23), 38345],
              [new Date(2013, 1, 24), 38436],
              [new Date(2013, 2, 10), 38447],
            ]}
            options={{
              title: "Red Sox Attendance",
            }}
            rootProps={{ "data-testid": "1" }}
          />
        </TestCard>
      </div>
    </div>
  );
};

export default Hydroponics;
