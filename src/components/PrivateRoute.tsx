import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { Privilege } from "../luntian-types";

interface PrivateRouteProps {
  component: React.FC<{
    user: firebase.User | null | undefined;
    privilege: Privilege;
  }>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
}) => {
  const [user, loading] = useAuthState(auth);
  const [finished, setFinished] = useState(false);
  const [privilege, setPrivilege] = useState<Privilege>("USER");

  useEffect(() => {
    setFinished(false);
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .get()
        .then((res) => {
          setPrivilege(res.data()?.privilege);
          setFinished(true);
        })
        .catch((err) => {
          alert(err.message);
          setFinished(true);
        });
    } else {
      setFinished(true);
    }
  }, [user]);

  if (loading || !finished) return <Loading />;
  else if (
    (privilege as Privilege) === "FARMER" ||
    (privilege as Privilege) === "ADMIN"
  )
    return <Component user={user} privilege={privilege} />;
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <p className="text-3xl">Unauthorized Access</p>
      <p>
        <Link to="/login">
          <span className="text-blue-500 underline">Login</span>
        </Link>
        &nbsp;to Continue.
      </p>
    </div>
  );
};

export default PrivateRoute;
