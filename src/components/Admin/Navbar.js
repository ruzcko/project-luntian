import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

function Navbar({ leftActive, setLeftActive, user }) {
  return (
    <div className="w-full px-4 flex h-14 items-center justify-between relative">
      <div className="flex items-center justify-center md:space-x-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-9 w-9 cursor-pointer z-10"
          onClick={() => setLeftActive(!leftActive)}
        >
          {leftActive ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.25}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.25}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>

        <div className="absolute inset-0 flex items-center justify-center z-0 md:static">
          <Link to="/admin">
            <div className="cursor-pointer select-none flex items-center justify-center">
              <img className="h-10 w-10" src={logo} alt="app_logo" />
              <p className="hidden md:block ml-2 font-semibold text-xl uppercase">
                Luntian
              </p>
            </div>
          </Link>
        </div>
      </div>

      <div className="flex items-center space-x-4 text-sm z-10">
        <button
          className={`inline-block text-gray-900 focus:outline-none rounded-full h-9 w-9`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.25}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </button>

        {user && (
          <img
            src={user.photoURL}
            alt="profile_pic"
            className="h-10 rounded-full"
          />
        )}
      </div>
    </div>
  );
}

export default Navbar;
