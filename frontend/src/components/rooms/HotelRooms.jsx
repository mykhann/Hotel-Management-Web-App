import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setHotelRooms } from "../../reduxStore/HotelSlice";
import Navbar from "../shared/Navbar";
import Footer from "../layout/Footer";
import { FaWifi, FaTv, FaSnowflake, FaUtensils, FaParking } from "react-icons/fa";

const HotelRooms = () => {
  const { hotelId } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [groupedRooms, setGroupedRooms] = useState({});
  const [selectedImages, setSelectedImages] = useState({});

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(
          `http://localhost:5500/api/v1/room/get/${hotelId}`
        );
        const data = await response.json();
        dispatch(setHotelRooms(data.rooms));

        const grouped = data.rooms.reduce((acc, room) => {
          if (!acc[room.type]) acc[room.type] = [];
          acc[room.type].push(room);
          return acc;
        }, {});
        setGroupedRooms(grouped);

        const initialImages = {};
        data.rooms.forEach((room) => {
          if (room.images?.length > 0) {
            initialImages[room._id] = room.images[0];
          }
        });
        setSelectedImages(initialImages);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [dispatch, hotelId]);

  const handleImageClick = (roomId, image) => {
    setSelectedImages((prev) => ({ ...prev, [roomId]: image }));
  };

  const amenityIcons = {
    wifi: <FaWifi className="text-yellow-400" />,
    tv: <FaTv className="text-yellow-400" />,
    ac: <FaSnowflake className="text-yellow-400" />,
    food: <FaUtensils className="text-yellow-400" />,
    parking: <FaParking className="text-yellow-400" />,
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center p-8 bg-gray-900 min-h-screen text-white">
        <h1 className="text-3xl font-bold mb-8 text-yellow-400">
          Rooms for Hotel
        </h1>
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : Object.keys(groupedRooms).length > 0 ? (
          Object.entries(groupedRooms).map(([type, rooms]) => (
            <div key={type} className="w-full max-w-6xl mb-12">
              <h2 className="text-2xl font-bold text-yellow-400 border-b border-yellow-400 pb-2 mb-6">
                {type} Rooms
              </h2>

              <div className="flex flex-col gap-8">
                {rooms.map((room) => (
                  <div
                    key={room._id}
                    className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
                  >
                    {/* Price and Amenities at the Top Right */}
                    <div className="absolute top-4 right-4 text-right">
                      <p className="text-yellow-400 font-bold text-lg">
                        ${room.price} / night
                      </p>
                      <div className="flex gap-2 mt-2">
                        {room.amenities?.length > 0 ? (
                          room.amenities.slice(0, 4).map((amenity, index) => (
                            <div key={index} className="text-xl">
                              {amenityIcons[amenity.toLowerCase()] || (
                                <span className="text-gray-400 text-sm">
                                  {amenity}
                                </span>
                              )}
                            </div>
                          ))
                        ) : (
                          <span className="text-gray-400 text-sm">No amenities</span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-2/3">
                        <img
                          src={selectedImages[room._id] || "https://source.unsplash.com/600x400/?room"}
                          alt={room.name}
                          className="w-full h-80 object-cover rounded-lg" 
                        />
                      </div>

                      <div className="w-full md:w-1/3 flex flex-wrap md:flex-col gap-2">
                        {room.images?.slice(0, 5).map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Room ${index}`}
                            className={`w-20 h-16 object-cover rounded-md cursor-pointer border-2 transition-all duration-200 ${
                              selectedImages[room._id] === image
                                ? "border-yellow-400 scale-105"
                                : "border-gray-600 hover:border-yellow-400"
                            }`}
                            onClick={() => handleImageClick(room._id, image)}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Room Details */}
                    <div className="mt-6">
                      <h2 className="text-xl font-semibold text-yellow-400">
                        {room.name}
                      </h2>
                      <p className="text-gray-300 mt-2">{room.description}</p>
                      <button className="mt-4 bg-yellow-400 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors duration-200">
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No rooms available for this hotel.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default HotelRooms;
