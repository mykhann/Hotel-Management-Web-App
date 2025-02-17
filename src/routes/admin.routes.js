import { Router } from "express";
import { viewAllBookings, viewAllRooms } from "../controllers/admin.controller.js";
import { isAuthenticated } from "../Middleware/isAuthenticated.middleware.js";
const router= new Router();

router.get("/bookings",isAuthenticated,viewAllBookings)
router.get("/rooms",isAuthenticated,viewAllRooms)



export default router;