import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config"

const userSchema = new mongoose.Schema({
   
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
    },
    avatar: {
        type: String,
       
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    isOwner:{
        type:Boolean,
        default: false
    },
    isBan:{
        type:Boolean,
        default: false
    }
}, { timestamps: true });




export const User = mongoose.model("User", userSchema)