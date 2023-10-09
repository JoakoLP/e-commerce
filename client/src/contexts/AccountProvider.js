import React, { useState, createContext, useEffect } from "react";
import Cookies from "universal-cookie";
import accountService from "../services/account";

export const AccountContext = createContext();

const AccountProvider = ({ children }) => {
  const cookies = new Cookies();
  const [user, setUser] = useState(cookies.get("userSession"));

  useEffect(() => {
    console.log(cookies);
    if (user) {
      console.log("preGet", user);
      accountService.userGet(setUser);
      accountService.userStatus();
    }
  }, []);

  setInterval(() => {
    if (user) {
      accountService.userStatus();
    }
  }, 60000);

  return <AccountContext.Provider value={[user, setUser]}>{children}</AccountContext.Provider>;
};

export default AccountProvider;
