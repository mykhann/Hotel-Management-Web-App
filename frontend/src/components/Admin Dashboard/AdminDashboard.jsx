import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaSignOutAlt } from "react-icons/fa";
import { setUser } from "../../reduxStore/authSlice";
import { useDispatch, useSelector } from "react-redux";
import LatestBookings from "./LatestBookings";
import LatestHotels from "./LatestHotels";
import Allrooms from "./Allrooms";
import AllBookings from "./AllBookings";
import AllUsers from "./AllUsers";
import AllHotels from "./AllHotels";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setUser(null));
    navigate("/login");
    toast.success("Logged out successfully");
  };
  return (
    <div className="bg-gray-900 min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>

      {/* Admin Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {/* Add Hotel Card */}
        <Link to="/admin/add-hotel">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-green-500/50 transition duration-300 transform hover:scale-105">
        <div className="flex flex-col items-center text-center">
          <FaPlus className="text-5xl text-green-500 mb-4 transition duration-300 hover:text-green-400" />
          <h2 className="text-xl font-semibold text-white">Add Hotel</h2>
          <p className="text-sm text-gray-400 mt-1">Register a new hotel</p>
        </div>
      </div>
        </Link>

        {/* View All Hotels Card */}
        <AllHotels />

        {/* View All Users Card */}
        <AllUsers />

        {/* View All Bookings Card */}
        <AllBookings />

        {/* View All Rooms Card */}
        <Allrooms />
      </div>

      {/* Admin Dashboard Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest Hotels Table */}

        <LatestHotels />
        {/* Latest Bookings Table */}
        <LatestBookings />
      </div>
    </div>
  );
};

export default AdminDashboard;
