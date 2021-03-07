import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "../../utils/firebase";

function ProductItem() {
  const [quantity, setQuantity] = useState(0);
  const { id } = useParams();
  const history = useHistory();
  const [product, loading] = useDocumentData(db.collection("products").doc(id));

  console.log({ product, loading });
  return (
    <div className="flex flex-col h-full bg-gray-100">
      {!loading && (
        <div className="relative flex flex-col h-full">
          <div className="relative">
            <img
              src={product.photoURL}
              alt={id}
              className="object-cover w-full h-full max-h-96"
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="absolute w-10 h-10 p-2 text-white bg-gray-700 rounded-full opacity-60 active:bg-gray-800 top-4 left-4"
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

          <div className="flex flex-col flex-1">
            <div className="flex flex-col p-4 space-y-4 bg-white">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">{product.name}</h1>

                <p>Stock: {product.stock}</p>
              </div>

              <p className="text-2xl font-semibold text-green-500">
                ₱{product.price}
              </p>

              <div className="flex items-center divide-x divide-gray-300">
                <div className="flex items-center mr-4 space-x-2">
                  <p className="text-lg">
                    {"★".repeat(product.averageRating)}
                    {"☆".repeat(5 - product.averageRating)}
                  </p>
                  <p>{product.averageRating}</p>
                </div>

                <p className="pl-4">{product.sold} Sold</p>
              </div>
            </div>

            <div className="p-4 mt-4 text-gray-500 bg-white">
              {product.description}
            </div>

            <div className="h-40 p-4 mt-4 mb-4 bg-white">
              <div className="flex items-center justify-between">
                <h2>42 Reviews</h2>

                <div className="flex items-center space-x-2">
                  <p className="text-lg">
                    {"★".repeat(product.averageRating)}
                    {"☆".repeat(5 - product.averageRating)}
                  </p>
                  <p>{product.averageRating}/5</p>
                </div>
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 z-10 flex flex-shrink-0 text-gray-100 bg-blue-400 item-center">
            <div className="flex items-center justify-center flex-1 space-x-4 text-gray-900 md:space-x-4">
              <button
                className="focus:outline-none"
                onClick={() => {
                  if (quantity > 0) setQuantity(quantity - 1);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="p-1 bg-gray-300 rounded-full w-7 h-7 active:bg-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 12H6"
                  />
                </svg>
              </button>

              <p className="text-xl text-gray-100 select-none">{quantity}</p>

              <button
                className="focus:outline-none"
                onClick={() => {
                  if (quantity < product.stock) setQuantity(quantity + 1);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="p-1 bg-gray-300 rounded-full w-7 h-7 active:bg-gray-400"
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
            <div className="flex-1">
              <button className="w-full py-4 bg-green-500">Add to Cart</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductItem;
