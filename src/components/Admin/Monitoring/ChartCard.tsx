import React from "react";

interface ChartCardProps {
  className?: string;
  style?: React.CSSProperties;
}

const ChartCard: React.FC<ChartCardProps> = ({
  className,
  children,
  style,
}) => {
  return (
    <div
      style={style}
      className={`bg-gray-300 shadow-md rounded-xl overflow-hidden flex flex-col justify-center ${className}`}
    >
      {children}
    </div>
  );
};

export default ChartCard;
