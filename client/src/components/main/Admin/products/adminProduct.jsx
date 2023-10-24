import React, { useState } from "react";
import { Button } from "flowbite-react";

const AdminProduct = ({ data, edit, setEdit, setEditItem }) => {
  // const [edit, setEdit] = useState(false);
  return (
    <div
      key={data.prod_id}
      className="relative flex justify-between p-2 duration-150 bg-white border rounded shadow shadow-gray-300 sm:flex-col h-min active:shadow-cyan-400 lg:hover:shadow-2xl lg:hover:shadow-gray-500 lg:hover:z-10"
    >
      <p className="absolute text-sm top-1 right-1">prod_id: {data.prod_id}</p>
      <div className="w-[130px] shrink-0 sm:w-auto h-[130px] sm:h-[250px] p-2 flex items-center justify-center sm:mx-1 bg-white rounded-md">
        <img src={data.img?.data || data.img} alt={data.name} className="object-contain w-full h-full truncate rounded-sm" />
      </div>
      <div className="flex flex-col min-h-max w-full sm:h-[45%a] justify-between px-2 my-2 sm:my-a4 text-center select-text">
        <p className="text-xs sm:text-sm md:text-base text-left sm:text-center h-[64px] sm:h-[80px] md:h-[96px] text-ellipsis text-black overflow-hidden hover:overflow-visible">{data.name}</p>
        <div className="flex flex-col self-end sm:w-full sm:self-auto w-min">
          <span className="py-1 font-bold text-center text-black rounded-full ">${data.price}</span>
          <button
            className="self-center px-2 py-0.5 text-sm font-bold text-white duration-100 rounded select-none bg-cyan-700 sm:py-2 sm:px-4 active:scale-110 active:duration-75 lg:hover:bg-cyan-900 lg:hover:shadow-inner lg:hover:shadow-neutral-800 active:shadow-inner active:shadow-neutral-800 w-min whitespace-nowrap"
            onClick={() => {
              setEdit(!edit);
              setEditItem(data);
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
