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
      url: "https://www.tooltyp.com/wp-content/uploads/2014/10/1900x920-8-beneficios-de-usar-imagenes-en-nuestros-sitios-web.jpg",
      alt: 1,
    },
    {
      url: "https://img.freepik.com/vector-gratis/conjunto-logotipos-comercio-electronico-diseno-plano_23-2148944158.jpg?w=1380&t=st=1678728268~exp=1678728868~hmac=934d477e8f494bbee1e355c3cf0d75f5836b70a910c31e9293fafff32baa63cb",
      alt: 2,
    },
    {
      url: "https://cdn.pixabay.com/photo/2017/10/17/16/10/fantasy-2861107_1280.jpg",
      alt: 3,
    },
    {
      url: "https://flowbite.com/docs/images/carousel/carousel-1.svg",
      alt: 4,
    },
    {
      url: "https://flowbite.com/docs/images/carousel/carousel-2.svg",
      alt: 5,
    },
    {
      url: "https://flowbite.com/docs/images/carousel/carousel-3.svg",
      alt: 6,
    },
    {
      url: "https://flowbite.com/docs/images/carousel/carousel-4.svg",
      alt: 7,
    },
    {
      url: "https://flowbite.com/docs/images/carousel/carousel-5.svg",
      alt: 8,
    },
    // {
    //   url: "",
    //   alt: 9,
    // },
  ];
  return (
    <div className="h-min-[85vh]">
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
