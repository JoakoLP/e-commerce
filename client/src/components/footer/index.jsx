import React from "react";

const Footer = () => {
  const nameClass = "w-min";
  const linkClass = "lg:hover:text-blue-500";

  return (
    <footer className=" text-white bg-cyan-950 min-h-[10vh] flex flex-col flex-wrap w-full p-2 sm:p-5 sm:flex-row lg:flex-nowrap items-center justify-evenly columns-4">
      <div className="flex flex-col items-center lg:3/5 xl:2/4">
        <div className="md:hidden grid grid-cols-[120px_130px] text-lg">
          <p className={nameClass}>Desarrollador:</p>
          <p className="">Joaquin Takara</p>
        </div>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <div>
            <p className="hidden md:block text-end">Desarrollador:</p>
            <div className="grid grid-cols-[80px_240px] h-min">
              <p className={nameClass}>Portfolio:</p>
              <a href="https://www.joaquintakara.com/" target="_blank" className={linkClass}>
                https://www.joaquintakara.com/
              </a>
              <p className={nameClass}>Email:</p>
              <a href="mailto:joakotakara@gmail.com" target="_blank" className={linkClass}>
                joakotakara@gmail.com
              </a>
            </div>
          </div>

          <div>
            <p className="hidden md:block">Joaquin Takara</p>
            <div className="grid grid-cols-[70px_310px] h-min">
              <p className={nameClass}>LinkedIn:</p>
              <a href="https://www.linkedin.com/in/joaquintakara/" target="_blank" className={linkClass}>
                https://www.linkedin.com/in/joaquintakara/
              </a>
              <p className={nameClass}>GitHub:</p>
              <a href="https://github.com/JoakoLP" target="_blank" className={linkClass}>
                https://github.com/JoakoLP
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
