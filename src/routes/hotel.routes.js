import  { Router } from 'express';
import { createHotel } from '../controllers/hotel.controller.js';
import { upload } from '../Middleware/multer.middleware.js';
const router= new Router();

router.post("/create",upload.single("image"),createHotel)




export default router;