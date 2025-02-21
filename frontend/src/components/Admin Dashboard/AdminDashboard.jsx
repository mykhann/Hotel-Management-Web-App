import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaHotel, FaUsers, FaClipboardList, FaDoorOpen, FaSignOutAlt } from "react-icons/fa";
import { setUser } from "../../reduxStore/authSlice";
import { useDispatch, useSelector } from "react-redux";

const AdminDashboard = () => {
  const hotels= useSelector((store)=>store.hotel.hotels)


  const {user}= useSelector((store)=>store.auth);
  const navigate=useNavigate()
  const dispatch= useDispatch()
  const handleLogout=()=>{
    dispatch(setUser(null));
    navigate("/login");
    toast.success("Logged out successfully")
  }
  return (
    <div className="bg-gray-900 min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
           Admin Dashboard
        </h1>
        <button onClick={handleLogout} className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300">
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>

      {/* Admin Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {/* Add Hotel Card */}
        <Link to="/admin/add-hotel">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
            <div className="flex flex-col items-center text-center">
              <FaPlus className="text-4xl text-green-500 mb-4" />
              <h2 className="text-xl font-semibold text-white">Add Hotel</h2>
              <p className="text-sm text-gray-400 mt-1">Register a new hotel</p>
            </div>
          </div>
        </Link>

        {/* View All Hotels Card */}
        <Link to="/admin/view-hotels">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
            <div className="flex flex-col items-center text-center">
              <FaHotel className="text-4xl text-blue-500 mb-4" />
              <h2 className="text-xl font-semibold text-white">All Hotels ({hotels.length})</h2>
              <p className="text-sm text-gray-400 mt-1">Manage all registered hotels</p>
            </div>
          </div>
        </Link>

        {/* View All Users Card */}
        <Link to="/admin/view-users">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
            <div className="flex flex-col items-center text-center">
              <FaUsers className="text-4xl text-yellow-500 mb-4" />
              <h2 className="text-xl font-semibold text-white">All Users (50)</h2>
              <p className="text-sm text-gray-400 mt-1">View and manage users</p>
            </div>
          </div>
        </Link>

        {/* View All Bookings Card */}
        <Link to="/admin/view-bookings">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
            <div className="flex flex-col items-center text-center">
              <FaClipboardList className="text-4xl text-red-500 mb-4" />
              <h2 className="text-xl font-semibold text-white">All Bookings (30)</h2>
              <p className="text-sm text-gray-400 mt-1">View and manage bookings</p>
            </div>
          </div>
        </Link>

        {/* View All Rooms Card */}
        <Link to="/admin/view-rooms">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
            <div className="flex flex-col items-center text-center">
              <FaDoorOpen className="text-4xl text-purple-500 mb-4" />
              <h2 className="text-xl font-semibold text-white">All Rooms (80)</h2>
              <p className="text-sm text-gray-400 mt-1">View and manage hotel rooms</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Admin Dashboard Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest Hotels Table */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Latest Hotels</h2>
          <ul className="space-y-3">
            <li className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
              <span className="text-white">🏨 Grand Palace - New York</span>
              <span className="text-sm text-gray-400">Added 2 days ago</span>
            </li>
            <li className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
              <span className="text-white">🏨 The Lux - California</span>
              <span className="text-sm text-gray-400">Added 5 days ago</span>
            </li>
            <li className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
              <span className="text-white">🏨 Paradise Inn - Miami</span>
              <span className="text-sm text-gray-400">Added 1 week ago</span>
            </li>
          </ul>
        </div>

        {/* Latest Bookings Table */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Latest Bookings</h2>
          <ul className="space-y-3">
            <li className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
              <span className="text-white">📅 John Doe - Room 201 (Grand Palace)</span>
              <span className="text-sm text-gray-400">2 days ago</span>
            </li>
            <li className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
              <span className="text-white">📅 Jane Smith - Room 305 (The Lux)</span>
              <span className="text-sm text-gray-400">3 days ago</span>
            </li>
            <li className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
              <span className="text-white">📅 Michael Johnson - Room 110 (Paradise Inn)</span>
              <span className="text-sm text-gray-400">5 days ago</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;