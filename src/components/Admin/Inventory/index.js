import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { products } from "../../../constants/products";

function AdminInventory() {
  let { url } = useRouteMatch();

  return (
    <div className="flex flex-col divide-y divide-gray-300">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl">Inventory</h1>

        <Link to={`${url}/add-product`}>
          <button className="w-10 h-10 rounded-full active:bg-gray-100 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
        </Link>
      </div>
      <div className="h-full pt-4">
        <div className="flex">
          <p className="w-2/3 py-2 ml-4 text-lg">Products</p>
          <p className="w-1/3 py-2 -ml-4 text-lg text-center">Stock</p>
        </div>

        <div className="flex flex-col mt-4 space-y-4">
          {products.map((product) => (
            <div className="flex " key={product.id}>
              <Link
                to={`${url}/${product.id}`}
                className="flex items-center w-2/3 bg-white border rounded-md shadow-md select-none active:bg-gray-50"
              >
                <img
                  src={product.photoURL}
                  alt={product.id}
                  className="object-cover w-32 h-32 m-2 rounded"
                />
                <div>
                  <h2 className="text-2xl">{product.name}</h2>
                  <p className="mt-2 text-sm text-gray-500">
                    {product.description}
                  </p>
                </div>
              </Link>

              {/* Controls */}
              <div className="flex items-center justify-center w-1/3 space-x-4">
                <button className="focus:outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-8 h-8 p-2 bg-gray-100 rounded-full hover:bg-gray-200 active:bg-gray-300"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 12H6"
                    />
                  </svg>
                </button>

                <p className="select-none">{product.quantity}</p>

                <button className="focus:outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-8 h-8 p-2 bg-gray-100 rounded-full hover:bg-gray-200 active:bg-gray-300"
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminInventory;
