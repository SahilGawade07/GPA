import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerAdmin = asyncHandler(async (req, res) => {
    console.log("Admin register API hitted");
    
    res.status(200).json({
        message: "Register Admin API"
    })
});

export { registerAdmin };