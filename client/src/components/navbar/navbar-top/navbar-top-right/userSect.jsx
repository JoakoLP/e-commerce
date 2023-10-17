import React from "react";
import Cookies from "universal-cookie";
import { CartContext } from "../../../../contexts/CartProvider";
import CartNavButton from "./cartNavButton";
import AccountNavButton from "./accountNavButton";

const UserSect = ({ setCartIsOpen }) => {
  return (
    <div className="relative flex items-center h-full select-none md:overflow-hidden md:space-x-4">
      {window.innerWidth > 768 ? <AccountNavButton /> : null}
      <CartNavButton setCartIsOpen={setCartIsOpen} className="" />
    </div>
  );
};
export default UserSect;
