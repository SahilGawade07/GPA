import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    post: {
      type: String,
      enum: ["clerk", "principal"],
      required: true,
    },
    profileImage: {
      type: String,
      //required: true
    }
  },
  {
    timestamps: true,
  }
);

adminSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hashSync(this.password, 10);
    next(); 
})

adminSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

adminSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    },
process.env.ACCESS_TOKEN_SECRET,
{
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
})
}

adminSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id: this._id,
    },
process.env.REFRESH_TOKEN_SECRET,
{
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
})
}

export const Admin = mongoose.model("Admin", adminSchema);
