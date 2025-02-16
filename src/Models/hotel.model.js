import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    contact: {
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
    },
    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room", 
      },
    ],
    
    images: {
      type: [String], 
      default: [],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", hotelSchema);
