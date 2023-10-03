import React, { useContext } from "react";
import { Cart2, XLg } from "react-bootstrap-icons";
import { CartContext } from "../../contexts/CartProvider";

const CartButton = ({ cartIsOpen, setCartIsOpen }) => {
  const cartContextValue = useContext(CartContext);
  const { cart, setCart } = cartContextValue;

  return (
    <button
      title="Carrito"
      className={
        cart?.products?.length > 0
          ? `fixed flex items-center justify-center p-2 bg-cyan-900 bg-opacity-95 rounded-lg shadow-md bordera border-cyan-700 z-20 shadow-slate-800 bottom-5 right-5 visible`
          : `hidden`
      }
      onClick={() => {
        setCartIsOpen(!cartIsOpen);
      }}
    >
      {cart?.count ? <p className="absolute top-0.5 text-xs leading-3 text-white cursor-pointer w-min">{cart?.count}</p> : <></>}
      <Cart2 size={25} className="mb-[-1px] mt-[1px] fill-white" />
    </button>
  );
};

export default CartButton;
