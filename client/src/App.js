import "./App.css";
import "flowbite";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AccountProvider from "./contexts/AccountProvider";
import CartProvider from "./contexts/CartProvider";
import NavBar from "./components/navbar/index";
import MenuDrawer from "./components/navbar/drawers/menuDrawer";
import CartDrawer from "./components/navbar/drawers/cartDrawer";
import Pages from "./pages/Pages";
import Footer from "./components/footer";
import AccountComps from "./components/main/Account/AccountComps";
import SessionComps from "./components/main/Session/SessionComps";
import AdminComps from "./components/main/Admin/AdminComps";
import CartButton from "./components/cart/cartButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [categIsOpen, setCategIsOpen] = useState(false);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  return (
    <BrowserRouter>
      <AccountProvider>
        <CartProvider>
          <div className="">
            <NavBar setCategIsOpen={setCategIsOpen} setCartIsOpen={setCartIsOpen} />
            <MenuDrawer categIsOpen={categIsOpen} setCategIsOpen={setCategIsOpen} />
            <CartDrawer cartIsOpen={cartIsOpen} setCartIsOpen={setCartIsOpen} />
            <CartButton cartIsOpen={cartIsOpen} setCartIsOpen={setCartIsOpen} />

            <div className="min-h-[90vh] bg-gray-200">
              <Routes>
                <Route path="/" element={<Pages.Default />} />
                <Route path="/search" element={<Pages.Search />} />
                <Route path="/account" element={<AccountComps.UserCheck />}>
                  <Route index element={<AccountComps.Index />} />
                  <Route path="my-profile" element={<AccountComps.Account />} />
                  <Route path="" element="" />
                </Route>
                <Route path="/session" element={<SessionComps.UserCheck />}>
                  <Route path="login" element={<SessionComps.Login />} />
                  <Route path="register" element={<SessionComps.Register />} />
                </Route>
                <Route path="/admin" element={<AdminComps.AdminBreadcrumb />}>
                  <Route index element={<AdminComps.Index />} />
                  <Route path="products">
                    <Route index element={<AdminComps.Products />} />
                    <Route path="editlist" element={<AdminComps.EditList />} />
                    <Route path="add-product" element={<AdminComps.AddProduct />} />
                  </Route>
                  <Route path="userList" element={<AdminComps.UserList />} />
                  <Route path="category">
                    <Route index element={<AdminComps.CategoryComps.CategoryIndex />} />
                    <Route path="categories" element={<AdminComps.CategoryComps.Categories />} />
                    <Route path="subCategories" element={<AdminComps.CategoryComps.SubCategories />} />
                  </Route>
                  <Route path="userLista" element={<></>} />
                </Route>
              </Routes>
            </div>
            <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} enableMultiContainer containerId={"session"} />
            <ToastContainer position={toast.POSITION.BOTTOM_LEFT} newestOnTop={true} className="max-h-[50%]" autoClose={1000} enableMultiContainer containerId={"cart"} />
            <Footer />
          </div>
        </CartProvider>
      </AccountProvider>
    </BrowserRouter>
  );
}

export default App;
