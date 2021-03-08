import { auth } from "../../utils/firebase";
import { Link, useHistory, useRouteMatch } from "react-router-dom";

function AdminSidebar({ leftActive, setLeftActive, privilege }) {
  const history = useHistory();
  let { url } = useRouteMatch();

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
        {privilege === "ADMIN" && (
          <Link to={`${url}`}>
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

      <div className="pt-4 pb-4">
        <Link to={`${url}/farm-monitoring`}>
          <button
            className="w-full px-4 py-2 text-left transition-colors duration-150 focus:outline-none active:bg-gray-200"
            onClick={() => {
              setLeftActive(false);
            }}
          >
            Farm Monitoring
          </button>
        </Link>
        <Link to={`${url}/inventory`}>
          <button
            className="w-full px-4 py-2 text-left transition-colors duration-150 focus:outline-none active:bg-gray-200"
            onClick={() => {
              setLeftActive(false);
            }}
          >
            Inventory
          </button>
        </Link>
        <Link to={`${url}/sales`}>
          <button
            className="w-full px-4 py-2 text-left transition-colors duration-150 focus:outline-none active:bg-gray-200"
            onClick={() => {
              setLeftActive(false);
            }}
          >
            Sales
          </button>
        </Link>
        <Link to={`${url}/orders`}>
          <button
            className="w-full px-4 py-2 text-left transition-colors duration-150 focus:outline-none active:bg-gray-200"
            onClick={() => {
              setLeftActive(false);
            }}
          >
            Orders
          </button>
        </Link>
        <Link to={`${url}/reports`}>
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

      <div className="pt-4 pb-4">
        <Link to={`${url}/profile`}>
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
}

export default AdminSidebar;
