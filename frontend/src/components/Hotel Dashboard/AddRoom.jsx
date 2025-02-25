import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import SideNavbar from "./SideNavbar";

const AddRoom = () => {
  const [roomData, setRoomData] = useState({
    type: "",
    price: "",
    amenities: [],
    capacity: "",
    description: "",
    images: [],
  });
  const [loading, setLoading] = useState(false);

  // Room types
  const roomTypes = ["Single", "Deluxe", "Superior"];

  // Amenities options
  const amenitiesOptions = ["wifi", "tv", "ac", "food", "parking"];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoomData({ ...roomData, [name]: value });
  };

  // Handle amenities selection
  const handleAmenitiesChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setRoomData({
        ...roomData,
        amenities: [...roomData.amenities, value],
      });
    } else {
      setRoomData({
        ...roomData,
        amenities: roomData.amenities.filter((a) => a !== value),
      });
    }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      toast.error("You can upload a maximum of 5 images.");
      return;
    }
    
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setRoomData({ ...roomData, images: imageUrls });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5500/api/v1/room/add",
        roomData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success("Room added successfully!");
        // Reset form
        setRoomData({
          type: "",
          price: "",
          amenities: [],
          capacity: "",
          description: "",
          images: [],
        });
      } else {
        toast.error(response.data.message || "Failed to add room");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SideNavbar />
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <h1 className="text-3xl font-bold mb-8 text-yellow-400">Add New Room</h1>
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          {/* Room Type */}
          <div className="mb-6">
            <label htmlFor="type" className="block text-sm font-medium text-gray-300">
              Room Type
            </label>
            <select
              id="type"
              name="type"
              value={roomData.type}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
              required
            >
              <option value="" disabled>
                Select a room type
              </option>
              {roomTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Room Price */}
          <div className="mb-6">
            <label htmlFor="price" className="block text-sm font-medium text-gray-300">
              Price per Night ($)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={roomData.price}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
              required
            />
          </div>

          {/* Amenities */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300">
              Amenities
            </label>
            <div className="mt-2 flex flex-wrap gap-4">
              {amenitiesOptions.map((amenity, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={amenity}
                    value={amenity}
                    checked={roomData.amenities.includes(amenity)}
                    onChange={handleAmenitiesChange}
                    className="w-4 h-4 text-yellow-400 bg-gray-700 border-gray-600 rounded focus:ring-yellow-400"
                  />
                  <label htmlFor={amenity} className="text-sm text-gray-300">
                    {amenity}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Capacity */}
          <div className="mb-6">
            <label htmlFor="capacity" className="block text-sm font-medium text-gray-300">
              Capacity
            </label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              value={roomData.capacity}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-300">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={roomData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
              rows="4"
              required
            />
          </div>

          {/* Room Images */}
          <div className="mb-6">
            <label htmlFor="images" className="block text-sm font-medium text-gray-300">
              Upload Images (Max 5)
            </label>
            <input
              type="file"
              id="images"
              name="images"
              onChange={handleImageUpload}
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
              multiple
              accept="image/*"
              required
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {roomData.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Room ${index}`}
                  className="w-20 h-20 object-cover rounded-md"
                />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 bg-yellow-400 text-gray-900 font-semibold rounded-md hover:bg-yellow-500 transition-colors"
          >
            {loading ? "Adding Room..." : "Add Room"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddRoom;