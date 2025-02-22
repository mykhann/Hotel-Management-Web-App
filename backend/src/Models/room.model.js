import mongoose, { mongo } from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel", // References the Hotel model
      required: true,
    },
    roomNumber: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["single", "Deluxe","Superior"],
    },
    price: {
      type: Number,
      required: true,
    },
    amenities: {
      type: [String], 
      default: [],
    },
    capacity: {
      type: Number,
      required: true,
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
    images: {
      type: [String], // Store Cloudinary or local image URLs
      default: [],
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Room=mongoose.model("Room",roomSchema)
