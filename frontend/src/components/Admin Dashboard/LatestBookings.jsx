import React from 'react'

const LatestBookings = () => {
  return (
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
  )
}

export default LatestBookings