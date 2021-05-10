import React, { useState } from "react";
import {
  Redirect,
  Route,
  Switch,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import {
  Cart,
  OrderItem,
  OrderList,
  ProductItem,
  ProductList,
  UserNavbar,
  UserSidebar,
  Profile,
} from "../../components/User/index";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../utils/firebase";
import { Loading } from "../../components/index";

const UserDashboard: React.FC = () => {
  const history = useHistory();
  const [leftActive, setLeftActive] = useState(false);
  const { path } = useRouteMatch();
  const [user, loading] = useAuthState(auth);

  if (loading) return <Loading />;

  if (user) {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => doc.data())
      .then((data) => {
        if (data && !data.signupCompleted) {
          history.replace(`${path}/profile/${user.uid}`);
        }
      });
  }

  return user ? (
    <nav className="flex border-b border-gray-300">
      {/* Navbar */}
      <UserNavbar leftActive={leftActive} setLeftActive={setLeftActive} />

      {/* Sidebar */}
      <UserSidebar leftActive={leftActive} setLeftActive={setLeftActive} />

      {/* Content Switch */}
      <div className="absolute inset-0 flex overflow-hidden bg-gray-100 border-t border-gray-300 mt-14">
        <div
          className={`z-0 absolute inset-0 w-full max-w-7xl mx-auto overflow-y-scroll no-scrollbar`}
        >
          <Switch>
            <Route exact path={path} component={ProductList} />
            <Route path={`${path}/product/:id`} component={ProductItem} />
            <Route exact path={`${path}/orders`} component={OrderList} />
            <Route path={`${path}/orders/:id`} component={OrderItem} />
            <Route path={`${path}/rate/:id`} />
            <Route path={`${path}/cart`} component={Cart} />
            <Route path={`${path}/profile/:slug`} component={Profile} />
          </Switch>
        </div>
      </div>
    </nav>
  ) : (
    <Redirect to="/" />
  );
};

export default UserDashboard;
