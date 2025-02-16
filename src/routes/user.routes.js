import { Router } from "express";
import { LoginUser, LogoutUser, RegisterUser } from "../controllers/user.controller.js";
const router = new Router();


router.post('/login',LoginUser)
router.post('/register',RegisterUser)
router.post("/logout",LogoutUser)

export default router