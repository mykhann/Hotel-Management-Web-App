import { Router } from "express";
import { LoginUser, LogoutUser, RegisterUser, UpdateUser } from "../controllers/user.controller.js";
import { isAuthenticated } from "../Middleware/isAuthenticated.middleware.js";
const router = new Router();


router.post('/login',LoginUser)
router.post('/register',RegisterUser)
router.post("/logout",LogoutUser)
router.put("/Update-Profile",isAuthenticated,UpdateUser)

export default router