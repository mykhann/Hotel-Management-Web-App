import React from 'react'
import { Link } from 'react-router-dom'
import {
    FaPlus,
    FaHotel,
    FaUsers,
    FaClipboardList,
    FaDoorOpen,
    FaSignOutAlt,
  } from "react-icons/fa";

const Allrooms = () => {
  return (
    <><Link to="/admin/view-rooms">
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
      <div className="flex flex-col items-center text-center">
        <FaDoorOpen className="text-4xl text-purple-500 mb-4" />
        <h2 className="text-xl font-semibold text-white">
          All Rooms (80)
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          View and manage hotel rooms
        </p>
      </div>
    </div>
  </Link></>
  )
}

export default Allrooms