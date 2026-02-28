import UserModel from "../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import OTPModel from "../models/otp.js";

export const signupController = async (request, response) => {
  try {
    const { firstName, lastName, mobileNumber, email, password, role } =
      request.body;

    // 1. Validation for required fields
    if (
      !firstName ||
      !lastName ||
      !mobileNumber ||
      !email ||
      !password ||
      !role
    ) {
      return response.status(400).json({
        message:
          "Required fields (firstName, lastName, mobileNumber, email, password, role) are missing",
        status: "failed",
      });
    }

    // 2. Role Validation (Security check)
    const validRoles = ["Admin", "Doctor", "Patient", "Receptionist"];
    if (!validRoles.includes(role)) {
      return response.status(400).json({
        message: "Invalid role. Use: Admin, Doctor, Patient, or Receptionist",
        status: "failed",
      });
    }

    // 3. Check if User already exists
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return response.status(409).json({
        message: "User with this email already exists",
        status: "failed",
      });
    }

    // 4. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create User directly (isVerified: true rakhte hain taake login mein masla na ho)
    const newUser = await UserModel.create({
      firstName,
      lastName,
      mobileNumber,
      email,
      password: hashedPassword,
      role,
      isVerified: true, // Email nahi bhej rahe toh direct verify kar dete hain
    });

    // Success Response
    response.status(201).json({
      message: `${role} account created successfully!`,
      status: "success",
      data: {
        id: newUser._id,
        name: `${newUser.firstName} ${newUser.lastName}`,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    response.status(500).json({
      message: error.message || "Something went wrong during signup",
      status: "failed",
    });
  }
};

export const loginController = async (request, response) => {
  try {
    const { email, password, role } = request.body; // Frontend se role bhi le rahe hain
    // 1. Validation for required fields
    if (!email || !password || !role) {
      return response.status(400).json({
        message: "Email, Password and Role are required",
        status: "failed",
        data: null,
      });
    }

    // 2. Find User
    const user = await UserModel.findOne({ email });
    if (!user) {
      return response.status(404).json({
        message: "Invalid Email or Password",
        status: "failed",
        data: null,
      });
    }

    // 3. Role matching (Security Check)
    // Check karein ke jo role frontend ne bheja hai wo DB wale role se match karta hai
    if (user.role !== role) {
      return response.status(403).json({
        message: `Access Denied: You are registered as ${user.role}, not ${role}`,
        status: "failed",
        data: null,
      });
    }

    // 4. Check Verification
    if (!user.isVerified) {
      return response.status(401).json({
        message: "Your Email is not verified.",
        status: "failed",
        data: null,
      });
    }

    // 5. Compare Password
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return response.status(401).json({
        message: "Invalid Email or Password",
        status: "failed",
        data: null,
      });
    }

    // 6. Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // 7. Set Cookie
    response.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });

    // 8. Prepare User Data for Frontend
    const UserData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobileNumber: user.mobileNumber,
      profileImage: user.profileImage,
      role: user.role, // Ab ye confirm response mein jayega
    };

    // Logging for debugging
    console.log("Logged in user role:", user.role);

    // 9. Success Response
    return response.status(200).json({
      message: `${user.role} Login successfully`,
      status: "success",
      data: UserData,
      token,
    });

  } catch (error) {
    return response.status(500).json({
      message: error.message || "Something went wrong",
      status: "failed",
      data: null,
    });
  }
};