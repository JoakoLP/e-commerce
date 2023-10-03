import { List } from "react-bootstrap-icons";
import React from "react";
import { Button } from "flowbite-react";

const NavBottom = ({ setCategIsOpen }) => {
  return (
    <div className="p-1 px-2 bg-white/5">
      <Button gradientDuoTone="purpleToBlue" size="xs" className="flex font-bold bg-cyan-600" onClick={() => setCategIsOpen(true)}>
        <List size={20} />
        {/* <span className="font-bold">Menú</span> */}
      </Button>
    </div>
  );
};

export default NavBottom;
