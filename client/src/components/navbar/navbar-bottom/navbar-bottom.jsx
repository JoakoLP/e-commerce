import React from "react";
import { Button } from "@material-tailwind/react";
import { HiBars3 } from "react-icons/hi2";

const NavBottom = ({ setMenuIsOpen }) => {
  return (
    <div className="md:p-1 md:px-2 bg-white/5">
      <Button size="sm" className="hidden px-2 py-1 font-bold bg-blue-600 md:flex" onClick={() => setMenuIsOpen(true)}>
        <HiBars3 size={24} className="text-white" />
        {/* <span className="font-bold">Menú</span> */}
      </Button>
    </div>
  );
};

export default NavBottom;
