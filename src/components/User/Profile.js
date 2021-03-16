import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, storage } from "../../utils/firebase";
import Loading from "../Loading";
import regions from "../../assets/regions.json";

function Profile() {
  const [user, loading] = useAuthState(auth);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [photo, setPhoto] = useState();
  const [error, setError] = useState();
  const types = ["image/png", "image/jpeg", "image/jpg"];

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .onSnapshot((snapshot) => {
          setValues(() => ({ ...snapshot.data() }));
        });
    }
  }, [user]);

  const changeHandler = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setPhoto(selected);
      handleImage(selected);
    } else {
      setPhoto(null);
      setError("Please select an image file (png/jpg)");
    }
  };

  const handleImage = (photo) => {
    var reader = new FileReader();

    reader.onload = function (e) {
      let productImage = document.getElementById("image-placeholder");
      productImage.src = e.target.result;
    };

    reader.readAsDataURL(photo);
  };

  if (loading) return <Loading />;

  const handleChange = (e, key) => {
    setValues((old) => ({
      ...old,
      [key]: e,
    }));
  };

  const handleUpdate = () => {
    const { firstName, lastName } = values;

    if (!firstName)
      setErrors((old) => ({ ...old, firstName: "First Name is required." }));
    else setErrors((old) => ({ ...old, firstName: "" }));

    if (!lastName)
      setErrors((old) => ({ ...old, lastName: "Last Name is required." }));
    else setErrors((old) => ({ ...old, lastName: "" }));

    const data = {
      ...values,
    };

    if (user) {
      const dataRef = db.collection("users").doc(user.uid);
      dataRef.update(data).then(() => {
        if (photo) {
          const storageRef = storage.ref(`users/${user.uid}/dp.jpg`);

          storageRef.put(photo).on(
            "state_changed",
            () => {},
            (error) => {
              alert(error);
            },
            async () => {
              const photoURL = await storageRef.getDownloadURL();
              dataRef.set(
                {
                  photoURL,
                },
                { merge: true }
              );
              alert("Updated Profile Successfully");
            }
          );
        } else {
          alert("Updated Profile Successfully");
        }
      });
    }
  };

  return (
    <div className="flex flex-col h-full m-4">
      <div className="">
        <h1 className="text-xl">Profile</h1>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4">
        <div>
          <img
            id="image-placeholder"
            src={values.photoURL}
            alt="profile_picture"
            className="w-1/2 md:w-80"
          />
          <div className="relative flex items-center justify-center w-1/2 py-2 mt-2 text-gray-800 bg-gray-200 rounded-md cursor-pointer md:w-full md:max-w-lg active:bg-gray-300">
            <button className="">Change Photo</button>
            <input
              type="file"
              onChange={changeHandler}
              className="absolute inset-0 w-full opacity-0 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1 space-y-2">
          <div className="flex w-full space-x-2">
            <div className="flex-1">
              <p className="text-gray-600">First Name</p>
              <input
                value={values.firstName}
                onChange={(e) => {
                  handleChange(e.target.value, "firstName");
                }}
                type="text"
                className={`w-full px-4 py-2 bg-gray-100 rounded focus:outline-none focus:ring-0 ${
                  errors.firstName ? "border-red-500" : "border-gray-400"
                }`}
              />
              {errors.firstName && (
                <p className="text-xs text-red-500">{errors.firstName}</p>
              )}
            </div>
            <div className="flex-1">
              <p className="text-gray-600">Last Name</p>
              <input
                value={values.lastName}
                onChange={(e) => {
                  handleChange(e.target.value, "lastName");
                }}
                type="text"
                className={`w-full px-4 py-2 bg-gray-100 rounded focus:outline-none focus:ring-0 ${
                  errors.lastName ? "border-red-500" : "border-gray-400"
                }`}
              />
              {errors.lastName && (
                <p className="text-xs text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <p className="text-gray-600">Bio</p>
            <textarea
              value={values.bio}
              onChange={(e) => {
                handleChange(e.target.value, "bio");
              }}
              type="text"
              className="w-full px-4 py-2 bg-gray-100 border-gray-400 rounded focus:outline-none focus:ring-0"
            />
          </div>

          <div className="flex flex-col pt-8 md:space-x-2 md:flex-row">
            <div className="flex flex-col flex-1 ">
              <p className="text-gray-600">Region</p>
              <select
                id="region_select"
                onChange={(e) => {
                  handleChange(e.target.value, "region");
                  handleChange(null, "province");
                  handleChange(null, "city");
                }}
                className="bg-gray-100 border-gray-400 rounded focus:outline-none focus:ring-0"
                value={values.region ?? "disable"}
              >
                <option disabled defaultValue value="disable">
                  Select a Region
                </option>
                {Object.keys(regions).map((key) => (
                  <option value={key} key={key}>
                    {regions[key]["region_name"]}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col flex-1 ">
              <p className="text-gray-600">Province</p>
              <select
                id="province_select"
                onChange={(e) => {
                  handleChange(e.target.value, "province");
                  handleChange(null, "city");
                }}
                value={values.province ?? "disable"}
                className="bg-gray-100 border-gray-400 rounded focus:outline-none focus:ring-0"
              >
                <option disabled defaultValue value="disable">
                  Select a Province
                </option>
                {values.region &&
                  Object.keys(regions[values.region]["province_list"]).map(
                    (key) => (
                      <option value={key} key={key}>
                        {key}
                      </option>
                    )
                  )}
              </select>
            </div>

            <div className="flex flex-col flex-1 ">
              <p className="text-gray-600">City</p>
              <select
                id="city_select"
                onChange={(e) => {
                  handleChange(e.target.value, "city");
                }}
                value={values.city ?? "disable"}
                className="bg-gray-100 border-gray-400 rounded focus:outline-none focus:ring-0"
              >
                <option disabled defaultValue value="disable">
                  Select a City
                </option>
                {values.province &&
                  Object.keys(
                    regions[values.region]["province_list"][values.province][
                      "municipality_list"
                    ]
                  ).map((key) => (
                    <option value={key} key={key}>
                      {key}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <div className="flex space-x-2">
              <div className="flex-1">
                <p className="text-gray-600">House Number and Street</p>
                <input
                  value={values.houseNumber}
                  onChange={(e) => {
                    handleChange(e.target.value, "houseNumber");
                  }}
                  type="text"
                  className="w-full px-4 py-2 bg-gray-100 border-gray-400 rounded focus:outline-none focus:ring-0"
                />
              </div>
              <div className="flex flex-1 space-x-2">
                <div className="flex-1">
                  <p className="text-gray-600">Barangay</p>
                  <input
                    value={values.barangay}
                    onChange={(e) => {
                      handleChange(e.target.value, "barangay");
                    }}
                    type="text"
                    className="w-full px-4 py-2 bg-gray-100 border-gray-400 rounded focus:outline-none focus:ring-0"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-gray-600">Zip Code</p>
                  <input
                    value={values.zipCode}
                    onChange={(e) => {
                      handleChange(e.target.value, "zipCode");
                    }}
                    type="text"
                    className="w-full px-4 py-2 bg-gray-100 border-gray-400 rounded focus:outline-none focus:ring-0"
                  />
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="flex-1">
                <p className="text-gray-600">Contact Number</p>
                <input
                  value={values.phoneNumber}
                  onChange={(e) => {
                    handleChange(e.target.value, "phoneNumber");
                  }}
                  type="text"
                  placeholder="09XXXXXXXXX"
                  maxLength="11"
                  className="w-full px-4 py-2 bg-gray-100 border-gray-400 rounded focus:outline-none focus:ring-0"
                />
              </div>

              <div className="flex flex-col flex-1 h-full">
                <p className="text-gray-600">Email</p>
                <p className="w-full px-4 py-2 bg-gray-300 border-gray-400 rounded focus:outline-none focus:ring-0">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col pt-8 space-y-2 text-gray-200">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 mx-auto bg-green-500 rounded md:w-48 md:ml-auto md:mr-0"
            >
              Update Profile
            </button>
            <button className="px-4 py-2 mx-auto text-gray-900 rounded md:w-48 md:ml-auto md:mr-0">
              Set Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
