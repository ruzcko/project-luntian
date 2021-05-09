import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { db, storage } from "../../../utils/firebase";

const AddProductItem: React.FC = () => {
  const history = useHistory();
  const [photo, setPhoto] = useState<File | null>(null);
  const [stock, setStock] = useState(0);
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [error, setError] = useState("Select an image.");
  const types = ["image/png", "image/jpeg", "image/jpg"];
  console.log(error);

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      let selected = e.target.files[0];
      if (selected && types.includes(selected.type)) {
        setPhoto(selected);
        handleImage(selected);
      } else {
        setPhoto(null);
        setError("Please select an image file (png/jpg)");
      }
    }
  };

  const handleImage = (photo: File) => {
    var reader = new FileReader();

    reader.onload = function (e) {
      let productImage = document.getElementById(
        "product-placeholder"
      ) as HTMLImageElement;

      if (e.target?.result) {
        productImage.src = e.target.result as string;
      }
    };

    reader.readAsDataURL(photo);
  };

  const handleAdd = () => {
    const name = nameRef.current!.value;
    const description = descriptionRef.current!.value;
    const price = priceRef.current!.value;

    const data = {
      name,
      description,
      price: parseFloat(price),
      stock,
      averageRating: 0,
      sold: 0,
    };

    let errorMsg = "";
    let errorCount = 0;
    let valid = false;

    if (name === "") {
      errorMsg += "Name is required.\n";
      errorCount++;
    }
    if (description === "") {
      errorMsg += "Description is required.\n";
      errorCount++;
    }
    if (price === "") {
      errorMsg += "Price is required.\n";
      errorCount++;
    }
    if (!photo) {
      errorMsg += "Photo is required.\n";
      errorCount++;
    }

    if (errorCount === 0) valid = true;

    if (valid) {
      const productsRef = db.collection("products");
      productsRef
        .add(data)
        .then((docRef) => {
          if (photo) {
            const storageRef = storage.ref(
              `products/${docRef.id}/${photo.name}`
            );
            storageRef.put(photo).on(
              "state_changed",
              (snap) => {},
              (error) => {
                alert(error);
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
                history.goBack();
              }
            );
          }
        })
        .catch(alert);
    } else {
      alert(errorMsg);
    }
  };

  return (
    <div className="flex flex-col h-full ">
      <div className="flex-1 overflow-y-scroll no-scrollbar">
        <div>
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
        </div>

        <div className="flex items-center justify-between w-full pb-4 mt-8 border-b border-gray-300">
          <h1 className="text-xl ">Add Product</h1>

          <div className="flex items-center justify-center space-x-2 text-sm">
            <button
              onClick={() => {
                history.goBack();
              }}
              className="w-20 px-4 py-2 text-red-500 rounded-md active:bg-gray-100 focus:outline-none"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              className="w-20 px-4 py-2 text-white bg-green-500 rounded-md active:bg-green-600 focus:outline-none"
            >
              Add
            </button>
          </div>
        </div>

        <div className="flex flex-col mt-4 md:flex-row">
          <div className="flex flex-col flex-1 mt-4 mr-4 md:items-center md:justify-center md:mr-0">
            <div className="w-3/4 md:w-full md:max-w-lg h-52 md:h-72">
              {photo ? (
                <img
                  id="product-placeholder"
                  alt="product-placeholder"
                  src="#"
                  className="object-cover w-full h-full rounded-md"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded-md select-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-20 h-20 text-gray-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div className="relative flex items-center justify-center w-3/4 py-2 mt-2 text-gray-800 bg-gray-200 rounded-md cursor-pointer md:w-full md:max-w-lg active:bg-gray-300">
              <button className="">Change Photo</button>
              <input
                type="file"
                onChange={changeHandler}
                className="absolute inset-0 w-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex flex-col flex-1 mt-4 md:items-center md:justify-center">
            <div className="flex w-full md:max-w-lg">
              <div className="flex flex-col w-3/4">
                <label className="font-semibold ">Product Name</label>
                <input
                  ref={nameRef}
                  type="text"
                  className="mr-4 border-gray-300 rounded focus:outline-none focus:border-gray-500 focus:ring-0"
                />
              </div>
              <div className="flex flex-col w-1/4">
                <label className="font-semibold">Price</label>
                <input
                  ref={priceRef}
                  placeholder={"0.0"}
                  step="0.01"
                  type="number"
                  className="border-gray-300 rounded focus:outline-none focus:border-gray-500 focus:ring-0"
                />
              </div>
            </div>

            <div className="flex flex-col flex-1 w-full mt-2 md:max-w-lg">
              <label className="font-semibold">Description</label>
              <textarea
                ref={descriptionRef}
                className="h-32 border-gray-300 rounded resize-none md:h-full focus:outline-none focus:border-gray-500 focus:ring-0"
              />
            </div>

            <div className="flex items-center justify-end mt-8 space-x-4 md:mt-4 md:flex-col md:space-x-0">
              <label className="font-semibold">Stock</label>
              <div className="flex items-center space-x-2 md:space-x-4">
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
                    className="p-2 bg-gray-200 rounded-full w-9 h-9 md:w-10 md:h-10 active:bg-gray-300"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 12H6"
                    />
                  </svg>
                </button>

                <p className="select-none md:text-xl"> {stock}</p>

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
                    className="p-2 bg-gray-200 rounded-full w-9 h-9 md:w-10 md:h-10 active:bg-gray-300"
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
        </div>
      </div>
    </div>
  );
};

export default AddProductItem;
