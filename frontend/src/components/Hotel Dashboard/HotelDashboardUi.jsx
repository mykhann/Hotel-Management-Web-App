import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaDoorOpen,
  FaBook,
  FaHotel,
  FaSignOutAlt,
} from "react-icons/fa";
import LatestHotelBookings from "./LatestHotelBookings";

const HotelDashboard = () => {
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotelInfo = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5500/api/v1/hotel/my-hotel",
          {
            withCredentials: true,
          }
        );
        setHotel(data.hotel);
        setRooms(data.rooms || []);
        setBookings(data.bookings || []);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch hotel information"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHotelInfo();
  }, []);

  // Logout Function
  const handleLogout = () => {
    dispatch(setUser(null));
    navigate("/login");
    toast.success("Logged out successfully");
  };

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gradient-to-r from-blue-900 to-gray-900 min-h-screen">
      {/* Hotel Header */}
      <div className="flex-1  items-center justify-between p-6 bg-gray-800">
        <div className="flex items-center">
          <img
            src={hotel?.images?.[0] || "https://via.placeholder.com/150"}
            alt={hotel?.name || "Hotel"}
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h1 className="text-3xl font-bold text-white">
              {hotel?.name || "Hotel Name"}
            </h1>
            <p className="text-sm text-gray-400">
              {hotel?.location || "Location"}
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg flex items-center transition duration-300"
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>

      {/* Hotel Options Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {/* Add Room Card */}
          <Link to="/hotel/add-room">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-green-500/50 transition duration-300 transform hover:scale-105">
              <div className="flex flex-col items-center text-center">
                <FaPlus className="text-5xl text-green-500 mb-4 transition duration-300 hover:text-green-400" />
                <h2 className="text-xl font-semibold text-white">Add Room</h2>
                <p className="text-sm text-gray-400 mt-1">
                  Register a new room
                </p>
              </div>
            </div>
          </Link>

          {/* View All Rooms Card */}
          <Link to="/hotel/view-rooms">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-purple-500/50 transition duration-300 transform hover:scale-105">
              <div className="flex flex-col items-center text-center">
                <FaDoorOpen className="text-5xl text-purple-500 mb-4 transition duration-300 hover:text-purple-400" />
                <h2 className="text-xl font-semibold text-white">
                  All Rooms{" "}
                  <span className="text-blue-400">({rooms.length})</span>
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  View and manage rooms
                </p>
              </div>
            </div>
          </Link>

          {/* View All Bookings Card */}
          <Link to="/hotel/view-bookings">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-blue-500/50 transition duration-300 transform hover:scale-105">
              <div className="flex flex-col items-center text-center">
                <FaBook className="text-5xl text-blue-500 mb-4 transition duration-300 hover:text-blue-400" />
                <h2 className="text-xl font-semibold text-white">
                  All Bookings{" "}
                  <span className="text-yellow-400">({bookings.length})</span>
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  Manage all bookings
                </p>
              </div>
            </div>
          </Link>

          {/* View Hotel Info Card */}
          <Link to="/hotel/view-hotel">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-blue-500/50 transition duration-300 transform hover:scale-105">
              <div className="flex flex-col items-center text-center">
                <FaHotel className="text-5xl text-blue-500 mb-4 transition duration-300 hover:text-blue-400" />
                <h2 className="text-xl font-semibold text-white">Hotel Info</h2>
                <p className="text-sm text-gray-400 mt-1">View hotel details</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Hotel Dashboard Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Latest Bookings Table */}
          <LatestHotelBookings />
        </div>
      </div>
    </div>
  );
};

export default HotelDashboard;
