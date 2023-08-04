import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AccountContext } from "../../../contexts/AccountProvider";

const UserCheck = () => {
  const [user, setUser] = useContext(AccountContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  if (!user) {
    return (
      <>
        <Outlet />
      </>
    );
  }
};

export default UserCheck;
