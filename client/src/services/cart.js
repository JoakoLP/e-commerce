import axios from "axios";
import { toast } from "react-toastify";
import { BsCartDashFill, BsCartPlusFill, BsCartXFill } from "react-icons/bs";
import Cookies from "universal-cookie";
// import { toast } from "react-toastify";

axios.defaults.withCredentials = false;
const cookies = new Cookies();
const SERVER_URL = "https://e-commerce-api.joaquintakara.com";
// const SERVER_URL = "http://localhost:8080";

const cart = axios.create({
  withCredentials: true,
  baseURL: `${SERVER_URL}/api/cart/`,
  // baseURL: "http://localhost:8080/api/cart/",
  headers: { Authorization: `${cookies.get("authorization")}` },
});

const getCart = async (setCart) => {
  try {
    await cart.get("getCart").then((res) => {
      if (setCart) {
        if (res?.data?.products) {
          console.log(res.data);
          setCart(res.data);
        } else {
          console.log("Not a cart, getCart");
        }
      } else {
        return res.data;
      }
    });
  } catch (error) {}
};

const addToCart = async (id, setCart, name) => {
  console.log(`Producto de id "${id}" agregado al carrito.`);
  try {
    // console.log(cookies.get("userSession"));
    // console.log(cookies.get("authorization"));
    await cart.post(`/add/${id}`).then((res) => {
      toast(`Producto agregado al carrito.`, {
        icon: ({ theme, type }) => <BsCartPlusFill size={24} className="fill-green-700" />,
        type: "success",
        containerId: "cart",
      });
      // await axios.post(`${baseUrl}add/${id}`, { withCredentials: true }).then((res) => {
      console.log(res.data);
      // console.log(res.data.msg);
      setCart(res.data.cart);
      // console.log(cookies.get("userSession"));
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteFromCart = async (id, setCart) => {
  try {
    await cart.put(`/delete-item/${id}`).then((res) => {
      toast(`Producto eliminado del carrito.`, {
        icon: ({ theme, type }) => <BsCartDashFill size={24} className="fill-red-700" />,
        type: "error",
        containerId: "cart",
      });
      console.log(res.data);
      setCart(res.data.cart);
      // console.log(cookies.get("userSession"));
    });
  } catch (error) {
    console.log(error);
  }
};
const deleteAllItems = async (id, setCart) => {
  try {
    await cart.delete(`/delete-all-items/${id}`).then((res) => {
      toast(`Productos eliminados del carrito.`, {
        icon: ({ theme, type }) => <BsCartDashFill size={24} className="fill-red-700" />,
        type: "error",
        containerId: "cart",
      });
      console.log(res.data);
      setCart(res.data.cart);
      // console.log(cookies.get("userSession"));
    });
  } catch (error) {
    console.log(error);
  }
};
const clearCart = async (setCart) => {
  try {
    await cart.delete(`/clear`).then((res) => {
      toast(`Carrito vaciado.`, {
        icon: ({ theme, type }) => <BsCartXFill size={24} className="fill-red-800" />,
        type: "error",
        containerId: "cart",
      });
      console.log(res.data);
      setCart(res.data.cart);
      // console.log(cookies.get("userSession"));
    });
  } catch (error) {
    console.log(error);
  }
};

export default { getCart, addToCart, deleteFromCart, deleteAllItems, clearCart };
