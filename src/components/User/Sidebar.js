import { auth } from "../../utils/firebase";
import { Link, useHistory, useRouteMatch } from "react-router-dom";

function UserSidebar({ leftActive = true, setLeftActive }) {
  const history = useHistory();
  let { url } = useRouteMatch();

  return (
    <div
      className={`z-10 absolute w-10/12 md:w-64 mt-14 inset-y-0 left-0 bg-white border-t border-r border-gray-300 transition-all duration-300 ${
        !leftActive && "-ml-sb md:-ml-64"
      }`}
    >
      <div className="pt-4">
        <Link to={`${url}/inventory`}>
          <button
            className="w-full px-4 py-2 text-left transition-colors duration-150 focus:outline-none active:bg-gray-200"
            onClick={() => {
              setLeftActive(false);
            }}
          >
            Edit Profile
          </button>
        </Link>
      </div>
      <div className="pt-4 pb-4">
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

export default UserSidebar;
