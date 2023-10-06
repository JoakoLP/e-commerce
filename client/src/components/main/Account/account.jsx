import React, { useContext, useState } from "react";
import { AccountContext } from "../../../contexts/AccountProvider";
import { UserIcon, LockClosedIcon, CreditCardIcon, MapPinIcon, ArrowRightOnRectangleIcon, UserMinusIcon, ExclamationTriangleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import accountService from "../../../services/account";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";

const Account = () => {
  const SERVER_URL = "https://e-commerce-api.joaquintakara.com";
  // const SERVER_URL = "http://localhost:8080";

  const [user, setUser] = useContext(AccountContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

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
        <button className={cardStyle} onClick={handleOpen}>
          <UserMinusIcon className="w-6 h-6 text-red-400" />
          <p>Eliminar cuenta</p>
        </button>
      </div>

      <Dialog open={open} size="xs" handler={handleOpen}>
        <DialogHeader>
          <ExclamationCircleIcon className="w-8 text-red-500 aspect-square" />
          <p className="pl-2">¿Desea eliminar su cuenta?</p>
        </DialogHeader>
        <DialogBody divider>
          <div className="flex flex-col items-center justify-center">
            <ExclamationTriangleIcon className="w-16 p-3 text-red-500 bg-red-100 rounded-full aspect-square" />
            <p>Atención</p>
            <p className="">Su cuenta se elimininará permanentemente.</p>
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-between px-8">
          <Button variant="outlined" color="gray" onClick={handleOpen} className="mr-1">
            <p>Cancelar</p>
          </Button>
          <Button
            variant="gradient"
            color="red"
            onClick={() => {
              accountService.unregister();
            }}
          >
            <p>Eliminar cuenta</p>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Account;
