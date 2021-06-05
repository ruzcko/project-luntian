import React from "react";
import { useParams } from "react-router";

const OrderItem: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <div>Order {id}</div>;
};

export default OrderItem;
