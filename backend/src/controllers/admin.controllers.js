import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Admin } from "../models/admin.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
// import { JsonWebTokenError } from "jsonwebtoken";
// import jwt from "jsonwebtoken";

const generateAcessAndRefreshTokens = async (adminId) => {
    try {
      const admin = await Admin.findById(adminId);
      const accessToken = admin.generateAccessToken();
      const refreshToken = admin.generateRefreshToken();
  
      admin.refreshToken = refreshToken;
      await admin.save({ validateBeforeSave: false });
  
      return { accessToken, refreshToken };
    } catch (error) {
      throw new ApiError(500, "Something went wrong while generating tokens");
    }
  };


const registerAdmin = asyncHandler(async (req, res) => {
    
    const {firstName, middleName, lastName, gender, email, password, post} = req.body;

    if(
        [firstName, middleName, lastName, gender, email, password, post].some(
            (field) => field?.trim() === ""
        )
    ){
        throw new Error("All fields are required");
    }

    const existedAdmin = await Admin.findOne({
        $or: [{email}]
    });

    if(existedAdmin){
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

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if(!email){
        throw new Error(400,"Enter the email");
    }
    if(!password){
        throw new Error(400,"Enter the password");
    }
    const admin = await Admin.findOne({email});

    if(!admin){
        throw new Error(404,"Admin not found");
    }

    const isPasswordValid = await admin.isPasswordCorrect(password);

    if(!isPasswordValid){
        throw new Error(401,"Invalid password");
    }
    
    const { accessToken, refreshToken } = await generateAcessAndRefreshTokens(
        admin._id
    );

    const loggedInAdmin = await Admin.findById(admin._id).select(
        "-password -refreshToken"
    );

    const options = {
        httponly: true,
        secure: true
    };

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInAdmin,
                accessToken,
                refreshToken
            },
            "Admin logged in successfully"
    )
)
});

const logoutAdmin = asyncHandler(async (req, res) => {
    await Admin.findByIdAndUpdate(
        req.admin._id,
        {
            $unset: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true
    };

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json( new ApiResponse(200,{}, "Admin logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if(!incomingRefreshToken){
        throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

    const admin = await Admin.findById(decodedToken?._id);
    
    if(!admin){
        throw new ApiError(404, "Admin not found");
    }

    if(incomingRefreshToken !== admin.refreshToken){
        throw new ApiError(401, "Unauthorized request");
    }

    const options = {
        httpOnly: true,
        secure: true
    };

    await generateAcessAndRefreshTokens(admin._id);

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
})
export { registerAdmin, loginAdmin, logoutAdmin };