import { Button } from "@material-tailwind/react";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setHotels } from "../../reduxStore/HotelSlice";
import { toast } from "react-toastify";

const AddHotel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    location: "",
    description: "",
    phone: "",
    email: "",
    image: null,
    ownerName: "",
    ownerEmail: "",
    ownerPassword: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  const onChangeFileHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInput({
        ...input,
        image: file,
      });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onChangeInputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("location", input.location);
    formData.append("description", input.description);
    formData.append("phone", input.phone);
    formData.append("email", input.email);
    formData.append("ownerName", input.ownerName);
    formData.append("ownerEmail", input.ownerEmail);
    formData.append("ownerPassword", input.ownerPassword);

    if (input.image) {
      formData.append("image", input.image);
    }

    try {
      const res = await axios.post(
        "http://localhost:5500/api/v1/hotel/create",
        formData,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setHotels(res.data.hotel));
        toast.success(res.data.message);
        navigate(-1);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-gray-800 text-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300 p-4">
        <h2 className="text-2xl font-bold text-center mb-4">ADD A NEW HOTEL</h2>

        <form onSubmit={submitHandler} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Hotel Name */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-300 mb-1">
                Hotel Name
              </label>
              <input
                type="text"
                onChange={onChangeInputHandler}
                value={input.name}
                name="name"
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Enter hotel name"
                required
              />
            </div>

            {/* Location */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-300 mb-1">
                Location
              </label>
              <input
                type="text"
                onChange={onChangeInputHandler}
                value={input.location}
                name="location"
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Enter location"
                required
              />
            </div>

            {/* Description */}
            <div className="col-span-2 flex flex-col">
              <label className="text-sm font-medium text-gray-300 mb-1">
                Description
              </label>
              <textarea
                name="description"
                rows="2"
                value={input.description}
                onChange={onChangeInputHandler}
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Enter hotel description"
                required
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-300 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                onChange={onChangeInputHandler}
                value={input.phone}
                name="phone"
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Enter phone number"
                required
              />
            </div>

            {/* Hotel Email */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-300 mb-1">
                Hotel Email
              </label>
              <input
                type="email"
                value={input.email}
                onChange={onChangeInputHandler}
                name="email"
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Enter hotel email"
                required
              />
            </div>

            {/* Image Upload and Preview */}
          

            {/* Owner Name */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-300 mb-1">
                Owner Name
              </label>
              <input
                type="text"
                onChange={onChangeInputHandler}
                value={input.ownerName}
                name="ownerName"
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Enter owner name"
                required
              />
            </div>



            {/* Owner Email */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-300 mb-1">
                Owner Email
              </label>
              <input
                type="email"
                value={input.ownerEmail}
                onChange={onChangeInputHandler}
                name="ownerEmail"
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Enter owner email"
                required
              />
            </div>

            {/* Owner Password */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-300 mb-1">
                Owner Password
              </label>
              <input
                type="password"
                value={input.ownerPassword}
                onChange={onChangeInputHandler}
                name="ownerPassword"
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Enter owner password"
                required
              />
            </div>
            <div className="col-span-2 flex flex-col">
              <label className="text-sm font-medium text-gray-300 mb-1">
                Hotel Image
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 cursor-pointer hover:bg-gray-600 transition duration-200">
                  <span className="text-sm">
                    {input.image ? input.image.name : "Choose File"}
                  </span>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={onChangeFileHandler}
                    className="hidden"
                    required
                  />
                </label>
              </div>
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Hotel Preview"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-4">
            <Button
              onClick={handleCancel}
              className="bg-red-600 text-white px-6 py-2 rounded-md shadow-md transform transition-all duration-300 hover:bg-red-700 hover:scale-105 hover:shadow-lg"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md transform transition-all duration-300 hover:bg-blue-700 hover:scale-105 hover:shadow-lg"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHotel;