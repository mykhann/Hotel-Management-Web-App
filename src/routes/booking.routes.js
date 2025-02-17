import { Router } from "express";
import { isAuthenticated } from "../Middleware/isAuthenticated.middleware.js";
import { createBooking, getBookingById } from "../controllers/booking.controller.js";
const router= new Router();

router.post("/:roomId",isAuthenticated,createBooking)
router.get("/getroom/:bookingId",isAuthenticated,getBookingById)
router.delete("/cancel-booking/:bookingId",isAuthenticated,getBookingById)


export default router;