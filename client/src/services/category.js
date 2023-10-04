import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const SERVER_URL = "https://e-commerce-api.joaquintakara.com";

const categories = axios.create({
  withCredentials: true,
  baseURL: `${SERVER_URL}/api/categories/`,
  // baseURL: "http://localhost:8080/api/categories/",
  headers: { Authorization: `${cookies.get("authorization")}` },
});

const subCategories = axios.create({
  withCredentials: true,
  baseURL: `${SERVER_URL}/api/subCategories/`,
  // baseURL: "http://localhost:8080/api/subCategories/",
  headers: { Authorization: `${cookies.get("authorization")}` },
});

// category services
const categoryAdd = async (category) => {
  try {
    const credentials = { ...category };
    await categories.post("/add", { ...credentials }, { withCredentials: true }).then((res) => {
      console.log(res.data);
    });
  } catch (error) {
    console.log(error);
  }
};

const categoryGet = async (setCategoryList) => {
  try {
    await categories.get("/get").then((res) => {
      if (setCategoryList) {
        setCategoryList(res.data);
      } else return res.data;
    });
  } catch (error) {
    console.log(error);
  }
};

const categoryEdit = async (category, _id) => {
  try {
    await categories.put("/edit", { category, _id }).then((res) => {
      console.log(res.data);
    });
  } catch (error) {
    console.log(error);
  }
};

const categoryDel = async (_id) => {
  console.log(_id);
  try {
    await categories.delete(`/delete?id=${_id}`).then((res) => {
      console.log(res.data);
    });
  } catch (error) {
    console.log(error);
  }
};

// subCategory services
const subCategoryAdd = async (subCategory) => {
  try {
    const credentials = { ...subCategory };
    await subCategories.post("/add", { ...credentials }, { withCredentials: true }).then((res) => {
      console.log(res.data);
    });
  } catch (error) {
    console.log(error);
  }
};

const subCategoryGet = async (setSubCategoryList) => {
  try {
    await subCategories.get("/get").then((res) => {
      if (setSubCategoryList) {
        setSubCategoryList(res.data);
      } else return res.data;
    });
  } catch (error) {
    console.log(error);
  }
};

const subCategoryEdit = async (subCategory, _id) => {
  try {
    await subCategories.put("/edit", { subCategory, _id }).then((res) => {
      console.log(res.data);
    });
  } catch (error) {
    console.log(error);
  }
};

const subCategoryDel = async (_id) => {
  console.log(_id);
  try {
    await subCategories.delete(`/delete?id=${_id}`).then((res) => {
      console.log(res.data);
    });
  } catch (error) {
    console.log(error);
  }
};

export default { categoryAdd, categoryGet, categoryEdit, categoryDel, subCategoryAdd, subCategoryGet, subCategoryEdit, subCategoryDel };
