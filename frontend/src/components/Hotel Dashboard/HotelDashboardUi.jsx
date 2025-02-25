import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useHotelData from "../../customHooks/UseHotelData";
import LatestHotelBookings from "./LatestHotelBookings";
import SideNavbar from "./SideNavbar";

const HotelDashboardUi = () => {
  const { hotel, rooms, bookings, loading, error } = useHotelData(); 
  const navigate = useNavigate();

  const handleLogout = () => {
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
    <div className="flex bg-gradient-to-r from-blue-900 to-gray-900 min-h-screen">
      <SideNavbar handleLogout={handleLogout} className="w-64 fixed h-full" />
      
      <div className="flex-1 p-6 ml-64">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center">
            <img
              src={hotel?.images?.[0] || "https://via.placeholder.com/150"}
              alt={hotel?.name || "Hotel"}
              className="w-20 h-20 rounded-lg mr-4 object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold text-white">{hotel?.name || "Hotel Name"}</h1>
              <p className="text-sm text-gray-400">{hotel?.location || "Location"}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-white">Total Rooms</h2>
            <p className="text-2xl text-green-400 font-bold">{rooms.length}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-white">Total Bookings</h2>
            <p className="text-2xl text-yellow-400 font-bold">{bookings.length}</p>
          </div>
        </div>

        <div className="mt-6">
          <LatestHotelBookings />
        </div>
      </div>
    </div>
  );
};

export default HotelDashboardUi;
