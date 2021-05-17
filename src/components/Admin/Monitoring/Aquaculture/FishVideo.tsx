import { Disclosure, Transition } from "@headlessui/react";
import React from "react";

interface FishVideoProps {}

const FishVideo: React.FC<FishVideoProps> = () => {
  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <div className="mt-4">
          <Disclosure.Button className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold">Fish Monitoring</h2>
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
                Monitors the uneaten pellets and fish hunger behavior. (This is
                used to feedback the on-demand feeder to stop releasing the
                feeds when the fish are deemed satiated)
              </p>

              {/* <img
                src="https://media.giphy.com/media/l2QDPStBfVQjHXSOk/giphy.gif"
                alt="test_gif"
              /> */}
            </Disclosure.Panel>
          </Transition>
        </div>
      )}
    </Disclosure>
  );
};

export default FishVideo;
