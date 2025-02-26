import mongoose, { mongo } from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel", 
      required: true,
    },
<<<<<<< HEAD
    roomNumber: {
      type: String,
     
    },
=======
  
>>>>>>> e3ead47d68ba24b8d38faf7856552b9bc0c325c4
    type: {
      type: String,
      required: true,
      enum: ["Single", "Deluxe","Superior"],
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
      type: [String], 
      default: [],
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Room = mongoose.models.Room || mongoose.model("Room", roomSchema);

