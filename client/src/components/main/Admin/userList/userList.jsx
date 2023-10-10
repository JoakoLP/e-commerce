import React from "react";
import accountService from "../../../../services/account";
import { useState } from "react";
import { useEffect } from "react";
import UserModal from "./userModal";
import { PencilIcon } from "@heroicons/react/24/solid";
import { Table, Badge, Tooltip } from "flowbite-react";
import Moment from "react-moment";
import "moment/locale/es";

const UserList = () => {
  const SERVER_URL = "https://e-commerce-api.joaquintakara.com";
  // const SERVER_URL = "http://localhost:8080";

  const [userList, setUserList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const loadUsers = async () => {
    await accountService.userList(setUserList);
    setIsLoading(false);
    // const list = await accountService.userList();
    // console.log(list);
    // setUserList(list);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    console.log(userList);
  }, [userList]);

  const userStatus = (user) => {
    const now = Date.parse(new Date(Date.now()).toJSON());
    const userDate = Date.parse(user?.lastSeen);
    // console.log({ userDate });

    const diffTime = Math.abs(now - userDate);
    // console.log({ diffTime }, user?.username);
    const diffMinu = diffTime / (1000 * 60);
    // console.log(diffMinu + " minutes", user?.username);

    if (diffMinu < 1) {
      return true;
    } else {
      return false;
    }
  };

  const TABLE_ROWS = userList;
  const TABLE_HEAD = ["Usuario", "Admin", "Estado", "Ult. vez en linea", "Creación"];
  const defaultUser = `${SERVER_URL}/public/default/user-avatar.png`;
  // const defaultUser = "http://localhost:8080/public/default/user-avatar.png";

  // Moment.globalLocale = "es";
  const dateOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

  if (isLoading) {
    return <p>Cargando...</p>;
  } else {
    return (
      <div className="bg-white shadow">
        <Table>
          <Table.Head>
            {TABLE_HEAD.map((head) => (
              <Table.HeadCell>{head}</Table.HeadCell>
            ))}

            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {TABLE_ROWS?.map((user, index) => (
              <Table.Row key={user?.username}>
                {/* info user */}
                <Table.Cell>
                  <div className="flex items-center gap-3">
                    <img
                      src={user?.avatar ? user?.avatar : defaultUser}
                      className={`${userStatus(user) ? "border-cyan-500" : "border-gray-400"} border-2 object-cover w-10 rounded-full aspect-square`}
                      alt={user?.name}
                      size="sm"
                    />
                    <div className="flex flex-col">
                      <p className="font-bold">{user?.username}</p>
                      <p className="font-normal">{user?.name}</p>
                      <p className="font-normal opacity-70">{user?.email}</p>
                    </div>
                  </div>
                </Table.Cell>
                {/* isAdmin */}
                <Table.Cell>
                  <div className="w-full h-full">
                    <Badge color={user?.isAdmin ? "info" : "gray"} className="w-min">
                      {user?.isAdmin ? "Si" : "No"}
                    </Badge>
                  </div>
                </Table.Cell>
                {/* status */}
                <Table.Cell>
                  <div className="w-max">
                    <Badge color={userStatus(user) ? "success" : "dark"}>{userStatus(user) ? "Online" : "Offline"}</Badge>
                  </div>
                </Table.Cell>
                {/* lastSeen */}
                <Table.Cell>
                  <span variant="small" color="blue-gray" className="font-normal">
                    {user?.lastSeen != undefined ? (
                      <Moment fromNow locale="es">
                        {user?.lastSeen}
                      </Moment>
                    ) : (
                      <p>Desconocido</p>
                    )}
                  </span>
                </Table.Cell>
                {/* date */}
                <Table.Cell>
                  <span variant="small" color="blue-gray" className="font-normal">
                    <Moment format="hh:mmA - DD/MM/YYYY" withTitle titleFormat="LL - hh:mm:ssA" locale="es">
                      {user?.date}
                    </Moment>
                  </span>
                </Table.Cell>
                {/* info/edit */}
                <Table.Cell>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setUser(user);
                      setIsOpen(true);
                    }}
                  >
                    <Tooltip content="Edit User">
                      <button
                        variant="text"
                        color="blue-gray"
                        onClick={(e) => {
                          e.preventDefault();
                          handleOpen();
                        }}
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                    </Tooltip>
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <UserModal open={open} handleOpen={handleOpen} user={user} />
        </Table>
      </div>
    );
  }
};

export default UserList;
