import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { Redirect } from "react-router-dom";

function Home() {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div>Loading...</div>;
  return !user ? <div>Home Page</div> : <Redirect to="/home" />;
}

export default Home;
