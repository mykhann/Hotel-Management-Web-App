import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const LatestHotelBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:5500/api/v1/booking/hotel/bookings", {
          withCredentials: true, 
        });
        console.log(response)

        setBookings(response.data.bookings);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setError("Unauthorized: You are not allowed to access this.");
        } else {
          setError("Failed to fetch bookings.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Function to calculate how many days ago a booking was made
  const getTimeAgo = (dateString) => {
    return moment(dateString).fromNow(); 
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-4">Latest Bookings</h2>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : bookings.length > 0 ? (
        <ul className="space-y-3">
          {bookings.map((booking) => (
            <li key={booking._id} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
              <span className="text-white">📅 {booking.user?.name} - {booking.room?.type} Room </span>
              <span className="text-sm text-gray-400">{getTimeAgo(booking.createdAt)}</span>
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
