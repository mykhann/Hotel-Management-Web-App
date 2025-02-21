import React from 'react'

const LatestHotels = () => {
  return (
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
  )
}

export default LatestHotels