import { Sidebar } from "flowbite-react";
import React from "react";
import {
  ChartPieIcon,
  ShoppingBagIcon,
  InboxIcon,
  UserIcon,
  ArrowSmallRightIcon,
  TableCellsIcon,
  ArrowRightOnRectangleIcon,
  AdjustmentsHorizontalIcon,
  UserGroupIcon,
  Bars3Icon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { AccountContext } from "../../../contexts/AccountProvider";
import { useContext } from "react";

import accountService from "../../../services/account";

const SidebarCategories = ({ setCategIsOpen }) => {
  const [user, setUser] = useContext(AccountContext);
  const handleClick = () => {
    setCategIsOpen(false);
  };
  return (
    <div className="text-left w-fit">
      {user ? <p className="px-4 text-gray-600">Hola {user.username}</p> : <></>}
      <Sidebar aria-label="Sidebar with multi-level dropdown example">
        {/* <Sidebar.Logo href="/" img="favicon.ico" imgAlt="E-Commerce">
          E-Commerce
        </Sidebar.Logo> */}

        <Sidebar.Items>
          <Sidebar.ItemGroup>
            {/* <Sidebar.Item href="#" icon={ChartPieIcon} onClick={handleClick}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={InboxIcon} onClick={handleClick}>
              Inbox
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={ShoppingBagIcon} onClick={handleClick}>
              Products
            </Sidebar.Item> */}
            {user ? (
              <>
                <Sidebar.Item href="/account" icon={UserIcon} onClick={handleClick}>
                  Mi Cuenta
                </Sidebar.Item>
                <Sidebar.Item
                  href="#"
                  icon={ArrowRightOnRectangleIcon}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick();
                    accountService.logout();
                  }}
                >
                  Salir
                </Sidebar.Item>
              </>
            ) : (
              <>
                <Sidebar.Item href="/session/login" icon={ArrowSmallRightIcon} onClick={handleClick}>
                  Sign In
                </Sidebar.Item>
                <Sidebar.Item href="/session/register" icon={TableCellsIcon} onClick={handleClick}>
                  Sign Up
                </Sidebar.Item>
              </>
            )}
            {user?.isAdmin ? (
              <div className="flex flex-col items-center justify-center p-4 rounded shadow-inner shadow-gray-400">
                <p className="font-bold text-center">ADMIN</p>
                <Sidebar.Item href="/admin" icon={AdjustmentsHorizontalIcon} onClick={handleClick} className="lg:hover:bg-gray-200 lg:hover:bg-opacity-75">
                  <p className="font-semibold">Panel de control</p>
                </Sidebar.Item>
                <Sidebar.Item href="/admin/userList" icon={UserGroupIcon} onClick={handleClick} className="lg:hover:bg-gray-200 lg:hover:bg-opacity-75">
                  <p className="font-semibold">Usuarios</p>
                </Sidebar.Item>
                <Sidebar.Item href="/admin/category" icon={Bars3Icon} onClick={handleClick} className="lg:hover:bg-gray-200 lg:hover:bg-opacity-75">
                  <p className="font-semibold">Categorías</p>
                </Sidebar.Item>
                <Sidebar.Item href="/admin/products" icon={Squares2X2Icon} onClick={handleClick} className="lg:hover:bg-gray-200 lg:hover:bg-opacity-75">
                  <p className="font-semibold">Productos</p>
                </Sidebar.Item>
              </div>
            ) : (
              <></>
            )}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default SidebarCategories;
