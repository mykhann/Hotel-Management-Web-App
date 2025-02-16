import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  capacity: { type: Number, required: true }, // How many guests can stay
  images: [{ type: String }], // Cloudinary image URLs
  amenities: [{ type: String }], // E.g., WiFi, AC, Pool
  available: { type: Boolean, default: true }
});

module.exports = mongoose.model("Room", roomSchema);
