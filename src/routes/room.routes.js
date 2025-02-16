import { Router } from "express";
import { AddRoom } from "../controllers/room.controller.js";
import { upload } from "../Middleware/multer.middleware.js";
import { isAuthenticated } from "../Middleware/isAuthenticated.middleware.js";
const router= new Router();

router.post("/add/:hotelId",isAuthenticated,upload.array("images",5),AddRoom)

export default router;