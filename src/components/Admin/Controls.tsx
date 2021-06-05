import { motion } from "framer-motion";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import { AdminContext } from "../../contexts/AdminContext";
import { Privilege } from "../../luntian-types";
import { db } from "../../utils/firebase";
import { fadeInUp, stagger } from "../../utils/framer-constants";

const AdminControls: React.FC = () => {
  const { users } = useContext(AdminContext);
  const history = useHistory();

  const togglePrivilege = (id: string, privilege: Privilege) => {
    db.collection("users").doc(id).update({ privilege });
  };

  return (
    <div>
      <div className="flex items-center mb-4 space-x-2">
        <svg
          onClick={() => history.goBack()}
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 p-2 rounded-full cursor-pointer hover:bg-gray-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <h2 className="text-xl">Admin Controls</h2>
      </div>

      <div className="flex mt-8 mb-4">
        <p className="flex-1">Users</p>

        <div className="items-center hidden w-32 md:flex">
          <p className="flex items-center justify-center flex-1">Farmer</p>
          <p className="flex items-center justify-center flex-1">Admin</p>
        </div>
      </div>

      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={stagger}
        className="flex flex-col space-y-4 divide-y divide-gray-300"
      >
        {users.map((user) => (
          <motion.div
            variants={fadeInUp}
            key={user.email}
            className="flex flex-col justify-between pt-4 md:items-center md:flex-row"
          >
            <div className="flex items-center flex-1 flex-grow-0 space-x-2">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.id}
                  className="flex-shrink-0 object-cover w-14 h-14"
                />
              ) : (
                <div className="flex items-center justify-center text-xl text-gray-500 bg-gray-300 w-14 h-14">
                  {user.firstName[0] ?? "U"}
                </div>
              )}
              <div className="flex flex-col overflow-ellipsis">
                <p className="text-sm md:text-base">
                  {user.firstName} {user.lastName}
                </p>
                <p className="flex text-xs text-gray-500 truncate md:text-sm">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex items-center flex-shrink-0 w-full mt-2 md:w-32 md:mt-0">
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
                <p className="block ml-2 text-xs text-gray-600 md:hidden">
                  Farmer
                </p>
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
                <p className="block ml-2 text-xs text-gray-600 md:hidden">
                  Admin
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AdminControls;
