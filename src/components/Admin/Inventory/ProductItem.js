import React, { useRef, useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { db, storage } from "../../../utils/firebase";
import { FirestoreContext } from "../../../contexts/FirestoreContext";

function ProductItem() {
  const { id } = useParams();
  const history = useHistory();
  // const [product, loading] = useDocumentData(db.collection("products").doc(id));
  const { products } = useContext(FirestoreContext);
  const loading = products === undefined;
  const product = products?.find((el) => el.id === id);
  const [photo, setPhoto] = useState();
  const [stock, setStock] = useState(0);
  const nameRef = useRef("");
  const priceRef = useRef();
  const descriptionRef = useRef("");
  const types = ["image/png", "image/jpeg", "image/jpg"];

  useEffect(() => {
    if (product) {
      setStock(product.stock);
    }
  }, [product]);

  if (!loading && !product)
    return (
      <div className="h-full">
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

        <div className="flex items-center justify-center flex-1 h-full">
          Product not Found.
        </div>
      </div>
    );

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

  const handleDelete = () => {
    db.collection("products")
      .doc(id)
      .delete()
      .then(() => {
        history.goBack();
      });
  };

  const handleUpdate = () => {
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    const price = priceRef.current.value;

    let data = {};
    if (name !== "") data = { ...data, name };
    if (description !== "") data = { ...data, description };
    if (price !== "") data = { ...data, price: parseFloat(price) };

    data = { ...data, stock };
    nameRef.current.value = "";
    descriptionRef.current.value = "";
    priceRef.current.value = "";

    if (photo) {
      const storageRef = storage.ref(`products/${id}/${photo.name}`);
      storageRef.put(photo).on(
        "state_changed",
        (snap) => {
          // console.log((snap.bytesTransferred / snap.totalBytes) * 100);
        },
        (error) => {
          alert(error);
        },
        async () => {
          const photoURL = await storageRef.getDownloadURL();
          data = { ...data, photoURL };

          nameRef.current.value = "";
          descriptionRef.current.value = "";
          priceRef.current.value = "";

          db.collection("products")
            .doc(id)
            .update(data)
            .then(() => {
              alert(`Updated product ${id}`);
            });
        }
      );
    } else {
      nameRef.current.value = "";
      descriptionRef.current.value = "";
      priceRef.current.value = "";

      db.collection("products")
        .doc(id)
        .update(data)
        .then(() => {
          alert(`Updated product ${id}`);
        });
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
          <h1 className="text-xl ">{product?.name}</h1>

          <div className="flex items-center justify-center space-x-2 text-sm">
            <button
              onClick={() => {
                const res = window.confirm("are you sure you want to delete?");
                if (res) handleDelete();
              }}
              className="w-20 px-4 py-2 text-red-500 rounded-md active:bg-gray-100 focus:outline-none"
            >
              Delete
            </button>
            <button
              onClick={handleUpdate}
              className="w-20 px-4 py-2 text-white bg-green-500 rounded-md active:bg-green-600 focus:outline-none"
            >
              Update
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
                <img
                  src={product?.photoURL}
                  alt={product?.name}
                  className="object-cover w-full h-full rounded-md"
                />
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
                  placeholder={product?.name}
                  type="text"
                  className="mr-4 border-gray-300 rounded focus:outline-none focus:border-gray-500 focus:ring-0"
                />
              </div>
              <div className="flex flex-col w-1/4">
                <label className="font-semibold">Price</label>
                <input
                  ref={priceRef}
                  placeholder={product?.price}
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
                placeholder={product?.description}
                type="text"
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

                <p className="select-none md:text-xl">{stock}</p>

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
}

export default ProductItem;
