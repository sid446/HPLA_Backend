import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    isApproved: { type: Boolean, default: false }, // Admin Approval
    otp: String, // Stores the OTP until verified
    otpExpires: Date,
});

export const User = mongoose.model("User", userSchema);