import express from "express";
import { registerUser,verifyUserOtp,loginUser } from "../controller/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();
router.get("/", (req, res) => {
    res.json({ message: "User route is working" });
}   )
router.post("/register", registerUser);
router.post("/verify-otp", verifyUserOtp);
router.post("/login", loginUser);
router.get("/protected",authMiddleware,(req,res)=>{
    res.json({ message: "This is a protected route", user: req.user });
})

export default router;