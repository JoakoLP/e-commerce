import { AdjustmentsHorizontalIcon, Squares2X2Icon, Bars3Icon, UserGroupIcon } from "@heroicons/react/24/outline";
import React from "react";

import { Link } from "react-router-dom";

const linkStyle =
  "border border-cyan-600 rounded-sm p-0.5 px-1.5 justify-center w-full justify-center flex xl:hover:scale-95 xl:active:scale-105 whitespace-nowrap m-auto xl:hover:shadow-md shadow-cyan-950 xl:hover:bg-cyan-50";
const cardStyle = "flex w-full max-w-3xl p-6 space-x-5 bg-white md:rounded-md lg:hover:bg-gray-200 lg:hover:bg-opacity-75";

const Index = () => {
  return (
    <div className="flex justify-center w-full h-full p-2 pt-6 bg-gray-200">
      <div className="flex flex-col w-full max-w-3xl p-6 bg-white shadow md:rounded-md ">
        <div className="flex justify-center w-full pb-1 space-x-1">
          <AdjustmentsHorizontalIcon className="w-6 h-6 text-gray-500" />
          <p className="font-bold">ADMIN</p>
          <AdjustmentsHorizontalIcon className="w-6 h-6 text-gray-500" />
        </div>
        <a href="/admin/userList" className={cardStyle} title="Listado de usuarios">
          <UserGroupIcon className="w-6 h-6 text-gray-500" />
          <p>Listado de usuarios</p>
        </a>
        <a href="/admin/category" className={cardStyle} title="Editar categorías de productos">
          <Bars3Icon className="w-6 h-6 text-gray-500" />
          <p>Categorías</p>
        </a>
        <a href="/admin/products" className={cardStyle} title="Editar productos">
          <Squares2X2Icon className="w-6 h-6 text-gray-500" />
          <p>Productos</p>
        </a>
      </div>
    </div>
  );
};

export default Index;
