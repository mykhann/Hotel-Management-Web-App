import React from 'react'
import { Link } from 'react-router-dom';
import {
 
    FaClipboardList,
    
  } from "react-icons/fa";

const AllBookings = () => {
  return (
    <> <Link to="/admin/view-bookings">
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
      <div className="flex flex-col items-center text-center">
        <FaClipboardList className="text-4xl text-red-500 mb-4" />
        <h2 className="text-xl font-semibold text-white">
          All Bookings (30)
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          View and manage bookings
        </p>
      </div>
    </div>
  </Link></>
  )
}

export default AllBookings