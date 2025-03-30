import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sendOtpToAdmin } from "../utils/email.js";

dotenv.config();

// Function to generate OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// 1️⃣ Register New User (Sends OTP to Admin)
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp();

    // Save user with OTP (awaiting admin approval)
    const newUser = await User.create({ name, email, password: hashedPassword, otp, otpExpires: Date.now() + 10 * 60 * 1000 });

    // Send OTP to admin
    await sendOtpToAdmin(otp);

    res.status(200).json({ message: "OTP sent to admin. Waiting for approval." });
};

// 2️⃣ Admin Approves User with OTP
export const verifyUserOtp = async (req, res) => {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.otp !== otp || Date.now() > user.otpExpires) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Mark as approved & remove OTP
    user.isApproved = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({ message: "User approved successfully. They can now log in." });
};

// 3️⃣ User Login (Only if Approved)
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !user.isApproved) {
        return res.status(403).json({ message: "Account is not approved yet" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "2h" });

    res.status(200).json({ message: "Login successful", token });
};
