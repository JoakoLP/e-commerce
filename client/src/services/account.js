import axios from "axios";
import { HiArrowRightOnRectangle, HiOutlineArrowLeftOnRectangle, HiOutlineUserMinus, HiOutlineUserPlus } from "react-icons/hi2";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

axios.defaults.withCredentials = false;
const cookies = new Cookies();
const SERVER_URL = "https://e-commerce-api.joaquintakara.com";
// const SERVER_URL = "http://localhost:8080";

const account = axios.create({
  withCredentials: true,
  baseURL: `${SERVER_URL}/api/account/`,
  // baseURL: "http://localhost:8080/api/account/",
  // headers: { "Access-Control-Allow-Headers": "authorization", "Access-Control-Allow-Origin": "*" },
  // headers: { Authorization: `${cookies.get("authorization")}`, "Access-Control-Allow-Headers": "authorization" },
  headers: { Authorization: `${cookies.get("authorization")}` },
});

const login = async (credentials) => {
  try {
    toast("Iniciando sesión...", { toastId: "login", containerId: "session", autoClose: 5000, type: "default", isLoading: true });
    toast.update("login", { render: "Iniciando sesión...", containerId: "session", autoClose: 5000, type: "default", isLoading: true });
    await account.post(`/login`, { ...credentials }).then((res) => {
      console.log(res.data);
      const data = res.data;
      if (data.user) {
        toast.update("login", {
          icon: ({ theme, type }) => <HiOutlineArrowLeftOnRectangle size={24} />,
          render: `Sesión iniciada${data?.user?.isAdmin ? " como administrador" : ""}!`,
          type: "success",
          containerId: "session",
          autoClose: 1000,
          isLoading: false,
        });
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      }
    });
  } catch (error) {
    toast.update("login", { render: error?.response?.data, type: "error", containerId: "session", autoClose: 2000, isLoading: false });

    console.log(error);

    // console.log(error.response.data);
  }
};

const register = async (credentials) => {
  try {
    toast("Registrando usuario...", { toastId: "register", containerId: "session", autoClose: 5000, type: "default", isLoading: true });
    toast.update("register", { render: "Registrando usuario...", containerId: "session", autoClose: 5000, type: "default", isLoading: true });
    console.log(credentials);
    await account.post(`/register`, { ...credentials }, { headers: { "Content-Type": "multipart/form-data" } }).then((res) => {
      toast.update("register", {
        icon: ({ theme, type }) => <HiOutlineUserPlus size={24} />,
        render: "Usuario registrado correctamente.",
        containerId: "session",
        autoClose: 1000,
        type: "success",
        isLoading: false,
      });
      setTimeout(() => {
        window.location.reload(false);
      }, 1000);
      // console.log(res);
      console.log(res.data.user);
      // console.log({ userSession: { ...cookies.get("userSession") } });
    });
  } catch (error) {
    toast.update("register", { render: error?.response?.data, type: "error", containerId: "session", autoClose: 2000, isLoading: false });
    console.log(error);
  }
};

const logout = async (unregister) => {
  try {
    if (!unregister) {
      toast("Cerrando sesión...", { toastId: "logout", containerId: "session", autoClose: 5000, type: "default", isLoading: true });
      toast.update("logout", { render: "Cerrando sesión...", containerId: "session", autoClose: 5000, type: "default", isLoading: true });
    }
    await account.delete(`/logout`).then((res) => {
      if (!unregister) {
        toast.update("logout", {
          icon: ({ theme, type }) => <HiArrowRightOnRectangle size={24} />,
          render: "Sesión cerrada!",
          type: "success",
          containerId: "session",
          autoClose: 1000,
          isLoading: false,
        });
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      } else {
        window.location.reload(false);
      }
      console.log(res.data);
    });
  } catch (error) {
    toast.update("logout", { render: error?.response?.data, type: "error", containerId: "session", autoClose: 2000, isLoading: false });
    console.log(error.response.data);
  }
};

const unregister = async (credentials) => {
  try {
    toast("Eliminando cuenta...", { toastId: "unregister", containerId: "session", autoClose: 5000, type: "default", isLoading: true });
    toast.update("unregister", { render: "Eliminando cuenta...", containerId: "session", autoClose: 5000, type: "default", isLoading: true });
    console.log(credentials);
    await account.delete(`/unregister`).then((res) => {
      toast.update("unregister", {
        icon: ({ theme, type }) => <HiOutlineUserMinus className="text-red-400" size={24} />,
        render: "Cuenta elminada!",
        type: "success",
        containerId: "session",
        autoClose: 1000,
        isLoading: false,
      });
      console.log(res.data);
      setTimeout(() => {
        const unregister = true;
        logout(unregister);
      }, 1000);
    });
  } catch (error) {
    toast.update("unregister", { render: error?.response?.data, type: "error", containerId: "session", autoClose: 2000, isLoading: false });
    console.log(error.response.data);
  }
};

const userList = async (setUserList) => {
  try {
    await account.get("/userList").then((res) => {
      if (setUserList) {
        if (Array.isArray(res.data)) {
          setUserList(res.data);
        } else {
          console.log("Sin resultados, userList");
          // console.log(typeof res.data);
          console.log(res.data);
        }
      } else return res.data;
      // console.log(res.data);
    });
  } catch (error) {
    toast(error?.response?.data, { type: "error", containerId: "session", autoClose: 5000, isLoading: false });
    console.log(error);
  }
};

const userGet = async (setUser) => {
  try {
    // console.log("token", cookies.get("authorization"));
    await account.get("/userGet").then((res) => {
      if (setUser) {
        console.log("postGet", res.data);
        if (res.data.username) {
          setUser(res.data);
        }
      } else {
        return res.data;
      }
    });
  } catch (error) {
    toast(error?.response?.data, { type: "error", containerId: "session", autoClose: 5000, isLoading: false });
    console.log(error);
  }
};

const lastSeen = () => {
  try {
    account.put("/lastSeen").then((res) => {
      console.log(res.data);
    });
  } catch (error) {
    console.log(error);
  }
};

export default { login, register, logout, unregister, userList, userGet, lastSeen };
