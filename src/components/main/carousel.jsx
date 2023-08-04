import { Carousel } from "flowbite-react";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";

function CarouselComp({ imgArray }) {
  // console.log(imgArray[0]);
  // console.log(imgArray[0].url);
  const itemRender = (imgItem, index) => {
    return (
      <div class="hidden duration-300 ease-in-out " data-carousel-item>
        <img key={index} src={imgItem.url} class=" absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt={imgItem.alt} />
      </div>
    );
  };
  return (
    <>
      {/* <div className="h-56 w-[100%]  m-auto sm:h-64 xl:h-80 2xl:h-96">
        <Carousel
          slideInterval={10000}
          leftControl={<ChevronLeft className=" lg:text-custom-blue lg:opacity-60 lg:hover:opacity-100" size={30} />}
          rightControl={<ChevronRight className=" lg:text-custom-blue lg:opacity-60 lg:hover:opacity-100" size={30} />}
        >
          {imgArray.map((imgItem, index) => (
            <img key={index} src={imgItem.url} alt={imgItem.alt} />
          ))}
          <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
          <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
          <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
          <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
          <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
        </Carousel>
      </div> */}

      <div id="default-carousel" class="relative w-full" data-carousel="slide">
        {/* <!-- Carousel wrapper --> */}
        <div class="relative h-56 overflow-hidden md:h-96 z-0">
          {/* <div class="hidden duration-300 ease-in-out" data-carousel-item="active">
            <img key="0" src={imgArray[0].url} class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt={imgArray[0].alt} />
          </div> */}
          {/* {itemRender(imgArray[0], 0)} */}
          {imgArray.map((item, index) => {
            return itemRender(item, index);
            // return index != 0 ? (
            //   <div class="hidden duration-300 ease-in-out" data-carousel-item>
            //     <img key={index} src={item.url} class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt={item.alt} />
            //   </div>
            // ) : (
            //   <></>
            // );
          })}
        </div>

        {/* <!-- Slider indicators --> */}
        <div class="absolute  flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
          <button type="button" class="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
          {imgArray.map((item, index) => {
            // console.log(index);
            return index != 0 ? <button type="button" class="w-3 h-3 rounded-full" aria-current="true" aria-label={`Slide ${index + 1}`} data-carousel-slide-to={index}></button> : <></>;
          })}
          {/* <button type="button" class="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
          <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
          <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
          <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
          <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button> */}
        </div>
        {/* <!-- Slider controls --> */}
        <button type="button" class="absolute top-0 left-0 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
          <span class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg aria-hidden="true" class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            <span class="sr-only">Previous</span>
          </span>
        </button>
        <button type="button" class="absolute top-0 right-0  flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
          <span class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg aria-hidden="true" class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
            <span class="sr-only">Next</span>
          </span>
        </button>
      </div>
    </>
  );
}

export default CarouselComp;
