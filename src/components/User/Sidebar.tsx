import { auth } from "../../utils/firebase";
import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import { FirestoreContext } from "../../contexts/FirestoreContext";
import { Privilege } from "../../luntian-types";
import {
  admin1Icon,
  ecommerceIcon,
  homeIcon,
  inventoryIcon,
  marketplaceIcon,
  monitoringIcon,
  order1Icon,
  profileIcon,
  projection1Icon,
} from "../../assets/Dashboard";

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
      className={`z-10 absolute w-10/12 md:w-64 mt-14 inset-y-0 left-0 bg-white border-r border-gray-300 transition-all duration-300 divide-y ${
        !leftActive && "-ml-sb md:-ml-64"
      }`}
    >
      <div className="pt-4 pb-4">
        <div>
          <Link to={`/`}>
            <button
              className="flex items-center w-full px-4 py-2 space-x-2 text-left transition-colors duration-150 focus:outline-none active:bg-gray-200"
              onClick={() => {
                setLeftActive(false);
              }}
            >
              <img src={homeIcon} alt={homeIcon} className="w-7 h-7" />
              <p>Home</p>
            </button>
          </Link>
        </div>
        <Link to={`/home/marketplace`}>
          <button
            className="flex items-center w-full px-4 py-2 space-x-2 text-left transition-colors duration-150 focus:outline-none active:bg-gray-200"
            onClick={() => {
              setLeftActive(false);
            }}
          >
            <img
              src={marketplaceIcon}
              alt={marketplaceIcon}
              className="w-7 h-7"
            />
            <p>Marketplace</p>
          </button>
        </Link>
        {doc?.privilege === "ADMIN" && (
          <Link to={`/admin`}>
            <button
              className="flex items-center w-full px-4 py-2 space-x-2 text-left transition-colors duration-150 focus:outline-none active:bg-gray-200"
              onClick={() => {
                setLeftActive(false);
              }}
            >
              <img src={admin1Icon} alt={admin1Icon} className="w-7 h-7" />
              <p>Admin Controls</p>
            </button>
          </Link>
        )}
      </div>

      {showAdminPanel && (
        <div className="pt-4 pb-4">
          <Link to={`/monitoring?tab=hydroponics`}>
            <button
              className="flex items-center w-full px-4 py-2 space-x-2 text-left transition-colors duration-150 focus:outline-none active:bg-gray-200"
              onClick={() => {
                setLeftActive(false);
              }}
            >
              <img
                src={monitoringIcon}
                alt={monitoringIcon}
                className="w-7 h-7"
              />
              <p>Farm Monitoring</p>
            </button>
          </Link>
          <Link to={`/admin/inventory`}>
            <button
              className="flex items-center w-full px-4 py-2 space-x-2 text-left transition-colors duration-150 focus:outline-none active:bg-gray-200"
              onClick={() => {
                setLeftActive(false);
              }}
            >
              <img
                src={inventoryIcon}
                alt={inventoryIcon}
                className="w-7 h-7"
              />
              <p>Inventory</p>
            </button>
          </Link>
          <Link to={`/admin/sales`}>
            <button
              className="flex items-center w-full px-4 py-2 space-x-2 text-left transition-colors duration-150 focus:outline-none active:bg-gray-200"
              onClick={() => {
                setLeftActive(false);
              }}
            >
              <img
                src={ecommerceIcon}
                alt={ecommerceIcon}
                className="w-7 h-7"
              />
              <p>E-Commerce</p>
            </button>
          </Link>
          <Link to={`/admin/orders`}>
            <button
              className="flex items-center w-full px-4 py-2 space-x-2 text-left transition-colors duration-150 focus:outline-none active:bg-gray-200"
              onClick={() => {
                setLeftActive(false);
              }}
            >
              <img src={order1Icon} alt={order1Icon} className="w-7 h-7" />
              <p>Orders</p>
            </button>
          </Link>
          <Link to={`/admin/projections`}>
            <button
              className="flex items-center w-full px-4 py-2 space-x-2 text-left transition-colors duration-150 focus:outline-none active:bg-gray-200"
              onClick={() => {
                setLeftActive(false);
              }}
            >
              <img
                src={projection1Icon}
                alt={projection1Icon}
                className="w-7 h-7"
              />
              <p>Projections</p>
            </button>
          </Link>
        </div>
      )}

      <div className="pt-4 pb-4">
        <Link to={`/home/profile/${doc.id}`}>
          <button
            className="flex items-center w-full px-4 py-2 space-x-2 text-left transition-colors duration-150 focus:outline-none active:bg-gray-200"
            onClick={() => {
              setLeftActive(false);
            }}
          >
            <img src={profileIcon} alt={profileIcon} className="w-7 h-7" />
            <p>Edit Profile</p>
          </button>
        </Link>

        <Link to={`/home/orders`}>
          <button
            className="flex items-center w-full px-4 py-2 space-x-2 text-left transition-colors duration-150 focus:outline-none active:bg-gray-200"
            onClick={() => {
              setLeftActive(false);
            }}
          >
            <img src={order1Icon} alt={order1Icon} className="w-7 h-7" />
            <p>My Orders</p>
          </button>
        </Link>

        <button
          className="flex items-center w-full px-4 py-2 space-x-2 text-left transition-colors duration-150 focus:outline-none active:bg-gray-200"
          onClick={() => {
            auth.signOut();
            history.replace("/");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <p>Log Out</p>
        </button>
      </div>
    </div>
  );
};

export default UserSidebar;
