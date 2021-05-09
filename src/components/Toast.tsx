import React from "react";

interface ToastProps {
  msg: string;
  warning?: boolean;
}

const Toast: React.FC<ToastProps> = ({ msg, warning = false }) => {
  return (
    <div className="fixed z-50 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-lg md:py-4 bottom-4 right-4">
      {warning && <p className="text-xs text-red-500 md:text-sm">Warning! </p>}
      <p className="text-sm md:text-base">{msg}</p>
    </div>
  );
};

export default Toast;
