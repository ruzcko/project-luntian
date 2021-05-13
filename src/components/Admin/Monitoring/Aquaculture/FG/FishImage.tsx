import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

interface LPImageProps {
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}

const FishImage: React.FC<LPImageProps> = ({ setIndex }) => {
  return (
    <div className="flex bg-gray-400 rounded">
      <Carousel
        autoPlay
        interval={10000}
        infiniteLoop
        showIndicators={false}
        showThumbs={false}
        onChange={setIndex}
      >
        {Array(90)
          .fill(0)
          .map((_, i) => {
            return (
              <img
                key={`fish-img-${i + 1}`}
                src={`/data/aquaculture/images/${i + 1}.jpg`}
                alt={`lpimg-${i + 1}`}
                className="object-contain w-full rounded"
                style={{ height: "300px" }}
              />
            );
          })}
      </Carousel>
    </div>
  );
};

export default FishImage;
