import mongoose from "mongoose";
import "dotenv/config";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
    },
    name:{type:String,
        required: true

    },
    username: {
        type: String,
        required: [true, "Please enter username"],
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
    },
    avatar: {
        type: String,
    },
    phone:{
        type: Number,

    },
    role: {
        type: String,
        enum: ["admin", "hotelOwner", "user"], 
        default: "user",
    },
    isBan: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
