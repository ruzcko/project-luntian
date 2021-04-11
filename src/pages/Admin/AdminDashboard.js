import React, { useState } from "react";
import UserSidebar from "../../components/User/Sidebar";
import AdminControls from "../../components/Admin/Controls";
import AdminProfile from "../../components/Admin/Profile";
import AdminFarmMonitoring from "../../components/Admin/FarmMonitoring";
import AdminInventory from "../../components/Admin/Inventory/index";
import AdminReports from "../../components/Admin/Reports";
import AdminSales from "../../components/Admin/Sales";
import AdminOrders from "../../components/Admin/Orders/index";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Navbar from "../../components/Admin/Navbar";
import OrderItem from "../../components/Admin/Orders/OrderItem";
import ProductItem from "../../components/Admin/Inventory/ProductItem";
import AddProductItem from "../../components/Admin/Inventory/AddProductItem";
import { AdminProvider } from "../../contexts/AdminContext";

function AdminDashboard({ user, privilege }) {
  const [leftActive, setLeftActive] = useState(false);
  const { path } = useRouteMatch();

  return (
    <AdminProvider>
      <nav className="flex border-b border-gray-300">
        {/* Navbar */}
        <Navbar
          leftActive={leftActive}
          setLeftActive={setLeftActive}
          user={user}
        />

        {/* Sidebar */}
        <UserSidebar
          leftActive={leftActive}
          setLeftActive={setLeftActive}
          user={user}
          privilege={privilege}
        />

        {/* Content Switch */}
        <div className="absolute inset-0 flex overflow-hidden bg-gray-100 mt-14">
          <div
            className={`z-0 absolute inset-0 w-full p-4 max-w-7xl mx-auto overflow-y-scroll no-scrollbar`}
          >
            <Switch>
              {privilege === "ADMIN" ? (
                <Route exact path={path} component={AdminControls} />
              ) : (
                <Route path={path} component={AdminFarmMonitoring} />
              )}
              <Route
                path={`${path}/farm-monitoring`}
                component={AdminFarmMonitoring}
              />
              <Route
                exact
                path={`${path}/inventory`}
                component={AdminInventory}
              />
              <Route
                exact
                path={`${path}/inventory/add-product`}
                component={AddProductItem}
              />
              <Route path={`${path}/inventory/:id`} component={ProductItem} />
              <Route path={`${path}/sales`} component={AdminSales} />
              <Route exact path={`${path}/orders`} component={AdminOrders} />
              <Route path={`${path}/orders/:id`} component={OrderItem} />
              <Route path={`${path}/reports`} component={AdminReports} />
              <Route path={`${path}/profile`} component={AdminProfile} />
            </Switch>
          </div>
        </div>
      </nav>
    </AdminProvider>
  );
}

export default AdminDashboard;
