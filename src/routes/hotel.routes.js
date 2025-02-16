import { Router } from 'express';
import { createHotel, getAllHotels } from '../controllers/hotel.controller.js';
import { upload } from '../Middleware/multer.middleware.js';
const router = new Router();

router.post("/create", upload.single("image"), createHotel)
router.get("/get/hotels", getAllHotels)




export default router;