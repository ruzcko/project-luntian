import React, { useRef, useState } from "react";
import { auth, db } from "../utils/firebase";
import { useHistory } from "react-router-dom";

function Signup() {
  const history = useHistory();
  const [c, setC] = useState(0);
  const [errors, setErrors] = useState({
    firstNameError: false,
    lastNameError: false,
    emailError: false,
    passwordError: false,
    retypedPasswordError: false,
  });
  const [mainError, setMainError] = useState();
  const emailRef = useRef();
  const passRef = useRef();
  const retypedPassRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();

  const getErrors = () => {
    let errCount = 0;
    let tempError = errors;
    const fName = firstNameRef.current.value.trim();
    const lName = lastNameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const pword = passRef.current.value.trim();
    const retypedPword = retypedPassRef.current.value.trim();

    if (!fName) {
      tempError.firstNameError = true;
      ++errCount;
    } else {
      tempError.firstNameError = false;
    }
    if (!lName) {
      tempError.lastNameError = true;
      ++errCount;
    } else {
      tempError.lastNameError = false;
    }
    if (!email) {
      tempError.emailError = true;
      ++errCount;
    } else {
      tempError.emailError = false;
    }
    if (!pword) {
      tempError.passwordError = true;
      ++errCount;
    } else {
      tempError.passwordError = false;
    }
    if (pword !== retypedPword || !retypedPword) {
      tempError.retypedPasswordError = true;
      ++errCount;
    } else {
      tempError.retypedPasswordError = false;
    }

    setC(c + 1);
    return { errCount, errs: tempError, fName, lName, email, pword };
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { errCount, errs, fName, lName, email, pword } = getErrors();
    console.log(errs);
    setErrors(errs);
    if (errCount === 0) {
      await auth
        .createUserWithEmailAndPassword(email, pword)
        .then((res) => {
          //res.user.uid
          db.collection("users").doc(res.user.uid).set({
            firstName: fName,
            lastName: lName,
            email,
            isAdmin: false,
          });
        })
        .catch((err) => setMainError(err.message));
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
            mainError ? "bg-red-600" : "bg-blue-600"
          }`}
        ></div>
        <h1 className="text-center text-2xl">Create and Account</h1>

        {mainError && (
          <p className="text-red-600 text-center text-sm mt-1">{mainError}</p>
        )}

        <form onSubmit={handleSignup}>
          <div className="flex space-x-4">
            <div>
              <p className="mt-2">First Name</p>
              <input
                ref={firstNameRef}
                type="text"
                className={`mt-1 w-full border ${
                  errors.firstNameError ? "border-red-600" : "border-gray-300"
                } focus:outline-none 
            ring-0 focus:ring-0 focus:border-blue-600 rounded px-4 py-2`}
              />
              {errors.firstNameError && (
                <p className="text-xs text-red-600">First name is required</p>
              )}
            </div>

            <div>
              <p className="mt-2">Last Name</p>
              <input
                ref={lastNameRef}
                type="text"
                className={`mt-1 w-full border ${
                  errors.lastNameError ? "border-red-600" : "border-gray-300"
                } focus:outline-none 
            ring-0 focus:ring-0 focus:border-blue-600 rounded px-4 py-2`}
              />
              {errors.lastNameError && (
                <p className="text-xs text-red-600">Last name is required</p>
              )}
            </div>
          </div>

          <p className="mt-2">Email</p>
          <input
            ref={emailRef}
            type="email"
            className={`mt-1 w-full border ${
              errors.emailError ? "border-red-600" : "border-gray-300"
            } focus:outline-none 
            ring-0 focus:ring-0 focus:border-blue-600 rounded px-4 py-2`}
          />
          {errors.emailError && (
            <p className="text-xs text-red-600">Email is required</p>
          )}

          <p className="mt-2">Password</p>
          <input
            ref={passRef}
            type="password"
            className={`mt-1 w-full border ${
              errors.passwordError ? "border-red-600" : "border-gray-300"
            } focus:outline-none 
            ring-0 focus:ring-0 focus:border-blue-600 rounded px-4 py-2`}
          />
          {errors.passwordError && (
            <p className="text-xs text-red-600">Password is required</p>
          )}

          <p className="mt-2">Retype Password</p>
          <input
            ref={retypedPassRef}
            type="password"
            className={`mt-1 w-full border ${
              errors.retypedPasswordError ? "border-red-600" : "border-gray-300"
            } focus:outline-none 
            ring-0 focus:ring-0 focus:border-blue-600 rounded px-4 py-2`}
          />
          {errors.retypedPasswordError && (
            <p className="text-xs text-red-600">Password does not match</p>
          )}

          <button
            type="submit"
            className={`bg-blue-600 px-4 py-2 rounded-md mt-4 w-full text-white 
          tracking-wide active:bg-blue-700 focus:outline-none focus:ring-1 ring-gray-900`}
          >
            Sign Up
          </button>
        </form>

        <div className="flex justify-center text-sm mt-4">
          <p>
            Have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => history.replace("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
