import { asyncHandler } from "../Middleware/asyncHandler.js";
import { uploadOnCloudinary } from "../Middleware/utils/cloudinary.js";
import { Hotel } from "../Models/hotel.model.js";
import mongoose from "mongoose";

const createHotel = asyncHandler(async (req, res) => {
    const { name, location, description, phone, email } = req.body;

    if (!name || !location || !phone || !email) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields"
        });
    }

    let imageUrl = "";

    if (req.file) {
        const result = await uploadOnCloudinary(req.file.buffer, `hotels/${Date.now()}-${req.file.originalname}`);
        imageUrl = result.secure_url;
    }

    const newHotel = await Hotel.create({
        name,
        location,
        description,
        phone,
        email,
        images: imageUrl ? [imageUrl] : [],
    });

    res.status(201).json({
        success: true,
        message: "Hotel created successfully", hotel: newHotel
    });
});

// get all hotels 
const getAllHotels = asyncHandler(async (req, res) => {

    const hotels = await Hotel.find()
    if (!hotels.length === 0) {
        return res.status(404).json({
            success: false,
            message: "Hotels not found",
        });
    };
    return res.status(200).json({
        success: true,
        hotels
    })
})

// get hotel by ID

const getHotelByID = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid hotel ID",
        });
    }

    const hotel = await Hotel.findById(id);

    if (!hotel) {
        return res.status(404).json({
            success: false,
            message: "Hotel not found",
        });
    }

    return res.status(200).json({
        success: true,
        hotel
    });
});


export { createHotel, getAllHotels, getHotelByID };
