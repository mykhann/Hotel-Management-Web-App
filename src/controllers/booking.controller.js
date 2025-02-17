import { asyncHandler } from "../Middleware/asyncHandler.js";
import { Room } from "../Models/room.model.js";
import { Booking } from "../Models/booking.model.js";

const createBooking = asyncHandler(async (req, res) => {
    const { roomId } = req.params;
    const { checkInDate, checkOutDate } = req.body;
    const userId = req.user.id;

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    // Find the room by its ID and populate the hotel name
    const room = await Room.findById(roomId).populate("hotel", "name");
    if (!room) {
        return res.status(404).json({
            success: false,
            message: "Room not found",
        });
    }

    // Check if the room is already booked for the selected dates
    const conflictingBooking = await Booking.findOne({
        room: roomId,
        $or: [
            { checkInDate: { $lt: checkOut }, checkOutDate: { $gt: checkIn } },
        ],
    });

    if (conflictingBooking) {
        return res.status(400).json({
            success: false,
            message: "Room is already booked for the selected dates",
        });
    }

    // Calculate the total price based on room price
    const daysDifference = Math.ceil((checkOut - checkIn) / (1000 * 3600 * 24));
    const totalPrice = room.price * daysDifference;

    // Create a new booking
    const booking = new Booking({
        user: userId,
        room: roomId,
        hotel: room.hotel._id,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        totalPrice: totalPrice,
    });

    // Save the booking
    await booking.save();

    room.isBooked = true;
    await room.save();

    res.status(201).json({
        success: true,
        message: "Booking created successfully",
        booking: {
            ...booking.toObject(),
            roomNumber: room.roomNumber,
        },
        hotelName: room.hotel.name,
    });
});

export { createBooking };
