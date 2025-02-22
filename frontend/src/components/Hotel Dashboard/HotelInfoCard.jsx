import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaStar, FaEnvelope, FaPhone } from "react-icons/fa";

const HotelInfoCard = () => {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotelInfo = async () => {
      try {
        const { data } = await axios.get("http://localhost:5500/api/v1/hotel/my-hotel", {
          withCredentials: true,
        });
        setHotel(data.hotel);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch hotel info");
      } finally {
        setLoading(false);
      }
    };

    fetchHotelInfo();
  }, []);

  if (loading) return <p className="text-center text-gray-400">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-3xl flex bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-2xl">
        {/* Hotel Image on the Left */}
        <div className="w-1/3 relative">
          <img
            src={hotel?.images?.[0] || "https://source.unsplash.com/400x400/?hotel"}
            alt={hotel?.name || "Hotel"}
            className="w-full h-full object-cover"
          />
          {/* Rating Badge */}
          <div className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-2 flex items-center">
            <FaStar className="text-yellow-400" />
            <span className="text-sm text-white ml-1">
              {hotel?.averageRating ? `${hotel.averageRating} / 5` : "No rating"}
            </span>
          </div>
        </div>

        {/* Hotel Info on the Right */}
        <div className="w-2/3 p-6 flex flex-col justify-between">
          {/* Hotel Name */}
          <h3 className="text-2xl font-bold text-white mb-2">{hotel?.name || "N/A"}</h3>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-gray-300 mb-4">
            <FaMapMarkerAlt className="text-red-400" />
            <p>{hotel?.location || "Location not available"}</p>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-400 line-clamp-3 mb-4">
            {hotel?.description || "No description available"}
          </p>

          {/* Email */}
          <div className="flex items-center gap-2 text-sm text-gray-300 mb-2">
            <FaEnvelope className="text-blue-400" />
            <p>{hotel?.email || "Email not available"}</p>
          </div>

          {/* Phone Number */}
          <div className="flex items-center gap-2 text-sm text-gray-300 mb-6">
            <FaPhone className="text-green-400" />
            <p>{hotel?.phone || "Phone number not available"}</p>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default HotelInfoCard;