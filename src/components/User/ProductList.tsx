import React, { useContext } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { FirestoreContext } from "../../contexts/FirestoreContext";
import { Product } from "../../luntian-types";

const ProductList: React.FC = () => {
  const { products: prod } = useContext(FirestoreContext);
  const products: Array<Product> = [...prod];
  const loading = products === undefined;
  const { url } = useRouteMatch();

  return (
    <div className="flex flex-col h-full px-4 pt-4">
      <div></div>
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

export default ProductList;
