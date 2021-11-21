//1.
import React, { useEffect, useState } from "react";
import app from "./firebase.js";

//2.
export const MyContext = React.createContext();

//3.
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    app.auth().onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    <MyContext.Provider value={{ user: currentUser }}>{children}</MyContext.Provider>
  );
};