import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../../../assets/img/logo.png";

const Logo = () => {
  return (
    <div className="flex">
      <a href="/">
        {/* <img className="w-20" src={logoImg} alt="" /> */}
        <p>E-Commerce</p>
      </a>
    </div>
  );
};

export default Logo;
