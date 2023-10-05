import React from "react";
import logoImg from "../../assets/img/logo.png";

const Footer = () => {
  return (
    <footer className=" text-white bg-cyan-950 min-h-[10vh] flex flex-col flex-wrap w-full p-2 sm:p-5 sm:flex-row lg:flex-nowrap items-center justify-evenly columns-4">
      <div className="">
        <img src={logoImg} alt="" className="w-16 aspect-square" />
      </div>
      <div className="flex">
        <div className="grid h-full grid-cols-2">
          <p>Desarrollador:</p>
          <p>Joaquin Takara</p>
          <p>LinkedIn:</p>
          <a href="https://www.linkedin.com/in/joaquintakara/" target="_blank" className="lg:hover:text-blue-500">
            https://www.linkedin.com/in/joaquintakara/
          </a>
          <p>GitHub:</p>
          <a href="https://github.com/JoakoLP" target="_blank" className="lg:hover:text-blue-500">
            https://github.com/JoakoLP
          </a>
          <p>Email:</p>
          <a href="mailto:joakotakara@gmail.com" target="_blank" className="lg:hover:text-blue-500">
            joakotakara@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
