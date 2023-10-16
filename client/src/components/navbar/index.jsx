import React from "react";
import NavBottom from "./navbar-bottom/navbar-bottom";
import NavTop from "./navbar-top/navbar-top";

const NavBar = ({ setMenuIsOpen, setCartIsOpen, setMenuMobileIsOpen }) => {
  return (
    <header className="flex flex-col text-white bg-cyan-950 h-min">
      <NavTop setCartIsOpen={setCartIsOpen} setMenuMobileIsOpen={setMenuMobileIsOpen} />
      <NavBottom setMenuIsOpen={setMenuIsOpen} />
      {/* <div>Categories</div> */}
    </header>
  );
};

export default NavBar;
