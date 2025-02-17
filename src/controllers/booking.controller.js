import { asyncHandler } from "../Middleware/asyncHandler.js";
import { Hotel } from "../Models/hotel.model.js";
import { Room } from "../Models/room.model.js";
import mongoose from "mongoose";
import { Booking } from "../Models/booking.model.js";

const createBooking = asyncHandler(async (req, res) => {
    const { checkInDate, checkOutDate } = req.body;
    const { roomId } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    if (!mongoose.Types.ObjectId.isValid(roomId)) {
        return res.status(400).json({ success: false, message: "Invalid room ID" });
    }

    // Find the room to check if it's available
    const room = await Room.findById(roomId).populate("hotel");
    if (!room) {
        return res.status(404).json({ success: false, message: "Room not found" });
    }

    // Check if room is already booked
    if (room.isBooked) {
        return res.status(400).json({ success: false, message: "Room is already booked" });
    }

    // Find the hotel to associate with booking
    const hotel = await Hotel.findById(room.hotel);
    if (!hotel) {
        return res.status(404).json({ success: false, message: "Hotel not found" });
    }

    const totalPrice = room.price;
    // Create a new booking
    const newBooking = new Booking({
        user: userId,
        room: roomId,
        hotel: hotel._id,   
        checkInDate,
        checkOutDate,
        totalPrice,
        status: "pending",
        createdBy: userRole === "admin" || userRole === "hotelOwner" ? userId : null,
    });

    // Save the booking
    await newBooking.save();


    room.isBooked = true;
    await room.save();

    res.status(201).json({
        success: true,
        message: "Booking created successfully",
        booking: newBooking,
    });
});


export { createBooking }