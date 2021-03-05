import React, { useState } from "react";
import AdminSidebar from "../../components/Admin/Sidebar";
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

function AdminDashboard({ user }) {
  const [leftActive, setLeftActive] = useState(false);
  const { path } = useRouteMatch();

  return (
    <nav className="flex border-b border-gray-300">
      {/* Navbar */}
      <Navbar
        leftActive={leftActive}
        setLeftActive={setLeftActive}
        user={user}
      />

      {/* Sidebar */}
      <AdminSidebar
        leftActive={leftActive}
        setLeftActive={setLeftActive}
        user={user}
      />

      {/* Content Switch */}
      <div className="absolute inset-0 flex overflow-hidden mt-14">
        <div
          className={`z-0 absolute inset-0 w-full p-4 max-w-7xl mx-auto overflow-y-scroll no-scrollbar`}
        >
          <Switch>
            <Route exact path={path} component={AdminControls} />
            <Route
              path={`${path}/farm-monitoring`}
              component={AdminFarmMonitoring}
            />
            <Route exact path={`${path}/inventory`} component={AdminInventory} />
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
  );
}

export default AdminDashboard;
