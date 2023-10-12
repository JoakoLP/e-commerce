import axios from "axios";
import { toast } from "react-toastify";
import { BsCartDashFill, BsCartPlusFill, BsCartXFill } from "react-icons/bs";
import Cookies from "universal-cookie";

axios.defaults.withCredentials = false;
const cookies = new Cookies();
const SERVER_URL = "https://e-commerce-api.joaquintakara.com";
// const SERVER_URL = "http://localhost:8080";

const cart = axios.create({
  withCredentials: true,
  baseURL: `${SERVER_URL}/api/cart/`,
  headers: { Authorization: `${cookies.get("authorization")}` },
});

const getCart = async (setCart, onService, setOnService) => {
  if (!onService) {
    try {
      setOnService(true);
      await cart.get("getCart").then((res) => {
        if (setCart) {
          if (res?.data?.products) {
            // console.log(res.data);
            setCart(res.data);
          } else {
            console.log("Not a cart, getCart");
          }
          setOnService(false);
        } else {
          setOnService(false);
          return res.data;
        }
      });
    } catch (error) {
      console.log(error);
      setOnService(false);
    }
  }
};

const addToCart = async (id, setCart, onService, setOnService) => {
  // console.log(`Producto de id "${id}" agregado al carrito.`);
  if (!onService) {
    try {
      setOnService(true);

      // console.log(cookies.get("userSession"));
      // console.log(cookies.get("authorization"));
      await cart.post(`/add/${id}`).then((res) => {
        toast(`Producto agregado al carrito.`, {
          icon: ({ theme, type }) => <BsCartPlusFill size={24} className="fill-green-700" />,
          type: "success",
          containerId: "cart",
        });
        // await axios.post(`${baseUrl}add/${id}`, { withCredentials: true }).then((res) => {
        // console.log(res.data);
        // console.log(res.data.msg);
        setCart(res.data.cart);
        setOnService(false);
        // console.log(cookies.get("userSession"));
      });
    } catch (error) {
      console.log(error);
      setOnService(false);
    }
  }
};

const deleteFromCart = async (id, setCart, onService, setOnService) => {
  if (!onService) {
    try {
      setOnService(true);
      await cart.put(`/delete-item/${id}`).then((res) => {
        toast(`Producto eliminado del carrito.`, {
          icon: ({ theme, type }) => <BsCartDashFill size={24} className="fill-red-700" />,
          type: "error",
          containerId: "cart",
        });
        // console.log(res.data);
        setCart(res.data.cart);
        // console.log(cookies.get("userSession"));
        setOnService(false);
      });
    } catch (error) {
      console.log(error);
      setOnService(false);
    }
  }
};
const deleteAllItems = async (id, setCart, onService, setOnService) => {
  if (!onService) {
    try {
      setOnService(true);
      await cart.delete(`/delete-all-items/${id}`).then((res) => {
        toast(`Productos eliminados del carrito.`, {
          icon: ({ theme, type }) => <BsCartDashFill size={24} className="fill-red-700" />,
          type: "error",
          containerId: "cart",
        });
        // console.log(res.data);
        setCart(res.data.cart);
        // console.log(cookies.get("userSession"));
        setOnService(false);
      });
    } catch (error) {
      console.log(error);
      setOnService(false);
    }
  }
};
const clearCart = async (setCart, onService, setOnService) => {
  if (!onService) {
    try {
      setOnService(true);
      await cart.delete(`/clear`).then((res) => {
        toast(`Carrito vaciado.`, {
          icon: ({ theme, type }) => <BsCartXFill size={24} className="fill-red-800" />,
          type: "error",
          containerId: "cart",
        });
        // console.log(res.data);
        setCart(res.data.cart);
        // console.log(cookies.get("userSession"));
        setOnService(true);
      });
    } catch (error) {
      console.log(error);
      setOnService(true);
    }
  }
};

export default { getCart, addToCart, deleteFromCart, deleteAllItems, clearCart };
