import { Router } from 'express';
import { createHotel, DeleteHotel, getAllHotels, getHotelByID, updateHotel } from '../controllers/hotel.controller.js';
import { upload } from '../Middleware/multer.middleware.js';
import { isAuthenticated } from '../Middleware/isAuthenticated.middleware.js';
const router = new Router();

router.post("/create", upload.single("image"), createHotel)
router.get("/get/hotels", getAllHotels)
router.get("/get/:id", getHotelByID)
router.put("/update/:id", isAuthenticated, upload.single("image"), updateHotel)
router.delete("/delete/:id", isAuthenticated, DeleteHotel)




export default router;