import React, { useState } from "react";
import { UserSidebar } from "../../components/User/index";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { AdminProvider } from "../../contexts/AdminContext";
import { Privilege } from "../../luntian-types";
import {
  AddProductItem,
  AdminControls,
  AdminInventory,
  AdminOrders,
  AdminReports,
  AdminSales,
  OrderItem,
  ProductItem,
} from "../../components/Admin/index";
import { UserNavbar } from "../../components/User/index";
import { Monitoring } from "../Monitoring";

interface AdminDashboardProps {
  privilege: Privilege;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ privilege }) => {
  const [leftActive, setLeftActive] = useState(false);
  const { path } = useRouteMatch();

  return (
    <AdminProvider>
      <nav className="flex border-b border-gray-300">
        {/* Navbar */}
        <UserNavbar leftActive={leftActive} setLeftActive={setLeftActive} />

        {/* Sidebar */}
        <UserSidebar leftActive={leftActive} setLeftActive={setLeftActive} />

        {/* Content Switch */}
        <div className="absolute inset-0 flex overflow-hidden bg-gray-100 mt-14">
          <div
            className={`z-0 absolute inset-0 w-full p-4 max-w-7xl mx-auto overflow-y-scroll no-scrollbar`}
          >
            <Switch>
              {privilege === "ADMIN" ? (
                <Route exact path={path} component={AdminControls} />
              ) : (
                <Route path={`/monitoring`} component={Monitoring} />
              )}
              <Route path={`/monitoring`} component={Monitoring} />
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
            </Switch>
          </div>
        </div>
      </nav>
    </AdminProvider>
  );
};

export default AdminDashboard;
