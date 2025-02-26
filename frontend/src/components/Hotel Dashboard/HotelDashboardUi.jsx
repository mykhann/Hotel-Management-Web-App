import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import useHotelData from "../../customHooks/UseHotelData";
import UseHotelBookings from "../../customHooks/UseHotelBookings";
import LatestHotelBookings from "./LatestHotelBookings";
import SideNavbar from "./SideNavbar";

const HotelDashboardUi = () => {
  const { hotel, loading, error } = useHotelData();
  const { bookings } = UseHotelBookings();
  const navigate = useNavigate();
  const user = useSelector((store) => store.auth.user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

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

  // Calculate Completed Bookings
  const completedBookings = bookings.filter(
    (booking) => booking.status === "completed"
  );
  const pendingBookings = bookings.filter(
    (booking) => booking.status === "pending"
  );
  const cancelledBookings = bookings.filter(
    (booking) => booking.status === "cancelled"
  );

  // Chart Data
  const chartData = [
    { name: "Total Bookings", value: bookings.length },
    { name: "Completed Bookings", value: completedBookings.length },
    { name: "Pending Bookings", value: pendingBookings.length },
    { name: "Cancelled Bookings", value: cancelledBookings.length },
  ];

  return (
    <div className="flex bg-gradient-to-r bg-gray-900 min-h-screen">
      <SideNavbar handleLogout={handleLogout} className="w-64 fixed h-full" />

      <div className="flex-1 p-6 ml-64">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col md:flex-row md:items-center md:justify-between">
          <Link to="/hotel/view-hotel">
            {" "}
            <div className="flex items-center">
              <img
                src={hotel?.images?.[0] || "https://via.placeholder.com/150"}
                alt={hotel?.name || "Hotel"}
                className="w-20 h-20 rounded-lg mr-4 object-cover"
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
          </Link>
        </div>

        {/* Booking Chart */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Bookings Overview
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="white" />
              <YAxis stroke="white" />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#4CAF50" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6">
          <LatestHotelBookings />
        </div>
      </div>
    </div>
  );
};

export default HotelDashboardUi;
