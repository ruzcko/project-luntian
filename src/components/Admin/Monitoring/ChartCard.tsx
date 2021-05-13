import React from "react";

interface ChartCardProps {
  className?: string;
  style?: React.CSSProperties;
  row?: boolean;
}

const ChartCard: React.FC<ChartCardProps> = ({
  className,
  children,
  style,
  row = false,
}) => {
  return (
    <div
      style={style}
      className={`bg-gray-50 ${
        row ? "flex-row space-x-4" : "flex-col"
      } shadow-md rounded-xl overflow-hidden flex ${
        !row && "justify-center"
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default ChartCard;
