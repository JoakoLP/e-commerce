import React from "react";
import NavBottom from "./navbar-bottom/navbar-bottom";
import NavTop from "./navbar-top/navbar-top";

const NavBar = ({ setCategIsOpen, setCartIsOpen }) => {
  return (
    <header className="flex flex-col text-white bg-cyan-950 h-min">
      <NavTop setCartIsOpen={setCartIsOpen} />
      <NavBottom setCategIsOpen={setCategIsOpen} />
      {/* <div>Categories</div> */}
    </header>
  );
};

export default NavBar;
