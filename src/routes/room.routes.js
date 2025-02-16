import  { Router } from 'express';
import { createRoom } from '../controllers/room.controller.js';
const router= new Router();

router.post("/create/room",createRoom)




export default router;