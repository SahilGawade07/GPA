import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
    branchName: {
        type: String,
        required: true
    },
    branchIntake: {
        type: String,
        required: true
    },
    branchCode: {
        type: String,
        required: true
    },
    branchLogo: {
        type: String,
    },
    branchVision: {
        type: String,
        required: true
    },
    branchMission: {
        type: String,
        required: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: true
    }
},
{timestamps: true}
)

export const Branch = mongoose.model("Branch", branchSchema);