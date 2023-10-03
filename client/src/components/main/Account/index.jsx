import React from "react";
import { Link } from "react-router-dom";
import { TicketIcon, UserCircleIcon } from "@heroicons/react/24/outline";

const linkStyle = "items-center rounded-sm p-5 w-full justify-start flex active:bg-gray-200 xl:hover:bg-gray-200 xl:hover:bg-opacity-75 whitespace-nowrap m-auto ";

const iconStyle = "flex items-center justify-center w-6 h-6 mr-2 rounded-full ";

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center md:p-4">
      <div className="flex flex-col items-center justify-center w-full max-w-3xl p-6 space-y-2 bg-white shadow group md:rounded-md">
        <p className="w-full text-2xl font-semibold text-center">Tu cuenta</p>
        <div className="grid items-center justify-center grid-cols-2 gap-4">
          <Link to={"my-purchases"} className={linkStyle}>
            <div className={iconStyle}>
              <TicketIcon className="h-9 !text-cyan-800a text-gray-600 ratio-square " />
            </div>
            <span className="w-max">Compras</span>
          </Link>
          <Link to={"my-profile"} className={linkStyle}>
            <div className={iconStyle}>
              <UserCircleIcon className="h-9 !text-cyan-800a text-gray-600 ratio-square " />
            </div>
            <span className="w-max">Mi perfil</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
