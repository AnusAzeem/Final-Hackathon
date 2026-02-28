import express from "express";
import { upload } from "../middleware/multerMiddleware.js";
import { cloudinaryUploader } from "../config/cloudinary.js";
import fs from "fs";
import { authMiddleware } from "../middleware/auth.js";
import UserModel from "../models/users.js";

const imageRoute = express.Router();

imageRoute.post(
  "/upload",
  authMiddleware,
  upload.single("profileImage"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image received" });
      }
      //new addition this 2 line for vercel
      const fileBase64 = req.file.buffer.toString("base64");
      const fileUri = `data:${req.file.mimetype};base64,${fileBase64}`;

      // 🔥 IMPORTANT CHANGE HERE
      const imageRes = await cloudinaryUploader.uploader.upload(fileUri, {
        folder: "profile-images",
      });

      await UserModel.findByIdAndUpdate(req.userId, {
        profileImage: imageRes.secure_url,
      });
      const user = await UserModel.findOne({ _id: req.userId });
      // console.log("UPDATED USER:", user);
      const UserData = {
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobileNumber: user.mobileNumber,
        profileImage: user.profileImage,
      };

      res.status(200).json({
        message: "Image uploaded successfully",
        url: imageRes.secure_url,
        data: UserData,
      });
    } catch (error) {
      console.error("CLOUDINARY ERROR FULL:", error);
      res.status(500).json({
        message: "Image upload failed",
        error: error.message,
      });
    }
  }
);

export default imageRoute;
