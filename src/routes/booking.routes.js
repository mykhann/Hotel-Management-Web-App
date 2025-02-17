import { Router } from "express";
import { isAuthenticated } from "../Middleware/isAuthenticated.middleware.js";
import { createBooking } from "../controllers/booking.controller.js";
const router= new Router();

router.post("/:roomId",isAuthenticated,createBooking)


export default router;