import React from "react";
import { useParams, useHistory } from "react-router-dom";

function OrderItem() {
  const { id } = useParams();
  const history = useHistory();
  return (
    <div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-10 w-10"
          onClick={() => history.goBack()}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </div>

      <h1 className="text-2xl">Order {id}</h1>
    </div>
  );
}

export default OrderItem;
