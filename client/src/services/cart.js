import axios from "axios";
import Cookies from "universal-cookie";
// import { toast } from "react-toastify";

axios.defaults.withCredentials = false;
const cookies = new Cookies();
const SERVER_URL = "https://e-commerce-api.joaquintakara.com";

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
  console.log("a");
  const msgTxt = (
    <div className="text-[rgb(196,36,255,0.8)]">
      <b className="text-white">{name}</b> agregado al carrito!
    </div>
  );
  // toast.success(msgTxt, {
  //   position: "bottom-right",
  //   autoClose: 1000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: false,
  //   draggable: true,
  //   draggablePercent: 30,
  //   progress: undefined,
  //   theme: "dark",
  // });
  console.log(`Producto de id "${id}" agregado al carrito.`);
  try {
    // console.log(cookies.get("userSession"));
    // console.log(cookies.get("authorization"));
    await cart.post(`/add/${id}`).then((res) => {
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
      console.log(res.data);
      setCart(res.data.cart);
      // console.log(cookies.get("userSession"));
    });
  } catch (error) {
    console.log(error);
  }
};

export default { getCart, addToCart, deleteFromCart, deleteAllItems, clearCart };
