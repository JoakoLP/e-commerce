import React from "react";
import logoImg from "../../assets/img/logo.png";

const Footer = () => {
  return (
    <footer className="w-full  text-white bg-cyan-950 h-[10vh] flex justify-center">
      <div className="flex flex-col flex-wrap p-2 sm:p-5 sm:flex-row lg:flex-nowrap sm:justify-center justify-evenly columns-4">
        <div className="flex justify-center w-auto">
          <img src={logoImg} alt="" className="w-20 aspect-auto" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
