import React, { useState } from "react";
import { AccountContext } from "../../../contexts/AccountProvider";
import { useContext } from "react";
import accountService from "../../../services/account";
import { Accordion, AccordionBody, AccordionHeader, List, ListItem, ListItemPrefix, Typography } from "@material-tailwind/react";
import {
  HiArrowRightOnRectangle,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineBars3,
  HiOutlineChevronDown,
  HiOutlineSquares2X2,
  HiOutlineUser,
  HiOutlineUserGroup,
  HiOutlineUserPlus,
  HiOutlineWrenchScrewdriver,
} from "react-icons/hi2";

const SidebarCategories = ({ setCategIsOpen }) => {
  const [user, setUser] = useContext(AccountContext);
  const handleClick = () => {
    setCategIsOpen(false);
  };

  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <div className="text-left w-fit">
      {user ? <p className="text-gray-600 px-4a">Hola {user.username}</p> : <></>}
      <List>
        {user ? (
          <ListItem onClick={handleClick}>
            <a href="/account" className="flex items-center">
              <ListItemPrefix>
                <HiOutlineUser size={24} />
              </ListItemPrefix>
              Mi Cuenta
            </a>
          </ListItem>
        ) : (
          <></>
        )}

        {user?.isAdmin ? (
          <Accordion open={open === 1} icon={<HiOutlineChevronDown className={`${open === 1 ? "rotate-180" : ""} transition-transform`} />}>
            <ListItem className="p-0" selected={open === 1}>
              <AccordionHeader
                className="p-3 border-b-0"
                onClick={() => {
                  handleOpen(1);
                }}
              >
                <ListItemPrefix>
                  <HiOutlineWrenchScrewdriver className=" text-cyan-700" />
                </ListItemPrefix>
                <Typography className="mr-auto font-normal" color="blue-gray">
                  Admin
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <ListItem onClick={handleClick}>
                  <a href="/admin" className="flex items-center">
                    <ListItemPrefix>
                      <HiOutlineAdjustmentsHorizontal size={24} className="text-gray-600 " />
                    </ListItemPrefix>
                    Panel de control
                  </a>
                </ListItem>
                <ListItem onClick={handleClick}>
                  <a href="/admin/userList" className="flex items-center">
                    <ListItemPrefix>
                      <HiOutlineUserGroup size={24} className="text-gray-600 " />
                    </ListItemPrefix>
                    Usuarios
                  </a>
                </ListItem>
                <ListItem onClick={handleClick}>
                  <a href="/admin/category" className="flex items-center">
                    <ListItemPrefix>
                      <HiOutlineBars3 size={24} className="text-gray-600 " />
                    </ListItemPrefix>
                    Categorías
                  </a>
                </ListItem>
                <ListItem onClick={handleClick}>
                  <a href="/admin/products" className="flex items-center">
                    <ListItemPrefix>
                      <HiOutlineSquares2X2 size={24} className="text-gray-600 " />
                    </ListItemPrefix>
                    Productos
                  </a>
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>
        ) : (
          <></>
        )}
        {user ? (
          <ListItem
            onClick={(e) => {
              e.preventDefault();
              accountService.logout();
              handleClick();
            }}
          >
            <ListItemPrefix>
              <HiArrowRightOnRectangle size={24} />
            </ListItemPrefix>
            Salir
          </ListItem>
        ) : (
          <>
            <ListItem onClick={handleClick}>
              <a href="/session/login" className="flex items-center">
                <ListItemPrefix>
                  <HiArrowRightOnRectangle size={24} className="text-gray-600 " />
                </ListItemPrefix>
                Iniciar sesión
              </a>
            </ListItem>
            <ListItem onClick={handleClick}>
              <a href="/session/register" className="flex items-center">
                <ListItemPrefix>
                  <HiOutlineUserPlus size={24} className="text-gray-600 " />
                </ListItemPrefix>
                Registrarse
              </a>
            </ListItem>
          </>
        )}
      </List>
    </div>
  );
};

export default SidebarCategories;
