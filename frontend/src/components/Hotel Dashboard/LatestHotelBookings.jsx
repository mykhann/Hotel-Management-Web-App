import React from "react";
import moment from "moment";

const LatestHotelBookings = () => {
  // Static bookings data
  const staticBookings = [
    {
      _id: "1",
      user: { name: "John Doe" },
      room: { type: "Single", hotel: { name: "Carlton Hotel" } },
      createdAt: "2023-10-01T12:00:00Z",
    },
    {
      _id: "2",
      user: { name: "Jane Smith" },
      room: { type: "Double", hotel: { name: "Eleven Hotel & Resorts" } },
      createdAt: "2023-10-02T14:30:00Z",
    },
    {
      _id: "3",
      user: { name: "Alice Johnson" },
      room: { type: "Suite", hotel: { name: "Carlton Hotel" } },
      createdAt: "2023-10-03T09:15:00Z",
    },
  ];

  // Function to calculate how many days ago a booking was made
  const getTimeAgo = (dateString) => {
    return moment(dateString).fromNow();
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-4">Latest Bookings</h2>

      {staticBookings.length > 0 ? (
        <ul className="space-y-3">
          {staticBookings.map((booking) => (
            <li
              key={booking._id}
              className="flex items-center justify-between bg-gray-700 p-3 rounded-lg"
            >
              <span className="text-white">
                📅 {booking.user?.name} - {booking.room?.type} Room (
                {booking.room?.hotel?.name})
              </span>
              <span className="text-sm text-gray-400">
                {getTimeAgo(booking.createdAt)}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No bookings found.</p>
      )}
    </div>
  );
};

export default LatestHotelBookings;