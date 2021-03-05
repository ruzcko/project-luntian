import React from "react";

function AdminProfile() {
  return (
    <div>
      <h1 className="text-2xl border-t border-b border-r px-6 py-1 border-gray-300 inline-block">
        Profile
      </h1>

      <div className="flex flex-col md:flex-row">
        {/* Picture */}
        <div className="mt-4 w-1/2 md:w-60">
          <div className="border border-gray-300 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <div className="mt-2 relative cursor-pointer w-3/4 bg-green-500 active:bg-green-600 rounded-md flex items-center justify-center py-2 text-white">
            <button className="">Change Photo</button>
            <input
              type="file"
              className="absolute inset-0 opacity-0 w-full cursor-pointer"
            />
          </div>
        </div>

        {/* Bio */}
        <div className="flex-1 mt-4 md:ml-4">
          <div className="flex flex-col w-1/2 max-w-xs">
            <label className="border-b border-gray-300">Nickname</label>
            <input
              type="text"
              className="border-none focus:outline-none focus:ring-0 focus:border-b border-gray-300"
              placeholder="Nickname"
            />
          </div>

          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="flex flex-col w-1/2 max-w-xs">
              <label className="border-b border-gray-300">First Name</label>
              <input
                type="text"
                className="border-none focus:outline-none focus:ring-0 focus:border-b border-gray-300"
                placeholder="First Name"
              />
            </div>
            <div className="flex flex-col w-1/2 max-w-xs">
              <label className="border-b border-gray-300">Last Name</label>
              <input
                type="text"
                className="border-none focus:outline-none focus:ring-0 focus:border-b border-gray-300"
                placeholder="Last Name"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
