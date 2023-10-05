import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../../../assets/img/logo.png";

const Logo = () => {
  return (
    <div className="flex">
      <a href="/">
        <img className="rounded w-14 " src={logoImg} alt="" />
      </a>
    </div>
  );
};

export default Logo;
