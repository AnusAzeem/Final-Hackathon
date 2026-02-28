import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import UserModel from "../models/users.js";
const userRoute = express.Router();

userRoute.put("/update-profile", authMiddleware, async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      gender,
      country,
      profileImage,
      address,
      mobileNumber,
    } = req.body;

    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check agar naam change ho raha hai to sirf analytics/log ke liye date update kar sakte hain
    const isNameChanging =
      (firstName && firstName !== user.firstName) ||
      (lastName && lastName !== user.lastName);

    if (isNameChanging) {
      user.lastNameChangeAt = new Date(); // Sirf record ke liye date update hogi, koi rukawat nahi
    }

    // Saari fields update karein (agar body mein hain to update, warna purani hi rahegi)
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.gender = gender || user.gender;
    user.country = country || user.country;
    user.profileImage = profileImage || user.profileImage;
    user.address = address || user.address;
    user.mobileNumber = mobileNumber || user.mobileNumber;

    // Save karein
    const updatedUser = await user.save();

    // Sensitive data hide karne ke liye (Optional but Recommended)
    const userData = updatedUser.toObject();
    delete userData.password;

    res.status(200).json({
      success: true,
      message: "Profile updated successfully! ✅",
      user: userData,
    });
  } catch (error) {
    console.error("Update profile error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default userRoute;