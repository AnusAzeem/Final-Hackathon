// verifyController.js
import jwt from "jsonwebtoken";
import UserModel from "../models/users.js";

export const verifyController = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ status: "failed", data: null });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ status: "failed", data: null });
    }

    res.status(200).json({
      status: "success",
      data: {
        name: user.name,
        email: user.email,
        imageUrl: user.imageUrl,
        mobileNumber: user.mobileNumber,
      },
    });
  } catch (error) {
    res.status(401).json({ status: "failed", data: null });
  }
};
