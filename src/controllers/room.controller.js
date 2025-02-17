import { Room } from "../Models/room.model.js";
import { Hotel } from "../Models/hotel.model.js";
import { asyncHandler } from "../Middleware/asyncHandler.js";
import { uploadOnCloudinary } from "../Middleware/utils/cloudinary.js";



const AddRoom = asyncHandler(async (req, res) => {
    const { hotelId } = req.params;
    const { roomNumber, type, price, amenities, capacity, description } = req.body;
    const userId = req.user.id;

    // Find hotel
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
        return res.status(404).json({
            success: false,
            message: "Hotel not found",
        });
    }

    // Check if user is owner or admin
    if (hotel.owner.toString() !== userId && req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "You are not authorized to access this",
        });
    }

    // Cloudinary Image Handling
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
        for (const file of req.files) {
            const result = await uploadOnCloudinary(file.buffer, file.originalname);
            if (result?.secure_url) {
                imageUrls.push(result.secure_url);
            }
        }
    }

    // Create new room
    const newRoom = new Room({
        hotel: hotelId,
        roomNumber,
        type,
        price,
        amenities,
        capacity,
        images: imageUrls,
        description,
    });

    // Save room to DB
    await newRoom.save();

    res.status(201).json({
        success: true,
        message: "Room added successfully",
        room: newRoom,
    });

});

const getAllRooms = asyncHandler(async (req, res) => {
    const { hotelId } = req.params
    const rooms = await Room.find({ hotel: hotelId });

    if (!rooms.length) {
        return res.status(404).json({
            success: false,
            message: "Room not found",
        })
    }
    res.status(200).json({
        success: true,
        rooms
    })

});

// Get a single room by ID 

const getRoomById = asyncHandler(async (req, res) => {
    const { roomId } = req.params;
    const room = await Room.findById(roomId).populate("hotel");
    if (!room) {
        return res.status(404).json({ success: false, message: "Room not found" });
    }
    res.status(200).json({ success: true, room });
});

const deleteRoomById=asyncHandler(async(req,res)=>{
    const { roomId } = req.params;
    const userId = req.user.id; 
    const userRole = req.user.role; 

    // Find the room and its associated hotel
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found." });
    }

    // Fetch hotel to check ownership
    const hotel = await Hotel.findById(room.hotel);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found." });
    }

    // Authorization check: Only admin or hotel owner can delete
    if (userRole !== "admin" && hotel.owner.toString() !== userId) {
      return res.status(403).json({success:false, message: "Unauthorized: You cannot delete this room." });
    }

    await Room.findByIdAndDelete(roomId);
    res.status(200).json({ success:true,message: "Room deleted successfully." });

})

export { AddRoom,getAllRooms,getRoomById,deleteRoomById }