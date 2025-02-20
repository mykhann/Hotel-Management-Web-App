import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../reduxStore/authSlice";
import { toast } from "react-toastify";
import Footer from "../layout/Footer";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5500/api/v1/user/login", input, { withCredentials: true });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
        dispatch(setUser(res.data.user));
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-50 to-indigo-50">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-11/12 sm:w-96 md:w-1/2 lg:w-1/3 xl:w-1/4 mb-20">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
          <form onSubmit={submitHandler}>
            <div className="mb-6">
              <input
                type="email"
                name="email"
                onChange={onChangeInput}
                value={input.email}
                placeholder="Enter your email address"
                className="mt-1 block w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                value={input.password}
                onChange={onChangeInput}
                name="password"
                placeholder="Enter your password"
                className="mt-1 block w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white mb-6 p-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
            >
              Login
            </button>
          </form>
          <p className="font-medium text-gray-700 text-center mb-4">
            <Link to="/doctor/login">
              <span className="text-purple-600 hover:text-purple-800 transition-colors duration-300">Login</span>
            </Link> as a doctor
          </p>
          <div className="flex justify-center">
            <Link to="/signup">
              <p className="font-medium text-gray-700 hover:text-purple-600 transition-colors duration-300">
                CREATE ACCOUNT
              </p>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;