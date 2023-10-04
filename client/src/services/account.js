import axios from "axios";
import Cookies from "universal-cookie";

axios.defaults.withCredentials = false;
const cookies = new Cookies();

const account = axios.create({
  withCredentials: true,
  baseURL: "https://e-commerce-server-psi.vercel.app/api/account/",
  // baseURL: "http://localhost:8080/api/account/",
  headers: { Authorization: `${cookies.get("authorization")}`, "Access-Control-Allow-Origin": "*" },
});

const login = async (credentials) => {
  try {
    await account.post(`/login`, { ...credentials }, { withCredentials: true }).then((res) => {
      // window.location.reload(false);
      console.log(res.data);
      const data = res.data;
      if (data.user) {
        // cookies.set("authorization", data.token, credentials.remember ? {} : { maxAge: 60000 });
        // cookies.set("userSession", data.user, credentials.remember ? {} : { maxAge: 60000 });
      }
      // console.log({ userSession: { ...cookies.get("userSession") } });
    });
  } catch (error) {
    console.log(error);

    // console.log(error.response.data);
  }
};

const register = async (credentials) => {
  try {
    console.log(credentials);
    await account.post(`/register`, { ...credentials }, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }).then((res) => {
      // console.log(res);
      console.log(res.data.user);
      // console.log({ userSession: { ...cookies.get("userSession") } });
      window.location.reload(false);
    });
  } catch (error) {
    console.log(error);
  }
};

const logout = () => {
  try {
    account.delete(`/logout`, { withCredentials: true }).then((res) => {
      window.location.reload(false);
      console.log(res.data);
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

const unregister = async (credentials) => {
  try {
    console.log(credentials);
    await account.delete(`/unregister`, { withCredentials: true }).then((res) => {
      console.log(res.data);
      logout();
    });
  } catch (error) {
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
    console.log(error);
  }
};

const userGet = async (setUser) => {
  try {
    await account.get("/userGet", { withCredentials: true, headers: { Authorization: `${cookies.get("authorization")}` } }).then((res) => {
      if (setUser) {
        console.log(res.data);
        setUser(res.data);
      } else {
        return res.data;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export default { login, register, logout, unregister, userList, userGet };
