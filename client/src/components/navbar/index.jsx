import React from "react";
import NavBottom from "./navbar-bottom/navbar-bottom";
import NavTop from "./navbar-top/navbar-top";

const NavBar = ({ setMenuIsOpen, setCartIsOpen, setMenuMobileIsOpen, menuMobileIsOpen }) => {
  return (
    <header className="flex flex-col text-white bg-cyan-950 h-min">
      <NavTop setCartIsOpen={setCartIsOpen} setMenuMobileIsOpen={setMenuMobileIsOpen} menuMobileIsOpen={menuMobileIsOpen} />
      <NavBottom setMenuIsOpen={setMenuIsOpen} />
      {/* <div>Categories</div> */}
    </header>
  );
};

export default NavBar;
