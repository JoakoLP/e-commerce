import axios from "axios";
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
    toast("Iniciando sesión...", { toastId: "login", autoClose: 5000, type: "default", isLoading: true });
    toast.update("login", { render: "Iniciando sesión...", autoClose: 5000, type: "default", isLoading: true });
    await account.post(`/login`, { ...credentials }).then((res) => {
      console.log(res.data);
      const data = res.data;
      if (data.user) {
        toast.update("login", { render: `Sesión iniciada${data?.user?.isAdmin ? " como administrador" : ""}!`, type: "success", autoClose: 1500, isLoading: false });
        setTimeout(() => {
          window.location.reload(false);
        }, 1500);
      }
    });
  } catch (error) {
    toast.update("login", { render: error?.response?.data, type: "error", autoClose: 5000, isLoading: false });

    console.log(error);

    // console.log(error.response.data);
  }
};

const register = async (credentials) => {
  try {
    toast("Registrando usuario...", { toastId: "register", autoClose: 5000, type: "default", isLoading: true });
    toast.update("register", { render: "Registrando usuario...", autoClose: 5000, type: "default", isLoading: true });
    console.log(credentials);
    await account.post(`/register`, { ...credentials }, { headers: { "Content-Type": "multipart/form-data" } }).then((res) => {
      toast.update("register", { render: "Usuario registrado correctamente.", autoClose: 1500, type: "success", isLoading: false });
      setTimeout(() => {
        window.location.reload(false);
      }, 1500);
      // console.log(res);
      console.log(res.data.user);
      // console.log({ userSession: { ...cookies.get("userSession") } });
    });
  } catch (error) {
    toast.update("register", { render: error?.response?.data, type: "error", autoClose: 5000, isLoading: false });
    console.log(error);
  }
};

const logout = async () => {
  try {
    toast("Cerrando sesión...", { toastId: "logout", autoClose: 5000, type: "default", isLoading: true });
    toast.update("logout", { render: "Cerrando sesión...", autoClose: 5000, type: "default", isLoading: true });
    await account.delete(`/logout`).then((res) => {
      toast.update("logout", { render: "Sesión cerrada!", type: "success", autoClose: 1500, isLoading: false });
      setTimeout(() => {
        window.location.reload(false);
      }, 1500);
      console.log(res.data);
    });
  } catch (error) {
    toast.update("logout", { render: error?.response?.data, type: "error", autoClose: 5000, isLoading: false });
    console.log(error.response.data);
  }
};

const unregister = async (credentials) => {
  try {
    toast("Eliminando cuenta...", { toastId: "unregister", autoClose: 5000, type: "default", isLoading: true });
    toast.update("unregister", { render: "Eliminando cuenta...", autoClose: 5000, type: "default", isLoading: true });
    console.log(credentials);
    await account.delete(`/unregister`).then((res) => {
      toast.update("unregister", { render: "Cuenta elminada!", type: "success", autoClose: 1500, isLoading: false });
      console.log(res.data);
      logout();
    });
  } catch (error) {
    toast.update("unregister", { render: error?.response?.data, type: "error", autoClose: 5000, isLoading: false });
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
    toast(error?.response?.data, { type: "error", autoClose: 5000, isLoading: false });
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
    toast(error?.response?.data, { type: "error", autoClose: 5000, isLoading: false });
    console.log(error);
  }
};

export default { login, register, logout, unregister, userList, userGet };
