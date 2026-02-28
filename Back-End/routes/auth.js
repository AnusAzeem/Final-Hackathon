import express from "express";
import { loginController, signupController } from "../controllers/auth.js";
import { resetOTPController, verifyOTPController } from "../controllers/verifyOTPController.js";
import { changePasswordController, forgotPasswordController } from "../controllers/forgotPasswordController.js";
import { logoutController } from "../controllers/logoutController.js";
import { aiChat } from "../controllers/ai.js";
import { authMiddleware } from "../middleware/auth.js";
const authRoutes = express.Router();

authRoutes.post("/signup", signupController);
authRoutes.post("/login", loginController);
authRoutes.post("/verify-otp", verifyOTPController);
authRoutes.post("/reset-otp", resetOTPController);
authRoutes.post("/forgot-password", forgotPasswordController);
authRoutes.post("/change-password", changePasswordController);
authRoutes.post("/logout", logoutController);
authRoutes.post("/ai-chat",authMiddleware, aiChat);



export default authRoutes;
