import React from "react";
import Logo from "./logo";
import NavSearch from "./navbar-top-center/search";
import UserSect from "./navbar-top-right/userSect";

const NavTop = ({ setCartIsOpen }) => {
  return (
    <div className="flex items-center justify-around p-2 ">
      <Logo />
      <NavSearch />
      <UserSect setCartIsOpen={setCartIsOpen} />
    </div>
  );
};

export default NavTop;
