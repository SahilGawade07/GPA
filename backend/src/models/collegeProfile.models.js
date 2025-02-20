import mongoose from "mongoose";    

const collegeProfileSchema = new mongoose.Schema({
    collegeName: {
        type: String,
        default: 'Government Polytechnic Awsari',
        required: true
    },
    aicteCode: {
        type: String,
        default: '0',
        required: true
    },
    aicteApprovalLetter: {
        type: String,
        required: true
    },
    msbteCode: {
        type: String,
        default: '0',
        required: true
    },
    dteCode: {
        type: String,
        default: '0',
        required: true
    },
    numberOfBracnhes: {
        type: Number,
        default: 0,
        required: true
    },
    branchCode: {
        type: String,
        default: '0',
        required: true
    },
    branchIntake: {
        type: String,
        required: true
    },
    instituteVision: {
        type: String,
        required: true
    },
    instituteMission: {
        type: String,
        required: true
    },


},{timestamps: true});

export const CollegeProfile = mongoose.model('CollegeProfile', collegeProfileeSchema);