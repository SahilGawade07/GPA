import mongoose from "mongoose";    

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    hod: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "faculty",
        required: true,
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
        required: true,
    },
    dateOfEstablishment: {
        type: Date,
        required: true,
    }

},{timestamps: true});

export const Department = new  mongoose.model("Department", departmentSchema);