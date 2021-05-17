import React, { createContext, useEffect, useState } from "react";
import { db } from "../utils/firebase";
import firebase from "firebase";

interface Output {
  orders: Array<firebase.firestore.DocumentData>;
  users: Array<firebase.firestore.DocumentData>;
}

export const AdminContext = createContext<Output>({ orders: [], users: [] });

export const AdminProvider: React.FC = ({ children }) => {
  const [orders, setOrders] = useState<Array<firebase.firestore.DocumentData>>(
    []
  );
  const [users, setUsers] = useState<Array<firebase.firestore.DocumentData>>(
    []
  );

  useEffect(() => {
    const ordersSubscription = db
      .collection("orders")
      .orderBy("orderDate", "desc")
      .onSnapshot((snapshot) =>
        setOrders(snapshot.docs.map((x) => ({ id: x.id, ...x.data() })))
      );

    const usersSubscription = db
      .collection("users")
      .onSnapshot((snapshot) =>
        setUsers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      );

    return () => {
      ordersSubscription();
      usersSubscription();
    };
  }, []);

  return (
    <AdminContext.Provider value={{ orders, users }}>
      {children}
    </AdminContext.Provider>
  );
};
