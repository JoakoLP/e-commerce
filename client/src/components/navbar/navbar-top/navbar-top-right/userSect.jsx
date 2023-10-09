import React, { useContext } from "react";
import { Cart2 } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import { AccountContext } from "../../../../contexts/AccountProvider";
import Cookies from "universal-cookie";
import { CartContext } from "../../../../contexts/CartProvider";
import { motion } from "framer-motion";

const UserSect = ({ setCartIsOpen }) => {
  const SERVER_URL = "https://e-commerce-api.joaquintakara.com";
  // const SERVER_URL = "http://localhost:8080";

  const cookies = new Cookies();
  const [user, setUser] = useContext(AccountContext);

  const cartContextValue = useContext(CartContext);
  const { cart, setCart } = cartContextValue;

  const navigate = useNavigate();
  const cartOnClick = () => {
    if (user) {
      setCartIsOpen(true);
    } else {
      navigate("/session/login");
    }
  };

  const defaultUser = `${SERVER_URL}/public/default/user-avatar.png`;

  return (
    <div className="relative flex items-center space-x-4 overflow-hidden select-none">
      <Link to={"/account"}>
        <div className="flex items-center justify-center space-x-2 flex-nowrap">
          <img src={user?.avatar ? user?.avatar : defaultUser} alt="" className="object-cover border rounded-full aspect-square h-11 border-cyan-700" />
          <p>{user ? user?.username : "Cuenta"}</p>
        </div>
      </Link>
      <div className="relative flex flex-col items-center justify-center w-min" onClick={cartOnClick}>
        {cart?.count ? (
          <motion.p initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 100 }} key={cart?.count} className="absolute p-0 text-xs leading-3 cursor-pointer w-min -top-2">
            {cart?.count}
          </motion.p>
        ) : (
          <></>
        )}
        <Cart2 size={20} title="Carrito" className="cursor-pointer" />
      </div>
    </div>
  );
};
export default UserSect;
