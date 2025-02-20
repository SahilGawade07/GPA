import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: true,
    },
    designation: {
        type: String,
        enum: ["faculty", "hod", "principal"],
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        required: true,
    },
},{timestamps:true});

export const Faculty = mongoose.model("Faculty", facultySchema);