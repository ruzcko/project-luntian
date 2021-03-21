import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import { Link, Redirect } from "react-router-dom";
import logo from "../assets/logo.png";
import Loading from "../components/Loading";

function Home() {
  const [user, loading] = useAuthState(auth);

  if (loading) return <Loading />;

  return !user ? (
    <div>
      <HomeNav />
    </div>
  ) : (
    <Redirect to="/home" />
  );
}

function HomeNav() {
  return (
    <div className="relative flex items-center justify-between w-full px-4 h-14">
      <div className="flex items-center justify-center md:space-x-4">
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
        <Link to="/login">
          <p>Login</p>
        </Link>
        <Link to="signup">
          <p>Signup</p>
        </Link>
      </div>
    </div>
  );
}

export default Home;
