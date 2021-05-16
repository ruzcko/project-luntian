import React from "react";

interface MemberProps {
  name: string;
  description?: string;
  image: string;
  className?: string;
}

const Member: React.FC<MemberProps> = ({
  name,
  description,
  image,
  className,
}) => {
  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      <img
        className="object-cover rounded-full w-36 h-36 md:w-40 md:h-40"
        src={image}
        alt={name}
      />

      <h4 className="text-base text-center text-gray-600 md:text-lg">{name}</h4>

      <p className="text-sm text-center text-gray-500">{description}</p>
    </div>
  );
};

export default Member;
