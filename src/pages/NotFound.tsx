import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="text-2xl font-semibold">404 - Page not found.</h1>
      <Link to="/">
        <p className="text-blue-500 underline">Go back to home.</p>
      </Link>
    </div>
  );
};

export default NotFound;
