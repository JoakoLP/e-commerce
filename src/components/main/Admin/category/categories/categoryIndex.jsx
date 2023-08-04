import { Bars3Icon, Bars4Icon } from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";

const CategoryIndex = () => {
  const cardStyle = "flex w-full max-w-3xl p-6 space-x-5 bg-white md:rounded-md lg:hover:bg-gray-200 lg:hover:bg-opacity-75";

  return (
    <>
      <div className="flex justify-center p-2 pt-6">
        <div className="flex flex-col w-full max-w-3xl p-6 bg-white shadow md:rounded-md ">
          <div className="flex justify-center w-full pb-1 space-x-1">
            <p className="font-bold">Editar categorías</p>
          </div>
          <a href="/admin/category/categories" className={cardStyle}>
            <Bars3Icon className="w-6 h-6 text-gray-500" />
            <p>Categorías</p>
          </a>
          <a href="/admin/category/subCategories" className={cardStyle}>
            <Bars4Icon className="w-6 h-6 text-gray-500" />
            <p>Sub categorías</p>
          </a>
        </div>
      </div>
    </>
  );
};

export default CategoryIndex;
