import { createContext, useEffect, useState } from "react";

import cartService from "../services/cart";
import Cookies from "universal-cookie";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const cookies = new Cookies();
  const [cart, setCart] = useState();
  const [onService, setOnService] = useState(false);

  useEffect(() => {
    if (cookies.get("userSession")) {
      cartService.getCart(setCart, onService, setOnService);
    }
  }, []);
  // useEffect(() => {
  //   console.log({ onService });
  // }, [onService]);

  const cartContextValue = { onService, setOnService, cartService, cart, setCart };

  return <CartContext.Provider value={cartContextValue}>{children}</CartContext.Provider>;
};

export default CartProvider;
