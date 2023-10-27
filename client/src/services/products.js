import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const SERVER_URL = "https://e-commerce-api.joaquintakara.com";
// const SERVER_URL = "http://localhost:8080";

const products = axios.create({
  withCredentials: true,
  baseURL: `${SERVER_URL}/api/products/`,
  // baseURL: "http://localhost:8080/api/products/",
  headers: { Authorization: `${cookies.get("authorization")}`, "Access-Control-Allow-Origin": "*" },
});

const productAdd = async (product) => {
  try {
    const credentials = { ...product };
    console.log(credentials);
    await products.post(`/add`, { ...credentials }, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }).then((res) => {
      console.log(res.data);
      window.location.reload(false);
    });
  } catch (error) {
    console.log(error);
  }
};

const productGet = async (setProductList) => {
  try {
    await products.get("/get").then((res) => {
      // console.log(res.data);
      // console.log(cookies.get("productList"));
      if (setProductList) {
        if (Array.isArray(res.data)) {
          setProductList(res.data);
        } else {
          console.log("Sin resultados, productGet");
          // console.log(typeof res.data);
          console.log(res.data);
        }
      } else return res.data;
    });
  } catch (error) {
    console.log(error);
  }
};

const productEdit = async (product, _id) => {
  try {
    await products.put("/edit", { product, _id }, { headers: { "Content-Type": "multipart/form-data" } }).then((res) => {
      console.log(res.data);
      window.location.reload(false);
    });
  } catch (error) {
    console.log(error);
  }
};

const productDel = async (_id) => {
  // console.log(_id);
  try {
    await products.delete(`/delete/${_id}`).then((res) => {
      console.log(res.data);
      window.location.reload(false);
    });
  } catch (error) {
    console.log(error);
  }
};

const productSearch = async (search, ctg, sctg, setProducts) => {
  try {
    await products.get(`/search?srch=${search}&ctg=${ctg}&sctg=${sctg}`).then((res) => {
      console.log(res.data);
      if (Array.isArray(res.data)) {
        setProducts(res.data);
      } else {
        console.log("Sin resultados, productSearch");
        // console.log(typeof res.data);
        console.log(res.data);
      }
      return res.data;
    });
  } catch (error) {
    console.log(error);
  }
};

export default { productAdd, productGet, productEdit, productSearch, productDel };
