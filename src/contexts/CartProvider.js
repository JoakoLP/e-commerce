import { createContext, useEffect, useReducer, useState } from "react";
import productsService from "../services/products";

import cartService from "../services/cart";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [productList, setProductList] = useState();
  const [cart, setCart] = useState();

  useEffect(() => {
    productsService.productGet(setProductList);
    cartService.getCart(setCart);
  }, []);

  const cartContextValue = { productList, setProductList, cartService, cart, setCart };

  return <CartContext.Provider value={cartContextValue}>{children}</CartContext.Provider>;
};

export default CartProvider;
