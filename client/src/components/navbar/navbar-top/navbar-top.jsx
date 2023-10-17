import React from "react";
import Logo from "./logo";
import NavSearch from "./navbar-top-center/search";
import UserSect from "./navbar-top-right/userSect";
import { Button } from "@material-tailwind/react";
import MobileSearch from "./navbar-top-center/mobileSearch";

const NavTop = ({ setCartIsOpen, setMenuMobileIsOpen, menuMobileIsOpen }) => {
  return (
    <div className="flex items-center justify-around p-1 space-x-2 md:p-2 md:space-x-0 ">
      <Logo />
      <NavSearch />

      <MobileSearch />

      <Button size="sm" className="px-2 py-1 font-bold bg-blue-600 rounded md:hidden " onClick={() => setMenuMobileIsOpen(!menuMobileIsOpen)}>
        <div className={`w-4 h-4 flex flex-col justify-center items-center ${menuMobileIsOpen ? "" : "space-y-1"}`}>
          <div className={`w-4 h-[1px] bg-white transition-transform duration-200 ${menuMobileIsOpen ? "h-0.5 translate-y-[100%] -rotate-45" : "h-1"}`}></div>
          <div className={`w-4 h-[1px] bg-white transition-transform duration-200 ${menuMobileIsOpen ? "h-0.5 rotate-45" : "h-1"}`}></div>
          <div className={`w-4 h-[1px] bg-white transition-transform duration-200 ${menuMobileIsOpen ? "h-0.5 -translate-y-[100%] -rotate-45" : "h-1"}`}></div>
        </div>
      </Button>

      <UserSect setCartIsOpen={setCartIsOpen} menuMobileIsOpen={menuMobileIsOpen} />
    </div>
  );
};

export default NavTop;
