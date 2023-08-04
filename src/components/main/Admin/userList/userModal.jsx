import React from "react";
import { useDisableBodyScroll } from "../../../useDisableBodySroll";
import { XMarkIcon } from "@heroicons/react/24/outline";

const UserModal = ({ isOpen, setIsOpen, user }) => {
  useDisableBodyScroll(isOpen);
  const closeModal = () => {
    setIsOpen(!isOpen);
  };

  const date = user?.date
    ? new Intl.DateTimeFormat("es-ES", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(user?.date))
    : null;

  return (
    <div
      className={
        "fixed flex justify-center items-center overflow-hidden bg-gray-900 z-10 inset-0 transform ease-in-out transition-opacity " +
        (isOpen ? " opacity-100 duration-500 bg-opacity-40 scale-100 " : " opacity-0 bg-opacity-0 scale-0 ")
      }
    >
      <section className="absolute w-2/3 h-[50vh] p-2 pb-4 bg-white">
        <header className="flex justify-between px-2 text-lg font-medium border-b h-min border-cyan-700">
          <span>Información de {user?.username}</span>
          <button onClick={closeModal}>
            <XMarkIcon className="w-6 h-6 text-cyan-900 hover:text-cyan-700" />
          </button>
        </header>
        <div className="max-h-full px-2 text-gray-800 h-min">
          <div className="flex items-center p-3 space-x-2 max-h-fit">
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
            <div className="flex flex-col justify-start overflow-auto max-h-64 ">
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
              <div className={user?.cart?.products.length > 0 ? "visible max-h-full p-1 overflow-auto shadow-inner bg-cyan-50 h-min shadow-gray-300" : "hidden"}>
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
          </div>
          {/* <p>{user?.cart}</p> */}
        </div>
      </section>
      <div className="w-screen h-full" onClick={closeModal}></div>
    </div>
  );
};

export default UserModal;
