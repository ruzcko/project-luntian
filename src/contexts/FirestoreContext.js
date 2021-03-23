import React, { useState, useEffect, createContext } from "react";
import { auth, db } from "../utils/firebase";

export const FirestoreContext = createContext();

export const FirestoreProvider = ({ children }) => {
  const [products, setProducts] = useState();
  const [user, setUser] = useState();
  const [userData, setUserData] = useState();
  const [userCart, setUserCart] = useState();

  useEffect(() => {
    const authSubscription = auth.onAuthStateChanged((res) => {
      if (res) {
        const userRef = db.collection("users").doc(res.uid);

        userRef.onSnapshot((doc) => {
          setUserData({ ...doc.data(), id: doc.id });
        });

        userRef.collection("cart").onSnapshot((snapshot) => {
          setUserCart(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
        });
      }

      setUser(res);
    });

    const productsSubscription = db
      .collection("products")
      .onSnapshot((snapshot) => {
        setProducts(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });

    return () => {
      authSubscription();
      productsSubscription();
    };
  }, []);

  return (
    <FirestoreContext.Provider
      value={{
        products,
        user,
        userData,
        userCart,
      }}
    >
      {children}
    </FirestoreContext.Provider>
  );
};
