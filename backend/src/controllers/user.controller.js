import express from "express";
import bcrypt from "bcrypt";
import { User } from "../Models/user.model.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../Middleware/asyncHandler.js";
import { isAuthenticated } from "../Middleware/isAuthenticated.middleware.js";

// User registration 

const RegisterUser = asyncHandler(async (req, res) => {
    const { name, email, password, phone, username } = req.body;

    if (!name || !email || !password || !phone || !username) {
        return res.status(400).json({
            success: false,
            message: "Please enter all fields"
        });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: "User already exists"
        });
    }

    const securePass = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        username,
        password: securePass,
        phone
    });

    res.status(200).json({
        success: true,
        message: "User created successfully",
        user
    });
});

// User Login 

const LoginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Please enter all required fields",
            success: false,
        });
    }

    let user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({
            message: "Please enter the correct credentials",
            success: false,
        });
    }

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
        return res.status(403).json({
            message: "Please enter the correct credentials",
            success: false
        });
    }

    // JWT Token
    const tokenData = { userID: user._id };
    const token = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    });

    user = {
        name: user.name,
        email: user.email,
        username:user.username,
        phone:user.phone
    };

    const cookieOptions = {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true
    };

    res.status(200).cookie("token", token, cookieOptions).json({
        success: true,
        // message: `Welcome back ${user.username}`,
        user,
        token
    });
});

const LogoutUser = asyncHandler(async (req, res) => {
    res.cookie("token", "", {
        maxAge: 0,
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
});

// User updating profile details 

const UpdateUser = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const source = req.body;

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        })
    }
    if (source.name) user.name = source.name;
    if (source.email) user.email = source.email;
    if (source.password) user.password = source.password;
    if (source.phone) user.phone = source.phone;
    if (source.username) user.phone = source.username;


    await user.save();
    res.status(200).json({
        success: true,
        message: "User updated successfully",
        user
    });

});

const getProfileDetails= asyncHandler(async(req,res)=>{
    const userId= req.user._id;
    
    // finding user 
    const user= await User.findById(userId).select("-password");
    if (!user){
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    // returning user details 
    return res.status(200).json(user);


})




export { LoginUser, RegisterUser, LogoutUser, UpdateUser,getProfileDetails };
