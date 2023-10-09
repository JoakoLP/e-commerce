import React from "react";
import { HiOutlineAdjustmentsHorizontal, HiOutlineBars3, HiOutlineSquares2X2, HiOutlineUserGroup } from "react-icons/hi2";

const cardStyle = "flex w-full max-w-3xl p-6 space-x-5 bg-white md:rounded-md lg:hover:bg-gray-200 lg:hover:bg-opacity-75";

const Index = () => {
  return (
    <div className="flex justify-center w-full h-full p-2 pt-6 bg-gray-200">
      <div className="flex flex-col w-full max-w-3xl p-6 bg-white shadow md:rounded-md ">
        <div className="flex justify-center w-full pb-1 space-x-1">
          <HiOutlineAdjustmentsHorizontal className="w-6 h-6 text-gray-500" />
          <p className="font-bold">ADMIN</p>
          <HiOutlineAdjustmentsHorizontal className="w-6 h-6 text-gray-500" />
        </div>
        <a href="/admin/userList" className={cardStyle} title="Listado de usuarios">
          <HiOutlineUserGroup className="w-6 h-6 text-gray-500" />
          <p>Listado de usuarios</p>
        </a>
        <a href="/admin/category" className={cardStyle} title="Editar categorías de productos">
          <HiOutlineBars3 className="w-6 h-6 text-gray-500" />
          <p>Categorías</p>
        </a>
        <a href="/admin/products" className={cardStyle} title="Editar productos">
          <HiOutlineSquares2X2 className="w-6 h-6 text-gray-500" />
          <p>Productos</p>
        </a>
      </div>
    </div>
  );
};

export default Index;
