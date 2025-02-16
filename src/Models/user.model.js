import mongoose from "mongoose";
import "dotenv/config"

const userSchema = new mongoose.Schema({
   
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true
    },
    username: {
        type: String,
        required: [true, "Please enter username"],
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
    isHotelOwner:{
        type:Boolean,
        default: false
    },
    isBan:{
        type:Boolean,
        default: false
    }
}, { timestamps: true });




export const User = mongoose.model("User", userSchema)