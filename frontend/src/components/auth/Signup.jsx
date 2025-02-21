import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Footer from "../layout/Footer";

const Signup = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    username: "",
  });

  const onchangeInputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5500/api/v1/user/register", input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-50 to-indigo-50">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
          <hr className="mb-6" />
          <form onSubmit={submitHandler}>
            <div className="mb-6">
              <input
                type="text"
                name="name"
                onChange={onchangeInputHandler}
                value={input.name}
                placeholder="Enter your name"
                className="mt-1 block w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div className="mb-6">
              <input
                type="email"
                name="email"
                onChange={onchangeInputHandler}
                value={input.email}
                placeholder="Enter your email address"
                className="mt-1 block w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="text"
                name="username"
                onChange={onchangeInputHandler}
                value={input.username}
                placeholder="Enter your username"
                className="mt-1 block w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div className="mb-6">
              <input
                type="password"
                name="password"
                onChange={onchangeInputHandler}
                value={input.password}
                placeholder="Enter your password"
                className="mt-1 block w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div className="mb-6">
              <input
                type="number"
                name="phone"
                onChange={onchangeInputHandler}
                value={input.phone}
                placeholder="Enter your phone number"
                className="mt-1 block w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
            >
              Sign Up
            </button>
          </form>

          <div className="flex justify-center mt-4">
            <Link to="/login">
              <p className="font-medium text-gray-700 hover:text-purple-600 transition-colors duration-300">
                Already have an account? <span className="text-purple-600 hover:text-purple-800">Log In</span>
              </p>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
