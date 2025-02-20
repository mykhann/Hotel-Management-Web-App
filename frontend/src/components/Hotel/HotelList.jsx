import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StarIcon, MapPinIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import Navbar from "../shared/Navbar";
import Footer from "../layout/Footer";
import { useSelector } from "react-redux";
import useFetchAllHotels from "../../customHooks/useFetchAllHotels";

const ITEMS_PER_PAGE = 10;

const HotelCard = () => {
  useFetchAllHotels();
  const hotels = useSelector((state) => state.hotel.hotels);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentHotels = hotels.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center gap-4 p-4 bg-gray-900 min-h-screen">
        {currentHotels.length > 0 ? (
          currentHotels.map((hotel) => (
            <div
              key={hotel._id}
              className="w-full max-w-3xl flex bg-gray-800 text-white shadow-md rounded-lg overflow-hidden border-2 border-transparent transition-all duration-300 hover:border-yellow-500"
            >
              {/* Left Image Section (Increased width) */}
              <img
                src={hotel.images || "https://source.unsplash.com/450x300/?hotel"}
                alt={hotel.name}
                className="w-1/3 object-cover"
              />

              {/* Right Information Section */}
              <div className="w-2/3 p-4 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{hotel.name}</h2>

                  {/* Location with Icon */}
                  <div className="flex items-center gap-1 text-sm text-gray-300">
                    <MapPinIcon className="w-4 h-4 text-red-500" />
                    <p>{hotel.location}</p>
                  </div>

                  {/* Email with Icon */}
                  <div className="flex items-center gap-1 text-sm text-gray-300">
                    <EnvelopeIcon className="w-4 h-4 text-blue-500" />
                    <p>{hotel.email}</p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mt-1">
                    <StarIcon className="w-4 h-4 text-yellow-400" />
                    <span className="ml-1 text-sm">{hotel.averageRating || "N/A"} / 5</span>
                  </div>

                  <p className="text-gray-400 mt-1 text-xs">{hotel.description}</p>

                  {/* Free Parking & Wi-Fi Badges */}
                  <div className="flex items-center gap-2 mt-2 text-xs">
                    <span className="bg-green-600 px-2 py-1 rounded-md">Free Parking</span>
                    <span className="bg-blue-600 px-2 py-1 rounded-md">Free Wi-Fi</span>
                  </div>
                </div>

                {/* View Button (Centered) */}
                <div className="flex justify-center mt-3">
                  <button
                    className="bg-yellow-700 text-gray-900 px-4 py-2 w-full rounded-md hover:bg-yellow-600 transition"
                    onClick={() => navigate(`/rooms/${hotel._id}`)}
                  >
                    View Rooms
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No hotels available</p>
        )}
      </div>

      {/* Pagination Buttons */}
      {hotels.length > ITEMS_PER_PAGE && (
        <div className="flex justify-center gap-4 pb-6">
          <button
            className={`px-3 py-1.5 rounded-md bg-gray-600 text-white transition ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"
            }`}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>

          {indexOfLastItem < hotels.length && (
            <button
              className="px-3 py-1.5 rounded-md bg-teal-600 text-white transition hover:bg-teal-700"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          )}
        </div>
      )}

      <Footer />
    </>
  );
};

export default HotelCard;