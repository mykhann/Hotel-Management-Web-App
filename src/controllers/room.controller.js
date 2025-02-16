import { Room } from "../Models/room.model.js";
import { Hotel } from "../Models/hotel.model.js";
import { asyncHandler } from "../Middleware/asyncHandler.js";
import { uploadOnCloudinary } from "../Middleware/utils/cloudinary.js";



const AddRoom= asyncHandler(async(req,res)=>{
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

export {AddRoom}