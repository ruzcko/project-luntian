import { motion } from "framer-motion";
import React, { useContext } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { AdminContext } from "../../../contexts/AdminContext";
import { fadeInUp, stagger } from "../../../utils/framer-constants";

const AdminOrders: React.FC = () => {
  const history = useHistory();
  let { url } = useRouteMatch();
  const { orders } = useContext(AdminContext);

  return (
    <div>
      <div className="flex items-center mb-4 space-x-2">
        <svg
          onClick={() => history.goBack()}
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 p-2 rounded-full cursor-pointer hover:bg-gray-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <h2 className="text-xl">Orders</h2>
      </div>

      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={stagger}
        className="flex flex-col mt-8 space-y-2"
      >
        {orders.map((order, idx) => (
          <motion.div key={order.id} variants={fadeInUp}>
            <Link to={`${url}/${order.id}`}>
              <div className="flex flex-row items-center justify-between px-4 py-2 bg-white shadow">
                <p>
                  {`${idx + 1}. `}
                  {order.id}
                </p>
                <p>{order.status}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AdminOrders;
