import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../utils/firebase";

function AdminControls() {
  const [users, loading] = useCollectionData(db.collection("users"), {
    idField: "id",
  });

  console.log(users);

  const togglePrivilege = (id, privilege) => {
    db.collection("users").doc(id).update({ privilege });
  };

  return (
    <div>
      <h1 className="text-xl">Admin Controls</h1>

      <div className="flex mt-8 mb-4">
        <p className="flex-1">User</p>

        <div className="flex items-center w-40">
          <p className="flex items-center justify-center flex-1">Farmer</p>
          <p className="flex items-center justify-center flex-1">Admin</p>
        </div>
      </div>

      {!loading && (
        <div className="flex flex-col space-y-4">
          {users.map((user) => (
            <div className="flex items-center justify-between">
              <div className="flex items-center flex-1 space-x-2">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.email}
                    className="w-14 h-14"
                  />
                ) : (
                  <div className="flex items-center justify-center text-xl text-gray-500 bg-gray-300 w-14 h-14">
                    {user.firstName[0] ?? "U"}
                  </div>
                )}
                <div>
                  <p>
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center w-40">
                <div className="flex items-center justify-center flex-1">
                  <input
                    type="checkbox"
                    checked={user.privilege === "FARMER"}
                    onChange={() => {
                      if (user.privilege === "FARMER")
                        togglePrivilege(user.id, "USER");
                      else togglePrivilege(user.id, "FARMER");
                    }}
                  />
                </div>
                <div className="flex items-center justify-center flex-1">
                  <input
                    type="checkbox"
                    checked={user.privilege === "ADMIN"}
                    onChange={() => {
                      if (user.privilege === "ADMIN")
                        togglePrivilege(user.id, "USER");
                      else togglePrivilege(user.id, "ADMIN");
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminControls;
