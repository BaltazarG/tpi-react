import React, { createContext, useState } from "react";
import { useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState("");

  useEffect(() => {
    if (token) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, setToken, user, setUser, userType, setUserType }}
    >
      {children}
    </AuthContext.Provider>
  );
};
