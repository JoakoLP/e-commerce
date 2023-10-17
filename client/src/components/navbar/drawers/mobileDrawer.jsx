import { Collapse } from "@material-tailwind/react";
import SidebarCategories from "../navbar-bottom/sidebarCategories";
import AccountNavButton from "../navbar-top/navbar-top-right/accountNavButton";

export default function MobileDrawer({ menuMobileIsOpen, setMenuMobileIsOpen }) {
  return (
    <Collapse
      open={menuMobileIsOpen}
      className={`${
        menuMobileIsOpen ? "before:absolute  overflow-visible mb-2 shadow" : " overflow-hidden before:hidden"
      } relative  before:bg-white before:rotate-45 before:-top-1.5 before:z-50 before:right-[48px] before:h-3 before:w-3  shadow-slate-300 bg-white`}
    >
      <section className={`overflow-hidden w-full h-full py-6`}>
        <article className="flex flex-col items-center w-full h-full max-w-lg md:space-y-6">
          <header className="relative flex items-center justify-center w-full text-lg font-bold ">
            <AccountNavButton setMenuMobileIsOpen={setMenuMobileIsOpen} />
          </header>
          <SidebarCategories setMenuMobileIsOpen={setMenuMobileIsOpen} menuMobileIsOpen={menuMobileIsOpen} />
        </article>
      </section>
    </Collapse>
  );
}
