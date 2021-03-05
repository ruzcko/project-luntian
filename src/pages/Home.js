import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import UserDashboard from "../components/User/UserDashboard";
import UserNavbar from "../components/User/UserNavbar";
import Loading from "../components/Loading";

function Home() {
  const [user, loading] = useAuthState(auth);

  if (loading) return <Loading />;
  return (
    <>
      <UserNavbar user={user} />
      <UserDashboard user={user} />
    </>
  );
}

export default Home;
