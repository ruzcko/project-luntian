import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

interface LPImageProps {
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}

const LPImage: React.FC<LPImageProps> = ({ setIndex }) => {
  return (
    <div className="flex">
      <Carousel
        autoPlay
        interval={10000}
        infiniteLoop
        showIndicators={false}
        showThumbs={false}
        onChange={setIndex}
      >
        {Array(42)
          .fill(0)
          .map((_, i) => {
            return (
              <img
                key={`lpimg-${i + 1}`}
                src={`/data/hydroponics/images/${i + 1}.jpg`}
                alt={`lpimg-${i + 1}`}
                className="object-cover w-full"
                style={{ height: "300px" }}
              />
            );
          })}
      </Carousel>
    </div>
  );
};

export default LPImage;
