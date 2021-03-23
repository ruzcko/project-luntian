import React, { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { FirestoreContext } from "../../contexts/FirestoreContext";
import { auth, db } from "../../utils/firebase";

function Cart() {
  const history = useHistory();
  const [user] = useAuthState(auth);
  // const [cartItems] = useCollectionData(
  //   db.collection("users").doc(user.uid).collection("cart"),
  //   { idField: "id" }
  // );
  // const [products, setProducts] = useState([]);
  const { userCart: cartItems, products } = useContext(FirestoreContext);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const loading = cartItems === undefined || products === undefined;

  // const getProduct = async (id) => {
  //   const res = await db.collection("products").doc(id).get();

  //   return { ...res.data(), id: res.id };
  // };

  // useEffect(() => {
  //   if (cartItems) {
  //     const promises = cartItems.map(async (item) => {
  //       return await getProduct(item.productID);
  //     });

  //     let temp = [];
  //     Promise.all(promises).then((prods) => {
  //       prods.forEach((x) => temp.push(x));
  //       setProducts(temp);
  //     });
  //   }
  // }, [cartItems]);

  const handleQuantityChange = (id, quantity) => {
    db.collection("users")
      .doc(user.uid)
      .collection("cart")
      .doc(id)
      .update({ quantity });
  };

  const handleDelete = (id) => {
    db.collection("users").doc(user.uid).collection("cart").doc(id).delete();
  };

  const handleCheckboxChange = (id, checked) => {
    setSelectedProducts((curr) => {
      if (checked) return [...curr, id];
      else return curr.filter((el) => el !== id);
    });
  };

  const getSubtotal = () => {
    let total = 0;

    if (selectedProducts.length > 0 && cartItems) {
      cartItems.forEach((item) => {
        if (selectedProducts.includes(item.productID)) {
          console.log(item.id, "selected");
          const prod = products.find((el) => el.id === item.productID);
          total += parseFloat(prod?.price) * item.quantity;
        } else {
          console.log(item.id, "not selected");
        }
      });
    }

    return total.toFixed(2);
  };

  function Product({ id, item }) {
    const x = products.find((el) => el.id === id);

    return (
      <div className="flex w-full h-36 ">
        <div className="flex flex-col items-center justify-center h-full">
          <input
            checked={selectedProducts.includes(id)}
            onChange={(e) => handleCheckboxChange(id, e.target.checked)}
            type="checkbox"
            className="w-4 h-4 m-2 rounded focus:outline-none focus:ring-0"
          />
        </div>
        <div className="w-1/3 shadow">
          <img
            src={x?.photoURL}
            alt={x?.id}
            className="object-cover w-full h-full rounded-l-md"
          />
        </div>

        <div className="flex flex-col w-2/3 p-2 bg-white shadow rounded-r-md">
          <div className="flex-1 w-full">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-gray-800">{x?.name}</h1>
              <p className="text-xs text-gray-600">{x?.stock} left</p>
            </div>
            <p className="mt-4 text-lg font-bold text-green-500">₱{x?.price}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex text-gray-700">
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                disabled={item?.quantity === 1}
                className={`bg-gray-300 rounded-full focus:outline-none focus:ring-0 ${
                  item?.quantity === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "active:bg-gray-400"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-8 h-8 p-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 12H4"
                  />
                </svg>
              </button>

              <p className="flex items-center justify-center w-8 h-8">
                {item?.quantity}
              </p>

              <button
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                disabled={item?.quantity >= x?.stock}
                className={`bg-gray-300 rounded-full focus:outline-none focus:ring-0 ${
                  item?.quantity >= x?.stock
                    ? "opacity-50 cursor-not-allowed"
                    : "active:bg-gray-400"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-8 h-8 p-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
            </div>

            <button
              onClick={() => {
                const willDelete = window.confirm(
                  "Are you sure you want to delete this item?"
                );

                if (willDelete) handleDelete(item?.id);
              }}
              className="rounded-full focus:outline-none focus:ring-0 active:bg-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-8 h-8 p-2 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="m-4">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-10 h-10 p-2 rounded-full active:bg-gray-100"
            onClick={() => history.goBack()}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <h1 className="text-2xl">Cart</h1>
        </div>
      </div>

      <div className="flex flex-col m-4 space-y-4 pb-52">
        {loading ? (
          <div>Loading...</div>
        ) : (
          cartItems.map((item) => (
            <Product key={item.id} id={item.productID} item={item} />
          ))
        )}
      </div>

      <div className="fixed inset-x-0 bottom-0 flex w-full mx-auto mt-8 space-x-4 bg-white shadow max-w-7xl">
        <div className="flex items-center justify-between w-3/5 ">
          <div className="flex items-center justify-center">
            <input
              checked={cartItems?.length === selectedProducts.length}
              onChange={() => {
                if (cartItems.length !== selectedProducts.length) {
                  let temp = [];
                  cartItems.forEach(({ productID }) => temp.push(productID));
                  setSelectedProducts(() => temp);
                } else {
                  setSelectedProducts([]);
                }
              }}
              type="checkbox"
              className="w-4 h-4 m-2 ml-6 rounded focus:outline-none focus:ring-0"
            />
            <p>All</p>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-gray-500">Subtotal: &nbsp;</p>
            <p className="text-lg font-bold text-green-500">₱{getSubtotal()}</p>
          </div>
        </div>

        <div className="flex items-center justify-center w-2/5 text-gray-200">
          <button className="w-full p-4 bg-green-500 focus:outline-none active:bg-green-600">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
