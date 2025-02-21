import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment"

const LatestHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get("http://localhost:5500/api/v1/hotel/get/hotels");
        setHotels(response.data.hotels);
      } catch (err) {
        setError("Failed to load hotels");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  // Function to calculate how many days ago a hotel was added
  const getTimeAgo = (dateString) => {
    return moment(dateString).fromNow(); 
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-4">Latest Hotels</h2>

      {loading && <p className="text-gray-400">Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {!loading && !error && (
        <ul className="space-y-3">
          {hotels.map((hotel, index) => (
            <li key={hotel._id || index} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
              <span className="text-white">🏨 {hotel.name} - {hotel.location}</span>
              <span className="text-sm text-gray-400">{getTimeAgo(hotel.createdAt)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LatestHotels;
