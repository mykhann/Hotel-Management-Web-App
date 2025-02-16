import { asyncHandler } from "../Middleware/asyncHandler.js";
import { uploadOnCloudinary } from "../Middleware/utils/cloudinary.js";
import { Hotel } from "../Models/hotel.model.js";
import mongoose from "mongoose";
import { User } from "../Models/user.model.js";
import bcrypt from "bcrypt"

const createHotel = asyncHandler(async (req, res) => {
    const { name, location, description, phone, email, ownerName, ownerEmail, ownerPassword } = req.body;

    if (!name || !location || !phone || !email || !ownerName || !ownerEmail || !ownerPassword) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Check if owner email already exists
    let hotelOwner = await User.findOne({ email: ownerEmail });

    if (hotelOwner) {
        return res.status(400).json({ success: false, message: "Hotel owner with this email already exists" });
    }

    let imageUrl = "";

    if (req.file) {
        const result = await uploadOnCloudinary(req.file.buffer, `hotels/${Date.now()}-${req.file.originalname}`);
        imageUrl = result.secure_url;
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(ownerPassword, 10);

    // Create the hotel owner
    hotelOwner = await User.create({
        name: ownerName,
        email: ownerEmail,
        password: hashedPassword,
        isHotelOwner: true,
        username: ownerEmail.split("@")[0]
    });

    // Create the hotel & assign the owner
    const newHotel = await Hotel.create({
        name,
        location,
        description,
        phone,
        email,
        images: imageUrl ? [imageUrl] : [],
        owner: hotelOwner._id, // Link hotel to owner
    });

    res.status(201).json({
        success: true,
        message: "Hotel created successfully & assigned to owner",
        hotel: newHotel,
        owner: { name: hotelOwner.name, email: hotelOwner.email },
    });
});


// get all hotels 
const getAllHotels = asyncHandler(async (req, res) => {

    const hotels = await Hotel.find().populate("owner", "name email")
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
