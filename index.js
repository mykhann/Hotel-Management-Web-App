import express from "express";
import "dotenv/config";
import connectToDb from "./src/Database/db.js"; 
import userRouter from "./src/routes/user.routes.js"
import cookieParser from "cookie-parser";
import roomRouter from "./src/routes/room.routes.js"
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// User Routes
app.use("/api/v1/user",userRouter)

// Room Routes
app.use("/api/v1/room",roomRouter)



connectToDb()

app.listen(process.env.PORT,(req,res)=>{
    console.log(`connection established on port ${process.env.PORT}`)
})

