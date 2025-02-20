import { useState } from "react";
import Navbar from "../shared/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { setUser } from "../../reduxStore/authSlice";
import { FaPhotoFilm } from "react-icons/fa6";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    avatar: null,
  });

  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const avatarHandler = (e) => {
    const avatar = e.target.files[0];
    setInput((prevInput) => ({ ...prevInput, avatar }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("email", input.email);
    formData.append("phone", input.phone);
    if (input.avatar) {
      formData.append("avatar", input.avatar);
    }
    try {
      const res = await axios.put(
        "http://localhost:8000/api/v1/users/update-user",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
        navigate(-1);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <div className="flex items-center mt-1">
                <label className="relative flex items-center cursor-pointer">
                  <input
                    type="file"
                    name="avatar"
                    className="sr-only"
                    accept="image/*"
                    onChange={avatarHandler}
                  />
                  <span className=" inline-flex items-center justify-center w-full p-2 border border-gray-300 rounded-md bg-red-900 hover:bg-red-800 text-white">
                    <FaPhotoFilm className="w-8 h-8" />
                  </span>
                </label>
              </div>
            </div>

            <div className="mb-4">
              <input
                type="text"
                name="name"
                onChange={inputHandler}
                value={input.name}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="email"
                onChange={inputHandler}
                value={input.email}
                name="email"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="number"
                onChange={inputHandler}
                value={input.phone}
                name="phone"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-800 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Update
            </button>
          </form>

          <div className="flex justify-center mt-3">
            <Link to="/profile">
              <p className="font-medium cursor-pointer text-red-600 hover:text-red-700">
                Cancel
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
