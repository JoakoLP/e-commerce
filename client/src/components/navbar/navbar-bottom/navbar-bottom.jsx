import React from "react";
import { Button } from "@material-tailwind/react";
import { HiBars3 } from "react-icons/hi2";

const NavBottom = ({ setCategIsOpen }) => {
  return (
    <div className="p-1 px-2 bg-white/5">
      <Button size="sm" className="flex px-2 py-1 font-bold bg-blue-600" onClick={() => setCategIsOpen(true)}>
        <HiBars3 size={24} className="text-white" />
        {/* <span className="font-bold">Menú</span> */}
      </Button>
    </div>
  );
};

export default NavBottom;
