import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { AdminContext } from "../../../contexts/AdminContext";
import { FirestoreContext } from "../../../contexts/FirestoreContext";
import { db } from "../../../utils/firebase";
import firebase from "firebase";
import { OrderStatus } from "../../../luntian-types";
import { motion } from "framer-motion";
import { fadeInUp, stagger } from "../../../utils/framer-constants";
import Loading from "../../Loading";

const Button: React.FC<{ status: OrderStatus }> = ({ status }) => {
  const mapStatus = (status: OrderStatus) => {
    if (status === "NEW") {
      return "Book Courier";
    } else if (status === "FOR_DELIVERY") {
      return "Picked-Up";
    } else if (status === "IN_TRANSIT") {
      return "";
    } else if (status === "DELIVERED") {
    } else if (status === "CANCELLED") {
    }
  };

  return (
    <div className="flex items-center justify-center w-3/5 text-gray-200">
      <button
        className={`w-full p-4 focus:outline-none bg-green-500 active:bg-green-400`}
      >
        {mapStatus(status)}
      </button>
    </div>
  );
};

const OrderItem: React.FC = () => {
  const { orders } = useContext(AdminContext);
  const { products } = useContext(FirestoreContext);
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const order = orders.find((el) => el.id === id);
  const [productIDs, setProductIDs] = useState<
    Array<firebase.firestore.DocumentData>
  >([]);

  const filteredProds = products.filter((el) => {
    var found = false;
    productIDs.forEach(({ productID }) => {
      if (productID === el.id) found = true;
    });
    return found;
  });

  const finalProds = filteredProds.map((item) => {
    var newItem = { ...item };
    productIDs.forEach((x) => {
      if (x.productID === item.id)
        newItem = { ...newItem, quantity: x.quantity };
    });

    return newItem;
  });

  const formatDate = (now: Date) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const formatted = `${days[now.getDay()]} ${
      months[now.getMonth()]
    } ${now.getDate()}, ${now.getFullYear()}`;
    return formatted;
  };

  const cancelOrder = async () => {
    if (order) {
      console.log(order);
      await db.collection("orders").doc(order.id).delete();
      history.replace("/admin/orders");
    }
  };

  useEffect(() => {
    const unsub = db
      .collection("orders")
      .doc(id)
      .collection("products")
      .onSnapshot((snapshot) => {
        setProductIDs(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      });

    return unsub;
  }, [id]);

  return finalProds.length === 0 ? (
    <Loading />
  ) : order ? (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={stagger}
    >
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
        <h2 className="text-xl">{id}</h2>
      </div>

      <motion.div
        variants={fadeInUp}
        className="flex flex-row items-center justify-between w-full"
      >
        <p className="px-4 py-2 text-white bg-green-500 rounded-full">
          {order.status}
        </p>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        className="grid items-center w-full grid-cols-5 px-2 py-2 mt-4 mb-2 divide-x divide-gray-300 gap-x-2"
      >
        <p className="col-span-2">Product</p>
        <p className="text-center">Qty.</p>
        <p className="text-center">Price</p>
        <p className="text-center">Total</p>
      </motion.div>

      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={stagger}
        className="flex flex-col space-y-2"
      >
        {finalProds.map((item) => (
          <motion.div
            variants={fadeInUp}
            key={item.id}
            className="grid items-center w-full grid-cols-5 px-2 py-2 bg-white divide-x divide-gray-300 shadow gap-x-2"
          >
            <div className="flex items-center col-span-2 space-x-2">
              <img
                src={item.photoURL}
                alt={item.photoURL}
                className="object-cover w-20 h-20"
              />

              <h3 className="w-full text-center">{item.name}</h3>
            </div>
            <p className="text-center">{item.quantity}</p>
            <p className="text-center">₱{item.price.toFixed(2)}</p>
            <p className="text-center">
              ₱{(item.quantity * item.price).toFixed(2)}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Details */}
      <motion.div
        variants={fadeInUp}
        className="grid grid-cols-2 gap-4 p-2 mt-8 bg-white shadow"
      >
        <div className="flex flex-col space-y-2 divide-y divide-gray-300">
          <h3 className="text-lg">Payment Method</h3>
          <p className="text-gray-700">{order.paymentMethod}</p>
        </div>

        <div className="flex flex-col space-y-2 divide-y divide-gray-300">
          <h3 className="text-lg">Courier</h3>
          <p className="text-gray-700">{order.courier}</p>
        </div>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        className="flex flex-row items-center w-full p-2 mt-2 space-x-4 bg-white shadow"
      >
        <img
          src={order.receiverPhoto}
          alt={order.receiverPhoto}
          className="w-20 h-20 rounded-full"
        />

        <div>
          <p className="text-lg font-semibold">{order.receiverName}</p>
          <p className="text-gray-700">{order.receiverEmail}</p>
          <p className="text-sm text-gray-500">{order.receiverPhone}</p>
        </div>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        className="flex flex-col p-2 mt-2 space-y-2 bg-white divide-y divide-gray-300 shadow"
      >
        <h3 className="text-lg">Address</h3>
        <p className="text-gray-700">{order.deliveryAddress}</p>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        className="flex flex-col w-full p-2 mt-8 bg-white shadow md:w-1/2"
      >
        <motion.div variants={fadeInUp} className="flex">
          <h3>Order Date: &nbsp;</h3>
          <p className="text-gray-700">
            {formatDate(order.orderDate.toDate())}
          </p>
        </motion.div>

        {order.bookingDate && (
          <motion.div variants={fadeInUp} className="flex">
            <h3>Booking Date: &nbsp;</h3>
            <p className="text-gray-700">
              {formatDate(order.bookingDate.toDate())}
            </p>
          </motion.div>
        )}

        {order.pickupDate && (
          <motion.div variants={fadeInUp} className="flex">
            <h3>Pick-Up Date: &nbsp;</h3>
            <p className="text-gray-700">
              {formatDate(order.pickupDate.toDate())}
            </p>
          </motion.div>
        )}

        {order.deliverDate && (
          <motion.div variants={fadeInUp} className="flex">
            <h3>Deliver Date: &nbsp;</h3>
            <p className="text-gray-700">
              {formatDate(order.deliverDate.toDate())}
            </p>
          </motion.div>
        )}

        {order.reviewDate && (
          <motion.div variants={fadeInUp} className="flex">
            <h3>Review Date: &nbsp;</h3>
            <p className="text-gray-700">
              {formatDate(order.reviewDate.toDate())}
            </p>
          </motion.div>
        )}
      </motion.div>

      <div className="flex w-full h-64"></div>

      <div className="fixed inset-x-0 bottom-0 flex w-full mx-auto mt-8 bg-white shadow max-w-7xl">
        <div className="flex items-center justify-center w-2/5 ">
          <button
            onClick={cancelOrder}
            className={`w-full p-4 focus:outline-none bg-white active:bg-gray-200`}
          >
            Cancel
          </button>
        </div>

        <Button status={order.status} />
      </div>
    </motion.div>
  ) : null;
};

export default OrderItem;
