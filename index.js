import express from "express";
import "dotenv/config";
import connectToDb from "./src/Database/db.js"; 
import userRouter from "./src/routes/user.routes.js"
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/user",userRouter)


connectToDb()

app.listen(process.env.PORT,(req,res)=>{
    console.log(`connection established on port ${process.env.PORT}`)
})

