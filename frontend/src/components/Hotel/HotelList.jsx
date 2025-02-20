import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/solid";
import Navbar from "../shared/Navbar";
import Footer from "../layout/Footer";

// Dummy hotel data
const hotels = [
  {
    id: 1,
    name: "Luxury Palace Hotel",
    description:
      "Experience a luxurious stay with world-class amenities and breathtaking views.",
    image: "https://source.unsplash.com/400x300/?luxury,hotel",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Beachside Resort",
    description:
      "Relax by the beach and enjoy the best hospitality in a tropical paradise.",
    image: "https://source.unsplash.com/400x300/?beach,hotel",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Mountain View Retreat",
    description:
      "A peaceful getaway surrounded by the stunning beauty of nature and fresh air.",
    image: "https://source.unsplash.com/400x300/?mountain,hotel",
    rating: 4.7,
  },
];

const ITEMS_PER_PAGE = 10;

const HotelCard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentHotels = hotels.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <Navbar />
      <div className="flex flex-wrap justify-center gap-6 p-6 bg-gray-100 min-h-screen">
        {currentHotels.map((hotel) => (
          <div
            key={hotel.id}
            className="w-80 bg-white shadow-lg rounded-xl overflow-hidden transition hover:scale-105"
          >
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {hotel.name}
              </h2>
              <p className="text-gray-600 mt-2 text-sm">{hotel.description}</p>
              <div className="flex items-center mt-3">
                <StarIcon className="w-5 h-5 text-yellow-500" />
                <span className="ml-1 text-gray-700 font-medium">
                  {hotel.rating} / 5
                </span>
              </div>
              <button
                className="mt-4 w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition"
                onClick={() => navigate(`/rooms/${hotel.id}`)}
              >
                View Rooms
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center gap-4 pb-6">
        <button
          className={`px-4 py-2 rounded-md bg-gray-500 text-white transition ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-700"
          }`}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>

        <button
          className={`px-4 py-2 rounded-md bg-teal-600 text-white transition ${
            indexOfLastItem >= hotels.length
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-700"
          }`}
          disabled={indexOfLastItem >= hotels.length}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>

      <Footer />
    </>
  );
};

export default HotelCard;
