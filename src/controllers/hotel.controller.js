import { asyncHandler } from "../Middleware/asyncHandler.js";
import { uploadOnCloudinary } from "../Middleware/utils/cloudinary.js";
import { Hotel } from "../Models/hotel.model.js";

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
    if (!hotels) {
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



export { createHotel, getAllHotels };
