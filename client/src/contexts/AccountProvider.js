import React, { useState, createContext, useEffect } from "react";
import Cookies from "universal-cookie";
import accountService from "../services/account";

export const AccountContext = createContext();

const AccountProvider = ({ children }) => {
  const cookies = new Cookies();
  const [user, setUser] = useState(cookies.get("userSession"));

  useEffect(() => {
    console.log(cookies);
    console.log(user);
    if (user) {
      accountService.userGet(setUser);
    }
  }, []);

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  // setInterval(() => {
  //   accountService.userGet(setUser());
  // }, 500);

  return <AccountContext.Provider value={[user, setUser]}>{children}</AccountContext.Provider>;
};

export default AccountProvider;
