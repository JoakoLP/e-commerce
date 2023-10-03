import { Squares2X2Icon, SquaresPlusIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const linkStyle =
    "border border-cyan-600 rounded-sm p-0.5 px-1.5 justify-center w-full justify-center flex xl:hover:scale-95 xl:active:scale-105 whitespace-nowrap m-auto xl:hover:shadow-md shadow-cyan-950 xl:hover:bg-cyan-50";
  const cardStyle = "flex w-full max-w-3xl p-6 space-x-5 bg-white md:rounded-md lg:hover:bg-gray-200 lg:hover:bg-opacity-75";

  return (
    <div className="flex justify-center p-2 pt-6">
      <div className="flex flex-col w-full max-w-3xl p-6 bg-white shadow md:rounded-md ">
        <div className="flex justify-center w-full pb-1 space-x-1">
          <p className="font-bold">Editar productos</p>
        </div>
        <a href="/admin/products/editlist" className={cardStyle} title="Editar listado de productos">
          <Squares2X2Icon className="w-6 h-6 text-gray-500" />
          <p>Listado de productos</p>
        </a>
        <a href="/admin/products/add-product" className={cardStyle} title="Agregar producto al listado">
          <SquaresPlusIcon className="w-6 h-6 text-gray-500" />
          <p>Agregar producto</p>
        </a>
      </div>
    </div>
  );
};

export default Products;
