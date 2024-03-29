import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { FirestoreContext } from "../../contexts/FirestoreContext";
import {
  CheckoutProduct,
  Order,
  PaymentMethod,
  User,
} from "../../luntian-types";
import { db, timestamp } from "../../utils/firebase";

interface CheckoutProps {
  selectedProducts: Array<string>;
  setCheckingOut(arg0: boolean): void;
}

const Checkout: React.FC<CheckoutProps> = ({
  selectedProducts,
  setCheckingOut,
}) => {
  const history = useHistory();
  const { products, userCart, userData } = useContext(FirestoreContext);
  const filteredProds = products.filter((el) =>
    selectedProducts.includes(el.id)
  );
  const prodQtys = userCart.filter((el) =>
    selectedProducts.includes(el.productID)
  );
  const finalProds = filteredProds.map((item) => {
    var newItem: CheckoutProduct = { ...item };
    prodQtys.forEach((x) => {
      if (x.productID === item.id)
        newItem = { ...newItem, quantity: x.quantity };
    });

    return newItem;
  });

  const getFullName = () => {
    const { firstName, lastName } = userData as User;
    return firstName + " " + lastName;
  };

  const getDeliveryAddress = () => {
    const { houseNumber, barangay, city, province, region, zipCode } =
      userData as User;
    return `${houseNumber} ${barangay}, ${city}, ${province}, ${region}, ${zipCode}`;
  };

  const getETA = () => {
    const now = new Date();
    now.setDate(now.getDate() + 2);
    return now;
  };

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
    const formatted = `${now.getDate()}-${now.getDate() + 2} ${
      months[now.getMonth()]
    }`;

    return formatted;
  };

  // DELIVERY OPTIONS
  const [selectedDelivery, setSelectedDelivery] = useState(0);
  const deliveryOptions = [
    {
      name: "Courier 1",
      eta: formatDate(getETA()),
    },
    {
      name: "Courier 2",
      eta: formatDate(getETA()),
    },
  ];

  // PAYMENT OPTIONS
  const [selectedPayment, setSelectedPayment] = useState(0);
  const paymentOptions: Array<{
    name: PaymentMethod;
    accountNumber: string;
  }> = [
    {
      name: "COD (Cash on Delivery)",
      accountNumber: "",
    },
    {
      name: "Online Payment",
      accountNumber: "",
    },
  ];

  const getTotal = () => {
    var total = 0;
    finalProds.forEach((x) => {
      total += x.price! * x.quantity!;
    });
    return total;
  };

  const getShipping = () => {
    // return Math.floor(Math.random() * 10 + 45);
    return 45;
  };

  const submitOrder = async () => {
    const docRef = db.collection("orders").doc();
    const toRate = finalProds.map((item) => item.id);
    const prods = finalProds.map((item) => ({
      productID: item.id,
      quantity: item.quantity,
    }));

    await docRef.set({
      orderDate: timestamp(),
      toRate,
      userID: userData.id,
      status: "NEW",
      paymentMethod: paymentOptions[selectedPayment].name,
      courier: deliveryOptions[selectedDelivery].name,
      deliveryAddress: getDeliveryAddress(),
      receiverName: getFullName(),
      receiverEmail: userData.email,
      receiverPhone: userData.phoneNumber,
      receiverPhoto: userData?.photoURL ?? "DEFAULT",
    } as Order);

    prods.forEach(async (prod) => {
      await docRef.collection("products").add({
        ...prod,
      });
    });

    const toDelete = userCart.filter((el) =>
      selectedProducts.includes(el.productID)
    );

    toDelete.forEach(async (prod) => {
      await db
        .collection("users")
        .doc(userData.id)
        .collection("cart")
        .doc(prod.id)
        .delete();
    });

    alert("Order Placed!");
    history.replace("/home");
  };

  return (
    <div className="flex flex-col items-start m-4">
      <div className="flex items-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-10 h-10 p-2 rounded-full active:bg-gray-100"
          onClick={() => {
            setCheckingOut(false);
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <h1 className="text-2xl">Checkout</h1>
      </div>

      {/* ITEM SUMMARY */}
      {finalProds.map((item) => (
        <ProductItem key={item.id} item={item} />
      ))}

      {/* ADDRESS */}
      <div className="w-full p-4 mt-6 bg-white rounded shadow">
        <h1 className="text-lg font-bold">Delivery Address</h1>
        <div className="flex flex-col w-full p-4 mt-4 bg-white border-2 border-green-500 rounded-md">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">{getFullName()}</h1>
            <p className="text-gray-500">{userData.phoneNumber}</p>
          </div>
          <p>{getDeliveryAddress()}</p>
        </div>
      </div>

      {/* DELIVERY OPTIONS */}
      <div className="w-full p-4 mt-6 bg-white rounded shadow">
        <h1 className="text-lg font-bold">Select Courier</h1>
        <div className="flex flex-row w-full pb-4 overflow-x-scroll">
          {deliveryOptions.map((option, i) => (
            <div
              key={option.name}
              onClick={() => setSelectedDelivery(i)}
              className={`flex cursor-pointer flex-col flex-shrink-0 p-4 mt-4 border-2 ${
                selectedDelivery === i ? "border-green-500" : "border-gray-300"
              } rounded-md w-64 ${i !== 0 && "ml-4"}`}
            >
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold">{option.name}</h1>
                <p className="text-gray-500">₱{getShipping().toFixed(2)}</p>
              </div>
              <p>Est. Arrival: {option.eta}</p>
            </div>
          ))}
        </div>
      </div>

      {/* PAYMENT METHOD */}
      <div className="w-full p-4 mt-6 bg-white rounded shadow">
        <h1 className="text-lg font-bold">Select Payment Method</h1>
        <div className="flex flex-row w-full pb-4 overflow-x-scroll">
          {paymentOptions.map((option, i) => (
            <div
              key={option.name}
              onClick={() => setSelectedPayment(i)}
              className={`flex cursor-pointer flex-col flex-shrink-0 p-4 mt-4 border-2 ${
                selectedPayment === i ? "border-green-500" : "border-gray-300"
              } rounded-md w-64 ${i !== 0 && "ml-4"}`}
            >
              <p>{option.name}</p>
              {/* <h1>{option.accountNumber}</h1> */}
            </div>
          ))}
        </div>
      </div>

      {/* OVERVIEW */}
      <div className="flex w-full h-px mt-8 bg-gray-300"></div>

      <div className="w-full p-4 mt-8 bg-white rounded shadow">
        <div className="flex items-center justify-between w-full">
          <h1 className="font-semibold">
            Merchandise Subtotal ({selectedProducts.length} Item/s)
          </h1>
          <p className="text-lg font-bold">₱{getTotal().toFixed(2)}</p>
        </div>

        <div className="flex items-center justify-between w-full mt-4">
          <h1>Shipping Fee</h1>
          <p className="text-lg font-bold">₱{getShipping().toFixed(2)}</p>
        </div>

        <div className="flex items-center justify-between w-full mt-4">
          <h1 className="text-lg font-bold">Order Amount</h1>
          <p className="text-lg font-bold">
            ₱{(getShipping() + getTotal()).toFixed(2)}
          </p>
        </div>
      </div>

      {/* FIXED BOTTOM */}
      <div className="flex w-full h-64"></div>
      <div className="fixed inset-x-0 bottom-0 flex w-full mx-auto mt-8 space-x-4 bg-white shadow max-w-7xl">
        <div className="flex items-center justify-end w-3/5 ">
          <div className="flex items-center justify-center">
            <p className="text-gray-500">Total: &nbsp;</p>
            <p className="text-lg font-bold text-green-500">
              ₱{(getShipping() + getTotal()).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center w-2/5 text-gray-200">
          <button
            disabled={selectedProducts.length === 0}
            onClick={() => submitOrder()}
            className={`w-full p-4 focus:outline-none ${
              selectedProducts.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 active:bg-green-400"
            }`}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductItem: React.FC<{ item: CheckoutProduct }> = ({ item }) => {
  return (
    <div className="flex w-full mt-4 h-36 ">
      <div className="w-1/3 shadow">
        <img
          src={item?.photoURL}
          alt={item?.id}
          className="object-cover w-full h-full rounded-l-md"
        />
      </div>

      <div className="flex flex-col w-2/3 p-2 bg-white shadow rounded-r-md">
        <div className="flex-1 w-full">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">
              {item?.name}
            </h1>
            <p className="text-xs text-gray-600">{item?.stock} left</p>
          </div>
          <p className="mt-4 text-lg font-bold text-green-500">
            ₱{item?.price}
          </p>
          <p>QTY: {item?.quantity}</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
