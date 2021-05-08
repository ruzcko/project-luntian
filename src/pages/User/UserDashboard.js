import React, { useState } from "react";
import {
  Redirect,
  Route,
  Switch,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import UserNavbar from "../../components/User/Navbar";
import UserSidebar from "../../components/User/Sidebar";
import ProductList from "../../components/User/ProductList";
import ProductItem from "../../components/User/ProductItem";
import OrderItem from "../../components/User/Orders/OrderItem";
import OrderList from "../../components/User/Orders/index";
import Cart from "../../components/User/Cart";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../utils/firebase";
import Loading from "../../components/Loading";
import Profile from "../../components/User/Profile";

function AdminDashboard() {
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
        if (!data.signupCompleted) {
          history.replace(`${path}/profile/${user.uid}`);
        }
      });
  }

  return user ? (
    <nav className="flex border-b border-gray-300">
      {/* Navbar */}
      <UserNavbar
        leftActive={leftActive}
        setLeftActive={setLeftActive}
        user={user}
      />

      {/* Sidebar */}
      <UserSidebar
        leftActive={leftActive}
        setLeftActive={setLeftActive}
        user={user}
      />

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
}

export default AdminDashboard;
