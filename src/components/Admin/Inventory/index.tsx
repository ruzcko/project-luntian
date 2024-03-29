import React, { useContext } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { db } from "../../../utils/firebase";
import { FirestoreContext } from "../../../contexts/FirestoreContext";
import { Product } from "../../../luntian-types";
import { motion } from "framer-motion";
import { fadeInUp, stagger } from "../../../utils/framer-constants";

const AdminInventory: React.FC = () => {
  let { url } = useRouteMatch();
  const { products: values } = useContext(FirestoreContext);
  const loading = values === undefined;
  const history = useHistory();

  const handleStock = ({ id, stock }: Product) => {
    db.collection("products")
      .doc(id)
      .update({ stock })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="flex flex-col divide-y divide-gray-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
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
          <h2 className="text-xl">Inventory</h2>
        </div>

        <Link to={`${url}/add-product`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-10 h-10 p-2 rounded-full active:bg-gray-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </Link>
      </div>
      <div className="h-full pt-4">
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={stagger}
          className="grid grid-cols-2 gap-4 lg:grid-cols-3"
        >
          {!loading &&
            values.map((p) => {
              const product: Product = { ...p };
              return (
                <motion.div
                  variants={fadeInUp}
                  className="flex flex-col md:flex-row"
                  key={product.id}
                >
                  <Link
                    to={`${url}/${product.id}`}
                    className="flex flex-col items-center flex-1 bg-white border rounded shadow-md select-none active:bg-gray-50 md:flex-row"
                  >
                    <img
                      src={product.photoURL}
                      alt={product.id}
                      className="object-cover w-full rounded-sm rounded-t h-36 md:h-32 md:rounded-l md:rounded-t-none md:w-32"
                    />
                    <div className="w-full p-2">
                      <h2 className="text-lg md:text-xl">{product.name}</h2>
                      <p className="mt-2 text-sm text-gray-500 overflow-ellipsis ">
                        {product.description}
                      </p>
                    </div>
                  </Link>

                  {/* Controls */}
                  <div className="flex flex-row-reverse items-center justify-center mt-2 ml-2 md:flex-col md:mt-0">
                    <button
                      className="focus:outline-none"
                      onClick={() => {
                        handleStock({
                          id: product.id!,
                          stock: product.stock! + 1,
                        });
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-10 h-10 p-2 bg-gray-100 rounded-full active:bg-gray-200"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </button>

                    <p className="mx-2 select-none">{product.stock}</p>

                    <button
                      className="focus:outline-none"
                      onClick={() => {
                        handleStock({
                          id: product.id!,
                          stock: product.stock! - 1,
                        });
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-10 h-10 p-2 bg-gray-100 rounded-full active:bg-gray-200"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18 12H6"
                        />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              );
            })}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminInventory;
