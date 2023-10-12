import React from "react";
import { Cart2, XLg } from "react-bootstrap-icons";
import { useDisableBodyScroll } from "../../useDisableBodySroll";
import Cart from "../../cart/cart";
import { Button, Drawer } from "@material-tailwind/react";

export default function CartDrawer({ cartIsOpen, setCartIsOpen }) {
  useDisableBodyScroll(cartIsOpen);
  return (
    <Drawer
      placement="right"
      open={cartIsOpen}
      onClose={() => {
        setCartIsOpen(false);
      }}
      size={500}
      className="p-4"
    >
      <section className={" w-full max-w-lg  h-full "}>
        <article className="flex flex-col items-center w-full h-full max-w-lg pb-10 space-y-2 md:space-y-6">
          <header className="relative flex items-center justify-center w-full text-lg font-bold ">
            <Cart2 size={24} />
            <span>Carrito</span>
            <Button
              variant="text"
              className="!absolute right-0 p-2 -translate-y-1/2 top-1/2"
              onClick={() => {
                setCartIsOpen(false);
              }}
            >
              <div className="">
                <XLg size={15} />
              </div>
            </Button>
          </header>
          <Cart />
        </article>
      </section>
    </Drawer>
  );
}
