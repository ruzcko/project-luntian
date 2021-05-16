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
        className="object-cover w-32 h-32 rounded-full md:w-36 md:h-36 xl:w-40 xl:h-40"
        src={image}
        alt={name}
      />

      <h4 className="text-base text-center text-gray-600 md:text-lg">{name}</h4>

      <p className="text-sm text-center text-gray-500">{description}</p>
    </div>
  );
};

export default Member;
