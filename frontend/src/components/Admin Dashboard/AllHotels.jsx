import React from 'react'
import { Link } from 'react-router-dom'
import { FaHotel } from 'react-icons/fa'
import { useSelector } from 'react-redux'
const AllHotels = () => {
    const hotels = useSelector((store)=>store.hotel.hotels)
  return (
    <> <Link to="/admin/view-hotels">
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
      <div className="flex flex-col items-center text-center">
        <FaHotel className="text-4xl text-blue-500 mb-4" />
        <h2 className="text-xl font-semibold text-white">
          All Hotels ({hotels.length})
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Manage all registered hotels
        </p>
      </div>
    </div>
  </Link></>
  )
}

export default AllHotels