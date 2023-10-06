import React, { useContext } from "react";
import { AccountContext } from "../../../contexts/AccountProvider";
import { UserIcon, LockClosedIcon, CreditCardIcon, MapPinIcon, ArrowRightOnRectangleIcon, AdjustmentsHorizontalIcon, UserGroupIcon, Bars3Icon, Squares2X2Icon } from "@heroicons/react/24/outline";
import accountService from "../../../services/account";

const Account = () => {
  const SERVER_URL = "https://e-commerce-api.joaquintakara.com";
  // const SERVER_URL = "http://localhost:8080";

  const [user, setUser] = useContext(AccountContext);

  const date = user.date
    ? new Intl.DateTimeFormat("es-ES", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(user?.date))
    : null;

  const cardStyle = "flex w-full max-w-3xl p-6 space-x-5 bg-white md:rounded-md  lg:hover:bg-gray-200 lg:hover:bg-opacity-75";

  return (
    <div className="flex flex-col min-h-[80vh] bg-gray-200 md:p-4 items-center space-y-4 md:space-y-8">
      <div className="flex w-full max-w-3xl p-6 space-x-5 bg-white shadow md:rounded-md ">
        <div className="p-0.5 rounded-full outline outline-2 outline-cyan-700 w-fit">
          <img src={user?.avatar ? user?.avatar : `${SERVER_URL}/public/default/user-avatar.png`} alt="" className="object-cover rounded-full h-14 aspect-square" />
          {/* <img src={user?.avatar ? user?.avatar : "http://localhost:8080/public/default/user-avatar.png"} alt="" className="rounded-full h-14 aspect-square" /> */}
        </div>
        <div>
          <p className="text-2xl font-medium">{user?.name ? user?.name : "Indefinido"}</p>
          <p className="text-sm">
            <span className="font-medium">Creación: </span>
            {user?.date ? date : "Indefinida"}
          </p>
        </div>
      </div>

      {user?.isAdmin ? (
        <div className="flex flex-col w-full max-w-3xl p-6 bg-white shadow md:rounded-md ">
          <div className="flex justify-center w-full pb-1 space-x-1">
            <a href="/admin" className="flex w-min">
              <AdjustmentsHorizontalIcon className="w-6 h-6 text-gray-500" />
              <p className="font-bold">ADMIN</p>
              <AdjustmentsHorizontalIcon className="w-6 h-6 text-gray-500" />
            </a>
          </div>
          <a href="/admin/userList" className={cardStyle}>
            <UserGroupIcon className="w-6 h-6 text-gray-500" />
            <p>Listado de usuarios</p>
          </a>
          <a href="/admin/category" className={cardStyle}>
            <Bars3Icon className="w-6 h-6 text-gray-500" />
            <p>Categorías</p>
          </a>
          <a href="/admin/products" className={cardStyle}>
            <Squares2X2Icon className="w-6 h-6 text-gray-500" />
            <p>Productos</p>
          </a>
        </div>
      ) : null}

      <div className="flex flex-col w-full max-w-3xl p-6 bg-white shadow md:rounded-md ">
        <div className={cardStyle}>
          <UserIcon className="w-6 h-6 text-gray-500" />
          <p>Mis datos</p>
        </div>
        <div className={cardStyle}>
          <LockClosedIcon className="w-6 h-6 text-gray-500" />
          <p>Seguridad</p>
        </div>
        <div className={cardStyle}>
          <CreditCardIcon className="w-6 h-6 text-gray-500" />
          <p>Tarjetas</p>
        </div>
        <div className={cardStyle}>
          <MapPinIcon className="w-6 h-6 text-gray-500" />
          <p>Direcciones</p>
        </div>
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
  );
};

export default Account;
