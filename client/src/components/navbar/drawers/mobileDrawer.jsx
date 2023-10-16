import { Button, Drawer } from "@material-tailwind/react";
import { XLg } from "react-bootstrap-icons";
import iconpng from "../../../assets/favicon.ico";
import SidebarCategories from "../navbar-bottom/sidebarCategories";
import { useDisableBodyScroll } from "../../useDisableBodySroll";

export default function MobileDrawer({ menuMobileIsOpen, setMenuMobileIsOpen }) {
  useDisableBodyScroll(menuMobileIsOpen);
  return (
    <Drawer
      placement="top"
      // size={400}
      open={menuMobileIsOpen}
      onClose={() => {
        setMenuMobileIsOpen(false);
      }}
      className="p-4 !min-h-fit !h-min !max-h-fit"
    >
      <section className={" w-full h-full "}>
        <article className="flex flex-col items-center w-full h-full max-w-lg space-y-6">
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
                setMenuMobileIsOpen(false);
              }}
            >
              <div className="">
                <XLg size={15} />
              </div>
            </Button>
          </header>
          <SidebarCategories setMenuMobileIsOpen={setMenuMobileIsOpen} menuMobileIsOpen={menuMobileIsOpen} />
          {/* {children} */}
        </article>
      </section>
    </Drawer>
  );
}
