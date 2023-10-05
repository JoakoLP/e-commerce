import React from "react";
import { Link } from "react-router-dom";
import { TicketIcon, UserCircleIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import accountService from "../../../services/account";

const linkStyle = "items-center rounded-sm p-5 w-full justify-start flex active:bg-gray-200 xl:hover:bg-gray-200 xl:hover:bg-opacity-75 whitespace-nowrap m-auto ";

const iconStyle = "flex items-center justify-center w-6 h-6 mr-2 rounded-full ";

const cardStyle = "flex w-full max-w-3xl p-6 space-x-5 bg-white md:rounded-md  lg:hover:bg-gray-200 lg:hover:bg-opacity-75";

const Index = () => {
  return (
    <div className="flex flex-col min-h-[80vh] bg-gray-200 items-center space-y-4 md:space-y-8">
      <div className="flex flex-col items-center justify-center w-full md:pt-4">
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

      <div className="flex flex-col w-full max-w-3xl p-6 bg-white shadow md:rounded-md ">
        <div className="flex justify-center w-full pb-1 space-x-1">
          <button
            className={cardStyle}
            onClick={() => {
              accountService.logout();
            }}
          >
            <ArrowRightOnRectangleIcon className="w-6 h-6 text-gray-500" />
            <p>Cerrar sesión</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
