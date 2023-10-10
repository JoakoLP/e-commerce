import React from "react";
import { useDisableBodyScroll } from "../../../useDisableBodySroll";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogBody, DialogHeader, IconButton } from "@material-tailwind/react";
import { AiOutlineClose } from "react-icons/ai";

// const UserModal = ({ isOpen, setIsOpen, user }) => {
const UserModal = ({ open, handleOpen, user }) => {
  // useDisableBodyScroll(isOpen);
  // const closeModal = () => {
  //   setIsOpen(!isOpen);
  // };

  const date = user?.date
    ? new Intl.DateTimeFormat("es-ES", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(user?.date))
    : null;

  const lastSeen = user?.lastSeen
    ? new Intl.DateTimeFormat("es-ES", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(user?.lastSeen))
    : null;

  return (
    <Dialog open={open} handler={handleOpen}>
      <div className="flex items-center justify-between">
        <DialogHeader className="p-3 text-lg leading-normal">
          <span className="text-lg">Información de {user?.username}</span>
        </DialogHeader>
        <IconButton variant="outlined" size="sm" className="mr-2" onClick={handleOpen}>
          <AiOutlineClose size={20} />
        </IconButton>
      </div>
      <DialogBody className="p-2 space-y-3 text-sm text-black border-t border-blue-gray-100">
        <div className="p-2">
          <div className="flex items-center space-x-2 max-h-fit">
            <a href={user?.avatar} target="_blank">
              <img src={user?.avatar} alt={user?.username} title={user?.username} className="object-cover h-24 aspect-square p-0.5 rounded-full border-2 border-cyan-700" />
            </a>
            <div className="text-base">
              <p>
                <span className="font-bold">Nombre: </span>
                {user?.name}
              </p>
              <p>
                <span className="font-bold">Creación: </span>
                {user?.date ? date : "Indefinida"}
              </p>
              <p className="text-sm italic">
                <span className="text-sm font-semibold">Ult. vez online: </span>
                {user?.lastSeen ? lastSeen : "Indefinida"}
              </p>
            </div>
          </div>
          <div className="max-h-full overflow-auto truncate h-min">
            <p>
              <span className="font-bold">Usuario: </span>
              {user?.username}
            </p>
            <p>
              <span className="font-bold">Email: </span>
              {user?.email}
            </p>
            <div className="flex pt-3 space-x-2">
              <span className="font-bold"> Carrito: </span>
              <div className="inline-block text-sm">
                <p className="text-xs">
                  <span className="text-sm italic font-semibold">Total:</span> ${user?.cart?.total}
                </p>
                <p className="text-xs">
                  <span className="text-sm italic font-semibold">Items:</span> {user?.cart?.count}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start overflow-auto max-h-64 ">
          <div className={user?.cart?.products.length > 0 ? "visible max-h-full p-1 overflow-auto shadow-inner bg-cyan-300/10 h-min shadow-gray-500 rounded-b-lg" : "hidden"}>
            <ul className="space-y-2.5 px-1 list-decimal list-inside">
              {user?.cart?.products?.map((item) => {
                return (
                  <li className="">
                    <span className="w-full break-words">{item?.name}</span>
                    <div className="flex gap-3 px-5 text-xs">
                      <span>Cantidad: {item?.quantity}</span>
                      <span>Precio: ${item?.price}</span>
                      <span>Subtotal: ${item?.price * item?.quantity}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default UserModal;
