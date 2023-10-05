import { Carousel } from "@material-tailwind/react";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";

function CarouselComp({ imgArray }) {
  // console.log(imgArray[0]);
  // console.log(imgArray[0].url);
  const itemRender = (imgItem, index) => {
    return (
      <div class="items-center justify-center flex h-full overflow-hidden ease-in-out" data-carousel-item>
        <div className="relative flex justify-center w-3/4 h-full overflow-hidden bg-white">
          <img key={index} src={imgItem.url} className="object-cover w-full aspect-auto" alt={imgItem.alt} />
        </div>
      </div>
    );
  };
  return (
    <>
      <Carousel
        className="w-full h-56 md:h-96 group/carousel "
        loop={true}
        autoplay={true}
        prevArrow={({ handlePrev }) => (
          <button
            type="button"
            onClick={handlePrev}
            class="absolute top-2/4 group-hover/carousel:opacity-100 opacity-0 -translate-y-1/2 w-8 h-16 left-0  rounded-r-full flex items-center justify-center px-4 cursor-pointer focus:outline-none shadow shadow-gray-300 hover:shadow-lg bg-white dark:bg-gray-800/30 active:ring-2 active:ring-white dark:active:ring-gray-800/70 active:outline-none"
          >
            <span class="inline-flex items-center justify-center">
              <svg aria-hidden="true" class="w-5 h-5 text-cyan-600 sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              <span class="sr-only">Previous</span>
            </span>
          </button>
        )}
        nextArrow={({ handleNext }) => (
          <button
            type="button"
            onClick={handleNext}
            class="absolute top-2/4 group-hover/carousel:opacity-100 opacity-0 -translate-y-1/2 w-8 h-16 right-0  rounded-l-full flex items-center justify-center px-4 cursor-pointer focus:outline-none shadow shadow-gray-300 hover:shadow-lg bg-white dark:hover:bg-gray-800/60 active:ring-2 active:ring-white dark:active:ring-gray-800/70 active:outline-none"
          >
            <span class="inline-flex items-center justify-center">
              <svg aria-hidden="true" class="w-5 h-5 text-cyan-600 sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
              <span class="sr-only">Next</span>
            </span>
          </button>
        )}
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute z-50 flex gap-2 bottom-4 left-2/4 -translate-x-2/4">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1.5 w-1.5 cursor-pointer rounded-2xl duration-150 transition-all border content-[''] ${
                  activeIndex === i ? "scale-125 bg-white border-gray-900/50" : "border-white bg-gray-900/50"
                }`}
                // className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"}`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        {imgArray.map((item, index) => {
          return itemRender(item, index);
        })}
      </Carousel>
    </>
  );
}

export default CarouselComp;
