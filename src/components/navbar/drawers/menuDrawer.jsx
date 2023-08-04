import { Button } from "flowbite-react";
import React from "react";
import { List, XLg } from "react-bootstrap-icons";
import { useDisableBodyScroll } from "../../useDisableBodySroll";
import SidebarCategories from "../navbar-bottom/sidebarCategories";
// import SidebarCategories from "../../../assets/img/logo.png";
import iconpng from "../../../assets/favicon.ico";

export default function CategDrawer({ children, categIsOpen, setCategIsOpen }) {
  useDisableBodyScroll(categIsOpen);
  return (
    <div
      className={
        " fixed overflow-hidden bg-gray-900 z-10 inset-0 transform ease-in-out " +
        (categIsOpen ? " transition-opacity opacity-100 duration-500 bg-opacity-25 translate-x-0 " : " transition-all opacity-0 bg-opacity-0 delay-500 -translate-x-full  ")
      }
    >
      <section
        className={
          " w-fit max-w-lg left-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " + (categIsOpen ? " translate-x-0 " : " -translate-x-full ")
        }
      >
        <article className="relative flex flex-col h-full max-w-lg pb-10 space-y-6 overflow-y-auto w-fit">
          <header className="flex items-center justify-center p-5 space-x-2 text-lg font-bold ">
            {/* <List size={24} /> */}
            <img src={iconpng} alt="Icon" className="aspect-auto h-7" />
            <span>MENU</span>
            <Button
              gradientMonochrome="info"
              outline={true}
              size="xs"
              className="absolute left-0 top-4"
              onClick={() => {
                setCategIsOpen(false);
              }}
            >
              <div className="py-1">
                <XLg size={15} />
              </div>
            </Button>
          </header>
          <SidebarCategories setCategIsOpen={setCategIsOpen} />
          {/* {children} */}
        </article>
      </section>
      <section
        className="w-screen h-full"
        onClick={() => {
          setCategIsOpen(false);
        }}
      ></section>
    </div>
  );
}
