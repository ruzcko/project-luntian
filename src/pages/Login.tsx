import React, { useRef, useState } from "react";
import { auth, db, googleProvider } from "../utils/firebase";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faFacebookF,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import firebase from "firebase";

type ProviderTypes = "GOOGLE" | "FACEBOOK" | "GITHUB";

const Login: React.FC = () => {
  const history = useHistory();
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(null);

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

  const handleLogin: React.FormEventHandler<HTMLFormElement> = (e) => {
    setError(null);
    e.preventDefault();
    const email = emailRef.current!.value.trim();
    const pword = passRef.current!.value.trim();
    auth
      .signInWithEmailAndPassword(email, pword)
      .then(handleNewUser)
      .catch((error) => setError(error.message));
  };

  const handleProviderLogin = (prov: ProviderTypes) => {
    if (prov === "GOOGLE") {
      auth
        .signInWithPopup(googleProvider)
        .then(handleNewUser)
        .catch((error) => setError(error.message));
    }
  };

  return (
    <div
      className={`app-container flex w-full h-screen items-center justify-center text-gray-900`}
    >
      <div
        className={`p-8 w-full md:w-96 rounded-xl border border-gray-300 relative`}
      >
        <div
          className={`absolute inset-x-0 top-0 rounded-t-xl h-2 ${
            error ? "bg-red-600" : "bg-blue-600"
          }`}
        ></div>
        <h1 className="text-2xl text-center">Sign In</h1>

        {error && (
          <p className="mt-1 text-sm text-center text-red-600">{error}</p>
        )}

        <form onSubmit={handleLogin}>
          <p className="mt-6">Email</p>
          <input
            onChange={() => setError(null)}
            ref={emailRef}
            type="email"
            className={`mt-2 w-full border border-gray-300 focus:outline-none ring-0 focus:ring-0 focus:border-blue-600 rounded px-4 py-2`}
          />

          <p className="mt-6">Password</p>
          <input
            onChange={() => setError(null)}
            ref={passRef}
            type="password"
            className={`mt-2 w-full border border-gray-300 focus:outline-none ring-0 focus:ring-0 focus:border-blue-600 rounded px-4 py-2`}
          />

          <div className="flex items-center justify-center mt-8 space-x-2">
            <button
              type="button"
              onClick={() => handleProviderLogin("GOOGLE")}
              className={`flex items-center px-4 py-2 border border-gray-300 focus:outline-none focus:bg-blue-300 rounded-md`}
            >
              <FontAwesomeIcon icon={faGoogle} />
            </button>

            <button
              type="button"
              onClick={() => handleProviderLogin("GOOGLE")}
              className={`flex items-center px-4 py-2 border border-gray-300 focus:outline-none focus:bg-blue-300 rounded-md`}
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </button>

            <button
              type="button"
              onClick={() => handleProviderLogin("GOOGLE")}
              className={`flex items-center px-4 py-2 border border-gray-300 
              focus:outline-none focus:bg-blue-300 rounded-md`}
            >
              <FontAwesomeIcon icon={faGithub} />
            </button>
          </div>

          <button
            type="submit"
            className={`bg-blue-600 px-4 py-2 rounded-md mt-4 w-full text-white tracking-wide active:bg-blue-700 focus:outline-none focus:ring-1 ring-gray-900`}
          >
            Login
          </button>
        </form>

        <div className="flex justify-center mt-4 text-sm">
          <p>
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => history.push("/signup")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
