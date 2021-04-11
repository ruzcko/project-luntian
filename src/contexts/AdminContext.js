import React, { createContext, useEffect, useState } from "react";
import { db } from "../utils/firebase";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const ordersSubscription = db
      .collection("orders")
      .orderBy("orderDate", "desc")
      .onSnapshot((snapshot) =>
        setOrders(snapshot.docs.map((x) => ({ id: x.id, ...x.data() })))
      );

    return () => {
      ordersSubscription();
    };
  }, []);

  return (
    <AdminContext.Provider value={{ orders }}>{children}</AdminContext.Provider>
  );
};
