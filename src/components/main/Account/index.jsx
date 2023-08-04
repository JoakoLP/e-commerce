import React from "react";
import { Link } from "react-router-dom";
import { TicketIcon, UserCircleIcon } from "@heroicons/react/24/solid";

const linkStyle = "border border-gray-200 text-lg items-center rounded-sm p-2 px-3 w-full justify-start flex active:bg-[rgb(238,238,238)] xl:hover:bg-[rgb(238,238,238)] whitespace-nowrap m-auto ";

const iconStyle = "flex items-center justify-center w-12 h-12 mr-2 rounded-full p-0.5 bg-cyan-300 bg-opacity-75 ";

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex group flex-col max-w-[60%] space-y-2 items-center justify-center p-2 pt-6">
        <p className="w-full text-2xl font-semibold text-start">Tu Cuenta</p>
        <div className="grid items-center justify-center grid-cols-2 gap-4">
          <Link to={"my-purchases"} className={linkStyle}>
            <div className={iconStyle}>
              <TicketIcon className="h-10 !text-cyan-800 ratio-square " />
            </div>
            <span className="w-max">Compras</span>
          </Link>
          <Link to={"my-profile"} className={linkStyle}>
            <div className={iconStyle}>
              <UserCircleIcon className="h-10 !text-cyan-800 ratio-square " />
            </div>
            <span className="w-max">Mi Perfil</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
