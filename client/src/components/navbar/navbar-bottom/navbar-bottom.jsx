import React from "react";
import { Button } from "@material-tailwind/react";
import { FiMenu } from "react-icons/fi";

const NavBottom = ({ setMenuIsOpen }) => {
  return (
    <div className="md:p-1 md:px-2 bg-white/5">
      <Button size="sm" className="hidden px-2 py-1 font-bold bg-blue-600 rounded md:flex" onClick={() => setMenuIsOpen(true)}>
        <FiMenu size={25} className="text-white" />
      </Button>
    </div>
  );
};

export default NavBottom;
