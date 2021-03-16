import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import logo from "../../assets/logo.png";

function UserNavbar({ leftActive, setLeftActive, user }) {
  const { url } = useRouteMatch();

  return (
    <div className="relative flex items-center justify-between w-full px-4 h-14">
      <div className="flex items-center justify-center md:space-x-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="z-10 cursor-pointer h-9 w-9"
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

        <div className="absolute inset-0 z-0 flex items-center justify-center md:static">
          <Link to="/home">
            <div className="flex items-center justify-center cursor-pointer select-none">
              <img className="w-10 h-10" src={logo} alt="app_logo" />
              <p className="hidden ml-2 text-xl font-semibold uppercase md:block">
                Luntian
              </p>
            </div>
          </Link>
        </div>
      </div>

      <div className="z-10 flex items-center space-x-4 text-sm">
        <Link to={`${url}/cart`}>
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
        </Link>

        <Link to={`${url}/profile`}>
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="profile_pic"
              className="h-10 rounded-full"
            />
          ) : (
            <div className="flex items-center justify-center w-10 h-10 text-lg bg-gray-300 rounded-full">
              A
            </div>
          )}
        </Link>
      </div>
    </div>
  );
}

export default UserNavbar;
