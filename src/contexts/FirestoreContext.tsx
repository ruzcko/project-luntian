import React, { useState, useEffect, createContext } from "react";
import { auth, db } from "../utils/firebase";
import firebase from "firebase";

type docData = firebase.firestore.DocumentData;

interface Output {
  products: Array<docData>;
  user: firebase.User | undefined | null;
  userData: docData;
  userCart: Array<docData>;
}

export const FirestoreContext = createContext<Output>({
  products: [],
  user: undefined,
  userCart: [],
  userData: {},
});

export const FirestoreProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Array<docData>>([]);
  const [user, setUser] = useState<firebase.User | undefined | null>();
  const [userData, setUserData] = useState<docData>({});
  const [userCart, setUserCart] = useState<Array<docData>>([]);

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
