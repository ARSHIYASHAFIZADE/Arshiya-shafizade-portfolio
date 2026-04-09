import React from "react";
import { SectionWrapper } from "../hoc";
import { useSwipeable } from "react-swipeable";
import DV1 from "../assets/DV1.png";
import DV2 from "../assets/DV2.png";
import DV3 from "../assets/DV3.png";
import DV4 from "../assets/DV4.png";
import { useState } from "react";

const Dv = () => {
  const visualizations = [
    { id: 0, src: DV1, alt: "Visualization 1" },
    { id: 1, src: DV2, alt: "Visualization 2" },
    { id: 2, src: DV3, alt: "Visualization 3" },
    { id: 3, src: DV4, alt: "Visualization 4" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % visualizations.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? visualizations.length - 1 : prevIndex - 1
    );
  };

  const handlers = useSwipeable({
    onSwipedUp: handleNext,
    onSwipedDown: handlePrev,
    trackMouse: true,
  });

  const anglePerImage = 360 / visualizations.length;
  const rotation = currentIndex * anglePerImage;

  return (
    <section
      id="Data Visualization"
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8"
    >
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center mt-6 break-words word-wrap">
          Data Visualization
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-center mt-4 mb-8 text-white word-wrap break-words">
          Use the buttons to browse the insights.
        </p>
      </div>

      <div
        {...handlers}
        className="relative w-full flex items-center justify-center overflow-hidden"
        style={{
          perspective: "1200px",
          height: "clamp(400px, 85vh, 800px)",
        }}
      >
        <div
          className="relative"
          style={{
            width: "clamp(300px, 80vw, 1000px)",
            height: "clamp(300px, 80vw, 1000px)",
            transformStyle: "preserve-3d",
            transition: "transform 0.8s ease-in-out",
            transform: `rotateX(${-rotation}deg)`,
          }}
        >
          {visualizations.map((viz, index) => {
            const rotationAngle = anglePerImage * index;
            const containerSize = "clamp(250px, 70vw, 400px)";
            return (
              <div
                key={viz.id}
                className="absolute w-full h-full flex items-center justify-center"
                style={{
                  transform: `rotateX(${rotationAngle}deg) translateZ(clamp(350px, 40vw, 700px))`,
                  backfaceVisibility: "hidden",
                }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: containerSize,
                    height: containerSize,
                  }}
                >
                  <img
                    src={viz.src}
                    alt={viz.alt}
                    className="object-contain w-full h-full max-w-full max-h-full"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center items-center mt-8 space-x-4 sm:space-x-6 px-4">
        <button
          onClick={handlePrev}
          className="text-sm sm:text-lg px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-white transition transform hover:scale-105 duration-300 ease-in-out border border-white whitespace-nowrap"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="text-sm sm:text-lg px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-white transition transform hover:scale-105 duration-300 ease-in-out border border-white whitespace-nowrap"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default SectionWrapper(Dv, "DV");
