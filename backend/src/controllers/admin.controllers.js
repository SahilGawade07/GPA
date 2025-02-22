import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Admin } from "../models/admin.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const registerAdmin = asyncHandler(async (req, res) => {
    
    const {firstName, middleName, lastName, gender, email, password, post} = req.body;

    if(
        [firstName, middleName, lastName, gender, email, password, post].some(
            (field) => field?.trim() === ""
        )
    ){
        throw new Error("All fields are required");
    }

    const existedUser = await Admin.findOne({
        $or: [{email}]
    });

    if(existedUser){
        throw new Error("User already exists");
    }

    const admin = await Admin.create({
        firstName,
        middleName,
        lastName,
        gender,
        email,
        password,
        post,
    });

    const createdAdmin = await Admin.findById(admin._id).select(
        "-password -refreshToken"
    );

    if(!createdAdmin){
        throw new Error("Something went wrong while registering admin");
    }

    return res.status(201).json(
        new ApiResponse(201, "Admin registered successfully")
    )

});

export { registerAdmin };