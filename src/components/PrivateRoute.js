import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import Loading from "./Loading";
import { Link } from "react-router-dom";

function PrivateRoute({ component: Component }) {
  const [user, loading] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    setFinished(false);
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .get()
        .then((res) => {
          if (res.data().isAdmin) setIsAdmin(true);
          else setIsAdmin(false);
          setFinished(true);
        })
        .catch((err) => {
          alert(err.message);
          setIsAdmin(false);
          setFinished(true);
        });
    } else {
      setIsAdmin(false);
      setFinished(true);
    }
  }, [user]);

  if (loading || !finished) return <Loading />;
  else if (isAdmin) return <Component user={user} />;
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center">
      <p className="text-3xl">Unauthorized Access</p>
      <p>
        <Link to="/login">
          <span className="underline text-blue-500">Login</span>
        </Link>
        &nbsp;to Continue.
      </p>
    </div>
  );
}

export default PrivateRoute;
