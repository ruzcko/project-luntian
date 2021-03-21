import React, { useState, createContext, useEffect } from "react";
import { auth, db } from "../utils/firebase";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (resultUser) => {
      if (resultUser) {
        db.collection("users")
          .doc(resultUser.uid)
          .onSnapshot((doc) => {
            setData({ ...doc.data(), id: doc.id });
          });
      }

      setUser(resultUser);
    });

    return unsub;
  }, []);

  return (
    <UserContext.Provider value={{ user, data }}>
      {children}
    </UserContext.Provider>
  );
};
