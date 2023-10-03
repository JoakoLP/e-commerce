import { Button } from "flowbite-react";
import React from "react";
import { Cart2, XLg } from "react-bootstrap-icons";
import { useDisableBodyScroll } from "../../useDisableBodySroll";
import Cart from "../../cart/cart";

export default function CartDrawer({ cartIsOpen, setCartIsOpen }) {
  useDisableBodyScroll(cartIsOpen);
  return (
    <div
      className={
        " fixed overflow-hidden bg-gray-900 z-30 inset-0 transform ease-in-out " +
        (cartIsOpen ? " transition-opacity opacity-100 duration-500 bg-opacity-25 translate-x-0 " : " transition-all opacity-0 bg-opacity-0 delay-500 translate-x-full ")
      }
    >
      <section
        className={
          " w-screen sm:max-w-xl right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " + (cartIsOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <article className="relative flex flex-col w-screen h-full pb-10 sm:max-w-full">
          <header className="flex justify-center p-5 space-x-2 text-lg font-bold bg-white select-none">
            <Cart2 size={24} />
            <span>Carrito</span>
            <Button
              gradientMonochrome="info"
              outline={true}
              size="xs"
              className="absolute top-4 right-5"
              onClick={() => {
                setCartIsOpen(false);
              }}
            >
              <div className="py-1">
                <XLg size={15} />
              </div>
            </Button>
          </header>
          <Cart />
        </article>
      </section>
      <section
        className="w-full h-screen"
        onClick={() => {
          setCartIsOpen(false);
        }}
      ></section>
    </div>
  );
}
