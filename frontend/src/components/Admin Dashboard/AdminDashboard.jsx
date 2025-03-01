import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../reduxStore/authSlice";
import { toast } from "react-toastify";
import LatestBookings from "./LatestBookings";
import LatestHotels from "./LatestHotels";
import AllRooms from "./Allrooms";
import AllBookings from "./AllBookings";
import AllUsers from "./AllUsers";
import AllHotels from "./AllHotels";
import SideNavbarAdmin from "./SideNavbarAdmin";

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
    <div className="flex">
      {/* Sidebar */}
      <SideNavbarAdmin handleLogout={handleLogout} />

      {/* Main Content */}
      <div className="ml-64 p-6 bg-[#0b1633] min-h-screen w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Admin Dashboard
          </h1>
        </div>

        {/* Admin Options Grid */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          <AllHotels />
          <AllUsers />
          <AllBookings />
          <AllRooms />
        </div> */}

        {/* Admin Dashboard Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LatestHotels />
          <LatestBookings />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
