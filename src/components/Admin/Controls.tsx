import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Privilege } from "../../luntian-types";
import { db } from "../../utils/firebase";

const AdminControls: React.FC = () => {
  const [users, loading] = useCollectionData(db.collection("users"), {
    idField: "id",
  });

  const togglePrivilege = (id: string, privilege: Privilege) => {
    db.collection("users").doc(id).update({ privilege });
  };

  return (
    <div>
      <h1 className="text-xl">Admin Controls</h1>

      <div className="flex mt-8 mb-4">
        <p className="flex-1">User</p>

        <div className="flex items-center w-32">
          <p className="flex items-center justify-center flex-1">Farmer</p>
          <p className="flex items-center justify-center flex-1">Admin</p>
        </div>
      </div>

      {!loading && users && (
        <div className="flex flex-col space-y-4">
          {users.map((user) => (
            <div key={user.email} className="flex items-center justify-between">
              <div className="flex items-center flex-1 space-x-2">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.email}
                    className="flex-shrink-0 object-cover w-14 h-14"
                  />
                ) : (
                  <div className="flex items-center justify-center text-xl text-gray-500 bg-gray-300 w-14 h-14">
                    {user.firstName[0] ?? "U"}
                  </div>
                )}
                <div className="flex flex-col">
                  <p className="text-sm md:text-base">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="flex text-xs text-gray-500 truncate md:text-sm">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center flex-shrink-0 w-32">
                <div className="flex items-center justify-center flex-1">
                  <input
                    type="checkbox"
                    checked={(user.privilege as Privilege) === "FARMER"}
                    onChange={() => {
                      if ((user.privilege as Privilege) === "FARMER")
                        togglePrivilege(user.id, "USER");
                      else togglePrivilege(user.id, "FARMER");
                    }}
                  />
                </div>
                <div className="flex items-center justify-center flex-1">
                  <input
                    type="checkbox"
                    checked={(user.privilege as Privilege) === "ADMIN"}
                    onChange={() => {
                      if ((user.privilege as Privilege) === "ADMIN")
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
};

export default AdminControls;
