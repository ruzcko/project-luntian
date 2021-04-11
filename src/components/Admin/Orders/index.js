import React, { useContext } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { AdminContext } from "../../../contexts/AdminContext";

function AdminOrders() {
  let { url } = useRouteMatch();
  const { orders } = useContext(AdminContext);
  console.log({ orders });

  return (
    <div>
      <h1 className="text-2xl">Order List</h1>
      <div className="flex flex-col mt-8 space-y-2">
        {orders.map((order, idx) => (
          <Link key={order.id} to={`${url}/${order.id}`}>
            <div className="flex flex-row items-center justify-between px-4 py-2 bg-white shadow">
              <p>
                {`${idx + 1}. `}
                {order.id}
              </p>
              <p>{order.status}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AdminOrders;
