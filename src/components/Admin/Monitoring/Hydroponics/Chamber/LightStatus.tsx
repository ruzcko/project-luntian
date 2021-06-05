import { Switch } from "@headlessui/react";
import React from "react";
interface Props {
  isAuto: boolean;
  isOn: boolean;
  on: boolean;
  setIsAuto: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOn: React.Dispatch<React.SetStateAction<boolean>>;
  setOn: React.Dispatch<React.SetStateAction<boolean>>;
}

const LightStatus: React.FC<Props> = ({
  isAuto,
  isOn,
  on,
  setIsAuto,
  setIsOn,
  setOn,
}) => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex justify-between">
        <p className="text-sm text-center">
          Light Status ({!isAuto ? (isOn ? "ON" : "OFF") : on ? "ON" : "OFF"})
        </p>

        <div className="flex flex-col items-end space-y-2">
          <div className="flex items-center ml-4">
            <Switch
              checked={isAuto}
              onChange={setIsAuto}
              className={`${
                isAuto ? "bg-blue-600" : "bg-gray-200"
              } relative inline-flex items-center h-6 rounded-full w-11`}
            >
              <span className="sr-only">Enable Automaic Light</span>
              <span
                className={`${
                  isAuto ? "translate-x-6" : "translate-x-1"
                } inline-block w-4 h-4 transform transition-transform bg-white rounded-full`}
              />
            </Switch>
            <p className="w-8 text-xs text-center">Auto</p>
          </div>

          <div className="flex items-center ml-4">
            <p
              className={`w-8 text-xs text-center ${
                !isAuto ? "text-black" : "text-gray-400"
              }`}
            >
              Off
            </p>
            <Switch
              disabled={isAuto}
              checked={isOn}
              onChange={setIsOn}
              className={`${
                isAuto
                  ? "bg-gray-200 cursor-not-allowed"
                  : isOn
                  ? "bg-blue-600"
                  : "bg-gray-200"
              } relative inline-flex items-center h-6 rounded-full w-11`}
            >
              <span className="sr-only">Enable Automaic Light</span>
              <span
                className={`${
                  isOn ? "translate-x-6" : "translate-x-1"
                } inline-block w-4 h-4 transform transition-transform bg-white rounded-full`}
              />
            </Switch>
            <p
              className={`w-8 text-xs text-center ${
                !isAuto ? "text-black" : "text-gray-400"
              }`}
            >
              On
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center flex-1">
        <svg
          className={`transition-colors ${
            !isAuto
              ? isOn
                ? "text-yellow-400"
                : "text-gray-300"
              : on
              ? "text-yellow-400"
              : "text-gray-300"
          }`}
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          width={200}
          height={200}
          viewBox="0 0 486 486"
        >
          <path
            id="XMLID_49_"
            d="M298.4,424.7v14.2c0,11.3-8.3,20.7-19.1,22.3l-3.5,12.9c-1.9,7-8.2,11.9-15.5,11.9h-34.7
		c-7.3,0-13.6-4.9-15.5-11.9l-3.4-12.9c-10.9-1.7-19.2-11-19.2-22.4v-14.2c0-7.6,6.1-13.7,13.7-13.7h83.5
		C292.3,411,298.4,417.1,298.4,424.7z M362.7,233.3c0,32.3-12.8,61.6-33.6,83.1c-15.8,16.4-26,37.3-29.4,59.6
		c-1.5,9.6-9.8,16.7-19.6,16.7h-74.3c-9.7,0-18.1-7-19.5-16.6c-3.5-22.3-13.8-43.5-29.6-59.8c-20.4-21.2-33.1-50-33.4-81.7
		c-0.7-66.6,52.3-120.5,118.9-121C308.7,113.1,362.7,166.9,362.7,233.3z M256.5,160.8c0-7.4-6-13.5-13.5-13.5
		c-47.6,0-86.4,38.7-86.4,86.4c0,7.4,6,13.5,13.5,13.5c7.4,0,13.5-6,13.5-13.5c0-32.8,26.7-59.4,59.4-59.4
		C250.5,174.3,256.5,168.3,256.5,160.8z M243,74.3c7.4,0,13.5-6,13.5-13.5V13.5c0-7.4-6-13.5-13.5-13.5s-13.5,6-13.5,13.5v47.3
		C229.5,68.3,235.6,74.3,243,74.3z M84.1,233.2c0-7.4-6-13.5-13.5-13.5H23.3c-7.4,0-13.5,6-13.5,13.5c0,7.4,6,13.5,13.5,13.5h47.3
		C78.1,246.7,84.1,240.7,84.1,233.2z M462.7,219.7h-47.3c-7.4,0-13.5,6-13.5,13.5c0,7.4,6,13.5,13.5,13.5h47.3
		c7.4,0,13.5-6,13.5-13.5C476.2,225.8,470.2,219.7,462.7,219.7z M111.6,345.6l-33.5,33.5c-5.3,5.3-5.3,13.8,0,19.1
		c2.6,2.6,6.1,3.9,9.5,3.9s6.9-1.3,9.5-3.9l33.5-33.5c5.3-5.3,5.3-13.8,0-19.1C125.4,340.3,116.8,340.3,111.6,345.6z M364.9,124.8
		c3.4,0,6.9-1.3,9.5-3.9l33.5-33.5c5.3-5.3,5.3-13.8,0-19.1c-5.3-5.3-13.8-5.3-19.1,0l-33.5,33.5c-5.3,5.3-5.3,13.8,0,19.1
		C358,123.5,361.4,124.8,364.9,124.8z M111.6,120.8c2.6,2.6,6.1,3.9,9.5,3.9s6.9-1.3,9.5-3.9c5.3-5.3,5.3-13.8,0-19.1L97.1,68.2
		c-5.3-5.3-13.8-5.3-19.1,0c-5.3,5.3-5.3,13.8,0,19.1L111.6,120.8z M374.4,345.6c-5.3-5.3-13.8-5.3-19.1,0c-5.3,5.3-5.3,13.8,0,19.1
		l33.5,33.5c2.6,2.6,6.1,3.9,9.5,3.9s6.9-1.3,9.5-3.9c5.3-5.3,5.3-13.8,0-19.1L374.4,345.6z"
          />
        </svg>
      </div>
    </div>
  );
};

export default LightStatus;
