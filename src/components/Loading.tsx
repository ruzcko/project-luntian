import React from "react";
import Spinner from "react-spinkit";

const Loading: React.FC = () => {
  return (
    <div
      className={`flex flex-col space-y-4 h-screen items-center justify-center`}
    >
      <Spinner name="folding-cube" fadeIn="none" />
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
