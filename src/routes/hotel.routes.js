import { Router } from 'express';
import { createHotel, getAllHotels, getHotelByID } from '../controllers/hotel.controller.js';
import { upload } from '../Middleware/multer.middleware.js';
const router = new Router();

router.post("/create", upload.single("image"), createHotel)
router.get("/get/hotels", getAllHotels)
router.get("/get/:id", getHotelByID)




export default router;