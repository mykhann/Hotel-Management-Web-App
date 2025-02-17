import { Router } from "express";
import { AddRoom, deleteRoomById, getAllHotelRooms, getAllRooms,getRoomById } from "../controllers/room.controller.js";
import { upload } from "../Middleware/multer.middleware.js";
import { isAuthenticated } from "../Middleware/isAuthenticated.middleware.js";
const router= new Router();

router.post("/add/:hotelId",isAuthenticated,upload.array("images",5),AddRoom)
router.get("/get/:hotelId",getAllHotelRooms)
router.get("/:roomId",getRoomById)
router.get("/allrooms",getAllRooms)
router.delete("/delete/:roomId",isAuthenticated,deleteRoomById)


export default router;