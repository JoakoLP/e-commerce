import React from "react";
import CarouselComp from "../components/main/carousel";
import PopularCards from "../components/main/popularCards";
import PruebaScript from "../components/scripts/pruebaScript";
import ToAttributes from "../components/scripts/toAttributes";
import ToSubCategory from "../components/scripts/toSubcategory";
import ToSubCategoryTemp from "../components/scripts/toSubCategoryTemp";
import ToProdID from "../components/scripts/toProdID";
import DeleteAllProd from "../components/scripts/deleteAllProd";

const DefaultPage = () => {
  const imgArray = [
    {
      url: "https://i.imgur.com/a3nzPZp.jpg",
      alt: 1,
    },
    {
      url: "https://i.imgur.com/ECAhbwW.jpg",
      alt: 2,
    },
    {
      url: "https://i.imgur.com/JTkBAFZ.jpg",
      alt: 3,
    },
    {
      url: "https://i.imgur.com/LgJ743U.jpg",
      alt: 4,
    },
    {
      url: "https://i.imgur.com/DcIspDB.jpg",
      alt: 5,
    },
    {
      url: "https://i.imgur.com/WeWTZ2D.jpg",
      alt: 6,
    },
    {
      url: "https://i.imgur.com/BN5geKg.jpg",
      alt: 7,
    },
    // {
    //   url: "",
    //   alt: 8,
    // },
  ];
  return (
    <div className="h-min-[85vh] flex flex-col items-center">
      <CarouselComp imgArray={imgArray} />
      <PopularCards />
      {/* <PruebaScript /> */}
      {/* <ToAttributes /> */}
      {/* <ToSubCategory /> */}
      {/* <ToSubCategoryTemp /> */}
      {/* <ToProdID /> */}
      {/* <DeleteAllProd /> */}
    </div>
  );
};

export default DefaultPage;
