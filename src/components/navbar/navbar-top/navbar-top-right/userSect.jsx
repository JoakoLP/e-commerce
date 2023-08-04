import React, { useContext } from "react";
import { CartCheck } from "react-bootstrap-icons";
import { Cart2 } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { AccountContext } from "../../../../contexts/AccountProvider";
import Cookies from "universal-cookie";
import { CartContext } from "../../../../contexts/CartProvider";

const UserSect = ({ setCartIsOpen }) => {
  const cookies = new Cookies();
  const [user, setUser] = useContext(AccountContext);

  const cartContextValue = useContext(CartContext);
  const { cart, setCart } = cartContextValue;

  const defaultUser = "http://localhost:8080/public/default/user-avatar.png";

  return (
    <div className="relative flex items-center space-x-4 select-none">
      <Link to={"/account"}>
        <div className="flex items-center justify-center space-x-2 flex-nowrap">
          <img src={user?.avatar ? user?.avatar : defaultUser} alt="" className="object-cover border rounded-full aspect-square h-11 border-cyan-700" />
          <p>{user ? user?.username : "Cuenta"}</p>
        </div>
      </Link>
      <div className="relative flex flex-col items-center justify-center w-min" onClick={() => setCartIsOpen(true)}>
        {cart?.count ? <p className="absolute p-0 text-xs leading-3 cursor-pointer w-min -top-2">{cart?.count}</p> : <></>}
        <Cart2 size={20} title="Carrito" className="cursor-pointer" />
      </div>
      {/* <CartCheck></CartCheck> */}
    </div>
  );
};
export default UserSect;
