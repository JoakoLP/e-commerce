import Index from "./index";
import EditList from "./products/editList";
import AddProduct from "./products/addProduct";
import UserList from "./userList/userList";
import CategoryIndex from "./category/categories/categoryIndex";
import Categories from "./category/categories/categories";
import SubCategories from "./category/subCategories/subCategories";
import AdminBreadcrumb from "./breadcrumb";
import Products from "./products/products";

const AdminComps = {
  AdminBreadcrumb,
  Index,
  Products,
  EditList,
  AddProduct,
  UserList,
  CategoryComps: {
    CategoryIndex,
    Categories,
    SubCategories,
  },
};

export default AdminComps;
