import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import Aquaculture from "./Aquaculture";
import Energy from "./Energy";
import Hydroponics from "./Hydroponics";

type Tab = "hydroponics" | "aquaculture" | "energy";

interface TabButtonProps {
  currentTab: Tab;
  tab: Tab;
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const TabButton: React.FC<TabButtonProps> = ({ currentTab, tab }) => {
  const history = useHistory();
  const t = (tab as string).toLocaleLowerCase();

  return (
    <button
      onClick={() => {
        if (currentTab !== t)
          history.push({ pathname: "/monitoring", search: `?tab=${t}` });
      }}
      className={`${
        currentTab === t ? "bg-gray-200 text-gray-900" : "text-gray-500"
      } px-4 py-2 mt-2 transition-colors duration-300 rounded hover:bg-gray-100 focus:outline-none focus:bg-gray-100`}
    >
      <h3 className="text-sm text-left capitalize">{tab}</h3>
    </button>
  );
};

interface SwitcherProps {
  to: Tab | null;
}

const Switcher: React.FC<SwitcherProps> = ({ to }) => {
  if (to === "aquaculture") return <Aquaculture />;
  else if (to === "energy") return <Energy />;
  return <Hydroponics />;
};

const AdminFarmMonitoring: React.FC = () => {
  const history = useHistory();
  let tab = useQuery().get("tab") as Tab;

  return (
    <div className="w-full h-screen overflow-x-hidden overflow-y-scroll bg-gray-200">
      <div className="absolute inset-y-0 left-0 flex flex-col w-64 p-4 bg-gray-300">
        <div className="flex items-center w-full">
          <button
            onClick={() => history.replace("/admin")}
            className="flex items-center justify-center w-10 h-10 p-1 transition-colors duration-300 rounded-full hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="ml-2 text-xl font-semibold uppercase">Luntian</h1>
        </div>

        <div className="w-full h-px my-4 bg-gray-100" />

        <TabButton currentTab={tab} tab="hydroponics" />
        <TabButton currentTab={tab} tab="aquaculture" />
        <TabButton currentTab={tab} tab="energy" />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 p-6 ml-64 ">
        <div className="flex items-center w-full mb-8 divide-x-8">
          <h1 className="text-3xl font-semibold">Farm Monitoring</h1>
          <h6 className="text-xl capitalize">{tab}</h6>
        </div>
        <Switcher to={tab} />
      </div>
    </div>
  );
};

export default AdminFarmMonitoring;
