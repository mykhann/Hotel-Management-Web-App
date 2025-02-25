import React from "react";
import { toast } from "react-toastify";
import { FaEnvelope } from "react-icons/fa";
import Footer from "../layout/Footer";
import SideNavbar from "./SideNavbar";
import UseHotelBookings from "../../customHooks/UseHotelBookings";
import { ClipLoader } from "react-spinners"; // Import a spinner library

const FetchAllHotelBookings = () => {
  const { bookings, loading, error, cancelBooking } = UseHotelBookings();

  const isSameDate = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const today = new Date();
  const todaysBookings = bookings.filter((booking) =>
    isSameDate(new Date(booking.checkInDate), today)
  );
  const otherBookings = bookings.filter(
    (booking) => !isSameDate(new Date(booking.checkInDate), today)
  );

  const handleCancelBooking = async (bookingId) => {
    const result = await cancelBooking(bookingId);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <>
      <SideNavbar />
      <div className="flex flex-col items-center gap-4 p-4 bg-gray-900 min-h-screen">
        <h2 className="text-2xl font-bold text-white mb-8">Room Bookings</h2>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <ClipLoader color="#F59E0B" size={50} /> 
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
            <div>
              <h3 className="text-xl font-semibold md:ml-28 text-white mb-4">Today's Bookings</h3>
              {todaysBookings.length === 0 ? (
                <p className="text-center text-gray-400">No bookings for today</p>
              ) : (
                todaysBookings.map((booking) => (
                  <BookingCard key={booking._id} booking={booking} cancelBooking={handleCancelBooking} />
                ))
              )}
            </div>

            <div>
              <h3 className="text-xl md:ml-28 font-semibold text-white mb-4">Other Bookings</h3>
              {otherBookings.length === 0 ? (
                <p className="text-center text-gray-400">No other bookings</p>
              ) : (
                otherBookings.map((booking) => (
                  <BookingCard key={booking._id} booking={booking} cancelBooking={handleCancelBooking} />
                ))
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

const BookingCard = ({ booking, cancelBooking }) => {
  const statusColors = {
    pending: "text-yellow-400",
    cancelled: "text-red-500",
    completed: "text-green-500",
    default: "text-gray-300",
  };

  return (
    <div className="md:ml-28 w-full flex bg-gray-800 text-white shadow-md rounded-lg overflow-hidden border-2 border-transparent transition-all duration-300 hover:border-red-500 mb-4 p-3">
      <div className="w-full p-2 flex flex-col justify-between">
        <p className="text-sm font-medium text-gray-300">
          <span className="font-semibold">Guest:</span> {booking.user?.name || "N/A"}
        </p>

        <div className="flex items-center gap-2 text-sm text-gray-300 mt-1">
          <FaEnvelope className="text-gray-400" />
          <p>{booking?.user?.email || "N/A"}</p>
        </div>

        <div
          className={`flex items-center gap-1 text-sm font-semibold mt-1 ${
            statusColors[booking.status] || statusColors.default
          }`}
        >
          <p>{booking?.status || "N/A"}</p>
        </div>

        <div className="mt-2 space-y-1">
          <p className="text-sm text-gray-400">
            <span className="font-medium">Check-in:</span> {new Date(booking.checkInDate).toDateString()}
          </p>
          <p className="text-sm text-gray-400">
            <span className="font-medium">Check-out:</span> {new Date(booking.checkOutDate).toDateString()}
          </p>
        </div>

        {booking.status !== "Completed" && booking.status !== "Cancelled" && (
          <div className="flex justify-center mt-3">
            <button
              onClick={() => cancelBooking(booking._id)}
              className="bg-red-600 text-white px-3 py-1 text-sm rounded-md hover:bg-red-700 transition"
            >
              Cancel Booking
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FetchAllHotelBookings;