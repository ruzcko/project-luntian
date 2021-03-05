import React from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../utils/firebase";

function UserNavbar({ user }) {
  const history = useHistory();

  return (
    <nav className="flex border-b border-gray-300 shadow">
      <div className="app-container flex h-14 items-center justify-between">
        <div>Luntian</div>
        <ul className="flex items-center space-x-4 text-sm">
          <p>{user?.email}</p>

          {user ? (
            <button
              onClick={() => auth.signOut()}
              className={`inline-block text-white bg-blue-600 active:bg-blue-700 
        focus:outline-none px-3 py-1 rounded`}
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => history.push("/login")}
              className={`inline-block text-white bg-blue-600 active:bg-blue-700 
        focus:outline-none px-3 py-1 rounded`}
            >
              Login
            </button>
          )}

          {user && (
            <img
              src={user.photoURL}
              alt="profile_pic"
              className="h-10 rounded-full"
            />
          )}
        </ul>
      </div>
    </nav>
  );
}

export default UserNavbar;
