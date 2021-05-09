import { auth } from "../../utils/firebase";
import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import { FirestoreContext } from "../../contexts/FirestoreContext";
import { Privilege } from "../../luntian-types";

interface SidebarProps {
  leftActive: boolean;
  setLeftActive(arg0: boolean): void;
}

const UserSidebar: React.FC<SidebarProps> = ({ leftActive, setLeftActive }) => {
  const history = useHistory();
  const { userData: doc } = useContext(FirestoreContext);
  const showAdminPanel =
    (doc?.privilege as Privilege) === "FARMER" ||
    (doc?.privilege as Privilege) === "ADMIN";

  return (
    <div
      className={`z-10 absolute w-10/12 md:w-64 mt-14 inset-y-0 left-0 bg-white border-t border-r border-gray-300 transition-all duration-300 divide-y ${
        !leftActive && "-ml-sb md:-ml-64"
      }`}
    >
      <div className="pt-4 pb-4">
        <Link to={`/`}>
          <button
            className="w-full px-4 py-2 text-left transition-colors duration-150 focus:outline-none active:bg-gray-200"
            onClick={() => {
              setLeftActive(false);
            }}
          >
            Home
          </button>
        </Link>
        {doc?.privilege === "ADMIN" && (
          <Link to={`/admin`}>
            <button
              className="w-full px-4 py-2 text-left transition-colors duration-150 focus:outline-none active:bg-gray-200"
              onClick={() => {
                setLeftActive(false);
              }}
            >
              Admin Controls
            </button>
          </Link>
        )}
      </div>

      {showAdminPanel && (
        <div className="pt-4 pb-4">
          <Link to={`admin/farm-monitoring`}>
            <button
              className="w-full px-4 py-2 text-left transition-colors duration-150 focus:outline-none active:bg-gray-200"
              onClick={() => {
                setLeftActive(false);
              }}
            >
              Farm Monitoring
            </button>
          </Link>
          <Link to={`/admin/inventory`}>
            <button
              className="w-full px-4 py-2 text-left transition-colors duration-150 focus:outline-none active:bg-gray-200"
              onClick={() => {
                setLeftActive(false);
              }}
            >
              Inventory
            </button>
          </Link>
          <Link to={`/admin/sales`}>
            <button
              className="w-full px-4 py-2 text-left transition-colors duration-150 focus:outline-none active:bg-gray-200"
              onClick={() => {
                setLeftActive(false);
              }}
            >
              Sales
            </button>
          </Link>
          <Link to={`/admin/orders`}>
            <button
              className="w-full px-4 py-2 text-left transition-colors duration-150 focus:outline-none active:bg-gray-200"
              onClick={() => {
                setLeftActive(false);
              }}
            >
              Orders
            </button>
          </Link>
          <Link to={`/admin/reports`}>
            <button
              className="w-full px-4 py-2 text-left transition-colors duration-150 focus:outline-none active:bg-gray-200"
              onClick={() => {
                setLeftActive(false);
              }}
            >
              Reports
            </button>
          </Link>
        </div>
      )}

      <div className="pt-4 pb-4">
        <Link to={`/home/profile`}>
          <button
            className="w-full px-4 py-2 text-left transition-colors duration-150 focus:outline-none active:bg-gray-200"
            onClick={() => {
              setLeftActive(false);
            }}
          >
            Edit Profile
          </button>
        </Link>
        <button
          className="w-full px-4 py-2 text-left transition-colors duration-150 focus:outline-none active:bg-gray-200"
          onClick={() => {
            auth.signOut();
            history.replace("/");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserSidebar;
