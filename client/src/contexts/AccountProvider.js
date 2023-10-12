import React, { useState, createContext, useEffect } from "react";
import Cookies from "universal-cookie";
import accountService from "../services/account";

export const AccountContext = createContext();

const AccountProvider = ({ children }) => {
  const cookies = new Cookies();
  const [user, setUser] = useState(cookies.get("userSession"));

  const sendStatus = () => {
    setTimeout(() => {
      accountService.lastSeen();
      setInterval(() => {
        if (cookies.get("userSession")) {
          accountService.lastSeen();
        } else {
          window.location.reload(false);
        }
      }, 60000);
    }, 30000);
  };

  let runned = false;

  useEffect(() => {
    if (!runned) {
      runned = true;
      if (cookies.get("userSession")) {
        accountService.userGet(setUser);
        sendStatus();
      }
    }
  }, []);

  return <AccountContext.Provider value={[user, setUser]}>{children}</AccountContext.Provider>;
};

export default AccountProvider;
