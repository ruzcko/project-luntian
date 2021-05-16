import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Redirect } from "react-router-dom";
import { auth, db, googleProvider } from "../utils/firebase";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import logo from "../assets/logo.png";
import Loading from "../components/Loading";

type ProviderTypes = "GOOGLE" | "FACEBOOK" | "GITHUB";

const Home: React.FC = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <Loading />;

  return !user ? (
    <div>
      <HomeNav />
    </div>
  ) : (
    <Redirect to="/home" />
  );
};

const Container: React.FC = ({ children }) => {
  return <div className="w-full px-4 mx-auto max-w-7xl">{children}</div>;
};

function HomeNav() {
  const history = useHistory();

  const handleNewUser = async (user: firebase.auth.UserCredential) => {
    if (user.additionalUserInfo && user.user) {
      if (user.additionalUserInfo.isNewUser) {
        await db.collection("users").doc(user.user.uid).set({
          isAdmin: false,
          firstName: "",
          lastName: "",
          email: user.user.email,
          privilege: "USER",
          signupCompleted: false,
        });
        history.push("/home/profile");
      }

      history.push("/");
    } else alert("Something went wrong.");
  };

  const handleProviderLogin = (prov: ProviderTypes) => {
    if (prov === "GOOGLE") {
      auth
        .signInWithPopup(googleProvider)
        .then(handleNewUser)
        .catch((error) => alert(error.message));
    }
  };

  return (
    <div className="w-full h-screen overflow-x-hidden overflow-y-scroll bg-gray-100">
      {/* Navbar */}
      <nav className="w-full bg-white">
        <Container>
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-2 text-xl">
              <img src={logo} alt="logo" className="h-10" />
              <h1 className="uppercase">Luntian</h1>
            </div>

            <button
              onClick={() => handleProviderLogin("GOOGLE")}
              className="px-4 py-2 text-sm text-white bg-green-500 rounded-full hover:bg-green-600"
            >
              Login/Signup
            </button>
          </div>
        </Container>
      </nav>
    </div>
  );
}

export default Home;
