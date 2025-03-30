import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

/**
 * Sends an OTP to the admin email.
 * @param {string} otp - The generated OTP to send.
 */
export const sendOtpToAdmin = async (otp) => {
    const mailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.ADMIN_EMAIL,
        subject: "New User Registration - OTP Approval",
        text: `A new user wants to register. Use this OTP to approve: ${otp}`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("OTP Email sent: ", info.response);
        return info;
    } catch (error) {
        console.error("Error sending OTP email:", error);
        throw error;
    }
};
