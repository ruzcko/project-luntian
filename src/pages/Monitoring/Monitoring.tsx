import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import Aquaculture from "./Aquaculture";
import Energy from "./Energy";
import Hydroponics from "./Hydroponics";
import { Menu, Transition } from "@headlessui/react";

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
      <div className="absolute inset-y-0 left-0 flex flex-col w-64 p-4 -ml-64 bg-gray-300 md:ml-0">
        <div className="flex items-center w-full">
          <button
            onClick={() => history.replace("/home")}
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
      <div className="flex flex-col flex-1 p-2 ml-0 md:p-6 md:ml-64">
        <div className="items-center block space-x-2 md:hidden">
          <svg
            onClick={() => history.replace("/home")}
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mb-4 rounded-full cursor-pointer hover:bg-gray-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </div>
        <div className="flex items-center w-full mb-8 divide-x-8">
          <h1 className="text-xl font-semibold md:text-3xl">Farm Monitoring</h1>
          <Menu as="div" className="relative inline-block">
            <Menu.Button className="flex items-center space-x-2 capitalize">
              <div>
                <p>{tab}</p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`block md:hidden w-6 h-6 duration-300 transform rotate-180`}
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
            </Menu.Button>
            <Transition
              as={React.Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-30 w-40 p-2 mt-2 text-gray-500 bg-white divide-y rounded">
                <Menu.Item>
                  <button
                    onClick={() => {
                      if (tab !== "hydroponics")
                        history.push({
                          pathname: "/monitoring",
                          search: `?tab=hydroponics`,
                        });
                    }}
                    className="w-full px-2 py-1 text-left hover:bg-gray-100"
                  >
                    Hydroponics
                  </button>
                </Menu.Item>
                <Menu.Item>
                  <button
                    onClick={() => {
                      if (tab !== "aquaculture")
                        history.push({
                          pathname: "/monitoring",
                          search: `?tab=aquaculture`,
                        });
                    }}
                    className="w-full px-2 py-1 text-left hover:bg-gray-100"
                  >
                    Aquaculture
                  </button>
                </Menu.Item>
                <Menu.Item>
                  <button
                    onClick={() => {
                      if (tab !== "energy")
                        history.push({
                          pathname: "/monitoring",
                          search: `?tab=energy`,
                        });
                    }}
                    className="w-full px-2 py-1 text-left hover:bg-gray-100"
                  >
                    Energy
                  </button>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        <Switcher to={tab} />
      </div>
    </div>
  );
};

export default AdminFarmMonitoring;
