import { useContext } from "react";
import { CartContext } from "../../../../contexts/CartProvider";
import { useNavigate } from "react-router-dom";
import { Cart2 } from "react-bootstrap-icons";
import { AccountContext } from "../../../../contexts/AccountProvider";
import { motion } from "framer-motion";

const CartNavButton = ({ setCartIsOpen }) => {
  const cartContextValue = useContext(CartContext);
  const { cart, setCart } = cartContextValue;

  const [user, setUser] = useContext(AccountContext);

  const navigate = useNavigate();

  const cartOnClick = () => {
    if (user) {
      setCartIsOpen(true);
    } else {
      navigate("/session/login");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-full w-min" onClick={cartOnClick}>
      {cart?.count ? (
        <motion.p initial={{ y: -10, opacity: 0 }} animate={{ y: -0, opacity: 100 }} key={cart?.count} className="absolute p-0 text-xs leading-3 cursor-pointer w-min -top-2">
          {cart?.count}
        </motion.p>
      ) : (
        <></>
      )}
      <Cart2 size={20} title="Carrito" className="cursor-pointer" />
    </div>
  );
};

export default CartNavButton;
