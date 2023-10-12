import React from "react";
import { List, XLg } from "react-bootstrap-icons";
import { useDisableBodyScroll } from "../../useDisableBodySroll";
import SidebarCategories from "../navbar-bottom/sidebarCategories";
// import SidebarCategories from "../../../assets/img/logo.png";
import iconpng from "../../../assets/favicon.ico";
import { Button, Drawer } from "@material-tailwind/react";

export default function CategDrawer({ categIsOpen, setCategIsOpen }) {
  useDisableBodyScroll(categIsOpen);
  return (
    <Drawer
      open={categIsOpen}
      onClose={() => {
        setCategIsOpen(false);
      }}
      className="p-4"
    >
      <section className={" w-full max-w-lg  h-full "}>
        <article className="flex flex-col items-center w-full h-full max-w-lg pb-10 space-y-6">
          <header className="relative flex items-center justify-center w-full text-lg font-bold ">
            {/* <List size={24} /> */}
            <div className="flex items-center justify-center space-x-2 ">
              <img src={iconpng} alt="Icon" className="aspect-auto h-7" />
              <span>MENU</span>
            </div>
            <Button
              variant="text"
              className="!absolute right-0 p-2 -translate-y-1/2 top-1/2"
              onClick={() => {
                setCategIsOpen(false);
              }}
            >
              <div className="">
                <XLg size={15} />
              </div>
            </Button>
          </header>
          <SidebarCategories setCategIsOpen={setCategIsOpen} />
          {/* {children} */}
        </article>
      </section>
    </Drawer>
  );
}
