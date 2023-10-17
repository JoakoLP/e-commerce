import React from "react";
import logoImg from "../../../assets/img/logo.png";

const Logo = () => {
  return (
    <div className="flex">
      <a href="/">
        <img className="w-10 rounded md:w-14 " src={logoImg} alt="" />
      </a>
    </div>
  );
};

export default Logo;
