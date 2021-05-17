import React, { useContext } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { FirestoreContext } from "../../contexts/FirestoreContext";
import { Product } from "../../luntian-types";
import { useHistory } from "react-router-dom";

const Marketplace: React.FC = () => {
  const { products: prod } = useContext(FirestoreContext);
  const products: Array<Product> = [...prod];
  const loading = products === undefined;
  const { url } = useRouteMatch();
  const history = useHistory();

  return (
    <div className="px-4 pt-4">
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
        <h2 className="text-xl">Marketplace</h2>
      </div>

      <div className="flex-1">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {!loading ? (
            products.map((product) => (
              <Link to={`${url}/product/${product.id}`} key={product.id}>
                <div className="h-full overflow-hidden bg-white rounded shadow">
                  <img
                    className="object-cover w-full h-44"
                    src={product.photoURL}
                    alt={product.id}
                  />

                  <div className="flex flex-col p-2">
                    <h2 className="font-semibold">{product.name}</h2>

                    <p className="text-sm text-gray-500 h-14 overflow-ellipsis">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <p className="text-xl font-semibold text-green-500">
                        ₱{product.price}
                      </p>

                      <div className="flex justify-end space-x-2">
                        <p className="hidden text-xs md:block">
                          {"★".repeat(product.averageRating!)}
                          {"☆".repeat(5 - product.averageRating!)}
                        </p>

                        <p className="text-xs">{product.sold} Sold</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
