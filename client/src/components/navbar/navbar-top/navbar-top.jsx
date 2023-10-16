import React from "react";
import Logo from "./logo";
import NavSearch from "./navbar-top-center/search";
import UserSect from "./navbar-top-right/userSect";
import { HiBars3 } from "react-icons/hi2";
import { Button } from "flowbite-react";

const NavTop = ({ setCartIsOpen, setMenuMobileIsOpen }) => {
  return (
    <div className="flex items-center justify-around p-2 ">
      <Logo />
      <NavSearch />

      {/* <MobileSearch /> */}

      <Button size="sm" className="flex px-2 py-1 font-bold bg-blue-600 md:hidden" onClick={() => setMenuMobileIsOpen(true)}>
        <HiBars3 size={24} className="text-white" />
        {/* <span className="font-bold">Menú</span> */}
      </Button>

      <UserSect setCartIsOpen={setCartIsOpen} />
    </div>
  );
};

export default NavTop;
