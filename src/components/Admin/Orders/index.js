import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
function AdminOrders() {
  let { url } = useRouteMatch();

  return (
    <div>
      <h1 className="text-2xl">Order List</h1>
      <div className="flex flex-col space-y-2">
        {[...Array(10).keys()].map((i) => (
          <Link key={`order${i}`} to={`${url}/${i}`}>
            <div className="flex items-center justify-center w-20 h-10 bg-gray-100 active:bg-gray-200">
              Order {i}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AdminOrders;
