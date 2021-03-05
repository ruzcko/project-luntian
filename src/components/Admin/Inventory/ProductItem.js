import Reac, { useRef, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { products } from "../../../constants/products";
import { db, storage } from "../../../utils/firebase";

function ProductItem() {
  const { id } = useParams();
  const history = useHistory();
  const product = products.find((x) => x.id === id);
  const newProduct = id === "add-product";

  const [photo, setPhoto] = useState();
  const [stock, setStock] = useState(0);
  const nameRef = useRef("");
  const priceRef = useRef("");
  const descriptionRef = useRef("");

  const types = ["image/png", "image/jpeg", "image/jpg"];

  const changeHandler = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setPhoto(selected);
      handleImage(selected);
    } else {
      setPhoto(null);
      console.log("Please select an image file (png/jpg)");
    }
  };

  const handleImage = (photo) => {
    var reader = new FileReader();

    reader.onload = function (e) {
      let productImage = document.getElementById("product-placeholder");
      productImage.src = e.target.result;
    };

    reader.readAsDataURL(photo);
  };

  const handleAdd = () => {
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    const price = priceRef.current.value;

    const data = {
      name,
      description,
      price,
      stock,
      averageRating: 0,
    };

    const productsRef = db.collection("products");

    productsRef
      .add(data)
      .then((docRef) => {
        const storageRef = storage.ref(`products/${docRef.id}/${photo.name}`);
        storageRef.put(photo).on(
          "state_changed",
          (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          },
          (error) => {
            console.log(error);
          },
          async () => {
            const photoURL = await storageRef.getDownloadURL();

            productsRef.doc(docRef.id).set(
              {
                photoURL,
              },
              { merge: true }
            );

            alert("Product Added");
          }
        );
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = () => {};

  return (
    <div className="flex flex-col h-full ">
      <div className="flex-1 mb-8 overflow-y-scroll no-scrollbar">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8"
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

        <h1 className="mt-2 text-2xl">
          {product ? product.name : "Add Product"}
        </h1>

        <div className="mt-4">
          {!newProduct ? (
            <img
              src={product?.photoURL}
              alt={product?.name}
              className="object-cover w-3/4 rounded-md h-52"
            />
          ) : (
            <div>
              {photo ? (
                <img
                  id="product-placeholder"
                  alt="product-placeholder"
                  src="#"
                  className="object-cover w-3/4 rounded-md h-52"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="object-cover w-3/4 rounded-md h-52"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              )}
            </div>
          )}
          <div className="relative flex items-center justify-center w-3/4 py-2 mt-2 text-white bg-green-500 rounded-md cursor-pointer active:bg-green-600 ">
            <button className="">Change Photo</button>
            <input
              type="file"
              onChange={changeHandler}
              className="absolute inset-0 w-full opacity-0 cursor-pointer"
            />
          </div>
        </div>

        <div className="mt-4">
          <div className="flex space-x-4">
            <div className="flex flex-col w-3/4 mt-2">
              <label className="font-semibold">Product Name</label>
              <input
                ref={nameRef}
                placeholder={product?.name}
                type="text"
                className="border-gray-300 rounded focus:outline-none focus:border-gray-500 focus:ring-0"
              />
            </div>
            <div className="flex flex-col w-1/4 mt-2">
              <label className="font-semibold">Price</label>
              <input
                ref={priceRef}
                placeholder={newProduct ? "0.00" : product.price}
                step="0.01"
                type="number"
                className="border-gray-300 rounded focus:outline-none focus:border-gray-500 focus:ring-0"
              />
            </div>
          </div>

          <div className="flex flex-col w-full mt-2">
            <label className="font-semibold">Description</label>
            <textarea
              ref={descriptionRef}
              placeholder={product?.description}
              type="text"
              className="border-gray-300 rounded focus:outline-none focus:border-gray-500 focus:ring-0"
            />
          </div>
        </div>

        <div className="flex items-center justify-end mt-8 space-x-4">
          <label className="font-semibold">Stock</label>
          <div className="flex items-center space-x-2">
            <button
              className="focus:outline-none"
              onClick={() => {
                if (stock > 0) setStock(stock - 1);
              }}
            >
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

            <p className="select-none">
              {" "}
              {newProduct ? stock : product.quantity}
            </p>

            <button
              className="focus:outline-none"
              onClick={() => {
                setStock(stock + 1);
              }}
            >
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
      </div>

      <div className="flex w-full space-x-4 text-gray-100">
        <button className="flex-1 py-2 bg-red-500 rounded-md focus:outline-none active:bg-red-600">
          {newProduct ? "Cancel" : "Delete"}
        </button>
        <button
          className="flex-1 py-2 bg-green-500 rounded-md focus:outline-none active:bg-green-600"
          onClick={() => {
            newProduct ? handleAdd() : handleUpdate();
          }}
        >
          {newProduct ? "Add" : "Update"}
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
