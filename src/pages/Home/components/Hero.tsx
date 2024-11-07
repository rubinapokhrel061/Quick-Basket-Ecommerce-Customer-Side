import Navbar from "../../../globals/components/navbar/Navbar";
import { useState } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";
const Hero = () => {
  const images = ["/public/1.jpg", "/public/2.jpg", "/public/3.jpg"];

  const texts = [
    "Your One-Stop Shop for Everything!",
    " Electronic and More All in One Shop!",
    "Fast Shopping, Fresh Finds!",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div>
      <Navbar />
      <div className="relative pt-20 w-full h-[95vh]">
        <div className="relative h-full ">
          {images.map((src, index) => (
            <div
              key={index}
              className={`absolute block  w-full h-full transition-opacity duration-700 ease-in-out ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 text-black  font-semibold bg-black bg-opacity-10">
                <h4 className="text-2xl absolute bottom-20 left-10 md:text-3xl">
                  {texts[index]}
                </h4>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-blue-600" : "bg-gray-300"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
        <button
          type="button"
          className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer"
          onClick={handlePrev}
        >
          <GrFormPrevious className="bg-white rounded-lg text-xl" />
        </button>
        <button
          className="absolute top-0 right-0 z-30 flex items-center justify-center h-full p-4 cursor-pointer"
          onClick={handleNext}
        >
          <MdOutlineNavigateNext className="bg-white rounded-lg text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
