import React, { createContext, useEffect, useState } from "react";
import { db } from "../utils/firebase";
import firebase from "firebase";

interface Output {
  orders: Array<firebase.firestore.DocumentData>;
}

export const AdminContext = createContext<Output>({ orders: [] });

export const AdminProvider: React.FC = ({ children }) => {
  const [orders, setOrders] = useState<Array<firebase.firestore.DocumentData>>(
    []
  );

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
