import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router";

const SidebarCategories = ({ setMenuIsOpen, menuIsOpen, setMenuMobileIsOpen, menuMobileIsOpen }) => {
  const navigate = useNavigate();
  const [user, setUser] = useContext(AccountContext);
  const handleClick = (url) => {
    navigate(url);
    if (setMenuIsOpen) {
      setMenuIsOpen(false);
    } else {
      setMenuMobileIsOpen(false);
    }
  };

  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  useEffect(() => {
    handleOpen(0);
  }, [menuIsOpen, menuMobileIsOpen]);

  return (
    <div className="text-left w-fit">
      {user ? <p className="hidden text-gray-600 md:block ">Hola {user.username}</p> : <></>}
      <List>
        {user ? (
          <ListItem
            onClick={() => {
              handleClick("/account");
            }}
          >
            <ListItemPrefix>
              <HiOutlineUser size={24} />
            </ListItemPrefix>
            Mi Cuenta
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
                <ListItem
                  onClick={() => {
                    handleClick("/admin");
                  }}
                >
                  <ListItemPrefix>
                    <HiOutlineAdjustmentsHorizontal size={24} className="text-gray-600 " />
                  </ListItemPrefix>
                  Panel de control
                </ListItem>
                <ListItem
                  onClick={() => {
                    handleClick("/admin/userList");
                  }}
                >
                  <ListItemPrefix>
                    <HiOutlineUserGroup size={24} className="text-gray-600 " />
                  </ListItemPrefix>
                  Usuarios
                </ListItem>
                <ListItem
                  onClick={() => {
                    handleClick("/admin/category");
                  }}
                >
                  <ListItemPrefix>
                    <HiOutlineBars3 size={24} className="text-gray-600 " />
                  </ListItemPrefix>
                  Categorías
                </ListItem>
                <ListItem
                  onClick={() => {
                    handleClick("/admin/products");
                  }}
                >
                  <ListItemPrefix>
                    <HiOutlineSquares2X2 size={24} className="text-gray-600 " />
                  </ListItemPrefix>
                  Productos
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
            <ListItem
              onClick={() => {
                handleClick("/session/login");
              }}
            >
              <ListItemPrefix>
                <HiArrowRightOnRectangle size={24} className="text-gray-600 " />
              </ListItemPrefix>
              Iniciar sesión
            </ListItem>
            <ListItem
              onClick={() => {
                handleClick("/session/register");
              }}
            >
              <ListItemPrefix>
                <HiOutlineUserPlus size={24} className="text-gray-600 " />
              </ListItemPrefix>
              Registrarse
            </ListItem>
          </>
        )}
      </List>
    </div>
  );
};

export default SidebarCategories;
