import React, { useState, createContext, useEffect } from "react";
import Cookies from "universal-cookie";
import accountService from "../services/account";

export const AccountContext = createContext();

const AccountProvider = ({ children }) => {
  const cookies = new Cookies();
  const [user, setUser] = useState(cookies.get("userSession"));

  const sendStatus = () => {
    accountService.userStatus();
    setInterval(() => {
      if (user) {
        accountService.userStatus();
      }
    }, 60000);
  };

  let runned = false;

  useEffect(() => {
    if (!runned) {
      runned = true;
      console.log(cookies);
      if (user) {
        console.log("preGet", user);
        accountService.userGet(setUser);
        sendStatus();
      }
    }
  }, []);

  return <AccountContext.Provider value={[user, setUser]}>{children}</AccountContext.Provider>;
};

export default AccountProvider;
