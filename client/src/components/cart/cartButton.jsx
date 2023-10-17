import React, { useContext } from "react";
import { Cart2, XLg } from "react-bootstrap-icons";
import { CartContext } from "../../contexts/CartProvider";
import { motion } from "framer-motion";

const CartButton = ({ cartIsOpen, setCartIsOpen }) => {
  const cartContextValue = useContext(CartContext);
  const { cart, setCart } = cartContextValue;

  return (
    <button
      title="Carrito"
      className={`
      ${
        cart?.products?.length > 0
          ? ` flex overflow-hidden items-center justify-center p-2.5 bg-cyan-900/95 lg:hover:shadow-slate-700/90 lg:hover:shadow-md rounded-lg z-20 bottom-5 right-5 `
          : ` hidden`
      }  transition-all fixed duration-150
      `}
      onClick={() => {
        setCartIsOpen(!cartIsOpen);
      }}
    >
      {cart?.count ? (
        // <p >
        <motion.p initial={{ y: -30 }} animate={{ y: 0 }} key={cart?.count} className="absolute top-0.5 text-xs leading-3 text-white cursor-pointer w-min">
          {cart?.count}
        </motion.p>
      ) : (
        // </p>
        <></>
      )}
      <Cart2 size={20} className="fill-white" />
    </button>
  );
};

export default CartButton;
