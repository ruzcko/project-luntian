import { Switch } from "@headlessui/react";
import React, { useEffect, useRef, useState } from "react";
import { HydroponicsData } from "../../../../../luntian-types";

interface Props {
  data: Array<HydroponicsData>;
  frequency: number;
}

const ACFanStatus: React.FC<Props> = ({ data, frequency }) => {
  const n = useRef(9);
  const [on, setOn] = useState(false);
  const [isAuto, setIsAuto] = useState(true);
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      n.current = n.current >= 23 ? 0 : n.current + 1;
      if (data[n.current].ac_fan_status === 1) setOn(true);
      else setOn(false);
    }, frequency);

    return () => clearInterval(interval);
  }, [data, frequency]);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex justify-between">
        <p className="text-sm text-center">
          Fan Status ({!isAuto ? (isOn ? "ON" : "OFF") : on ? "ON" : "OFF"})
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
              <span className="sr-only">Enable Automaic Fan</span>
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
              <span className="sr-only">Enable Automaic Fan</span>
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
          className={`${
            !isAuto
              ? isOn
                ? "animate-spin"
                : "animate-none"
              : on
              ? "animate-spin"
              : "animate-none"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          width={200}
          height={200}
          viewBox="0 0 295.182 295.182"
        >
          <path
            id="XMLID_3_"
            d="M200.499,124.4c7.97-2.797,16.318-1.474,25.258,0.49c5.901,1.3,12.006,2.648,18.854,2.648
	c9.165,0,17.745-2.51,26.232-7.669c13.081-7.954,22.03-22.183,23.94-38.061c2.178-18.143-4.619-36.142-19.146-50.667
	c-14.42-14.42-33.67-22.357-54.203-22.357c-20.955,0-40.715,8.22-55.642,23.143c-18.656,18.657-30.793,48.403-31.003,75.684
	c-4.439-3.231-8.37-7.189-10.389-12.929c-3.125-8.877-1.449-16.469,0.488-25.259c2.658-12.04,5.96-27.025-5.019-45.087
	C110.743,9.334,93.657,0.011,75.274,0.011c-15.858,0-31.53,6.938-44.131,19.534C1.076,49.622,1.436,98.898,31.934,129.39
	c18.411,18.416,48.665,30.816,75.601,31.119c-3.221,4.395-7.159,8.266-12.851,10.272c-7.957,2.808-16.306,1.493-25.261-0.489
	c-5.899-1.299-12.004-2.649-18.856-2.649c-9.161,0-17.742,2.508-26.228,7.667c-13.081,7.956-22.03,22.184-23.94,38.063
	c-2.179,18.143,4.622,36.143,19.145,50.666c14.419,14.42,33.671,22.356,54.205,22.356c20.954,0,40.716-8.22,55.642-23.142
	c18.656-18.657,30.792-48.402,31.004-75.683c4.436,3.23,8.367,7.189,10.389,12.927c3.124,8.877,1.449,16.469-0.49,25.26
	c-2.658,12.039-5.96,27.025,5.02,45.087c9.126,15.004,26.213,24.327,44.596,24.327c15.859,0,31.531-6.939,44.132-19.534
	c30.061-30.071,29.708-79.347-0.792-109.845c-18.411-18.418-48.666-30.817-75.599-31.118
	C190.869,130.277,194.809,126.406,200.499,124.4z M160.187,160.187c-6.727,6.727-18.465,6.727-25.192,0
	c-6.943-6.948-6.943-18.244,0-25.192c3.363-3.363,7.836-5.215,12.596-5.215c4.761,0,9.232,1.852,12.597,5.215
	C167.129,141.943,167.129,153.239,160.187,160.187z"
          />
        </svg>
      </div>
    </div>
  );
};

export default ACFanStatus;