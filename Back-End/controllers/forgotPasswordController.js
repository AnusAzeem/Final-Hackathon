import jwt from "jsonwebtoken";
import UserModel from "../models/users.js";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

export const forgotPasswordController = async (request, response) => {
  try {
    const { email } = request.body;
    if (!email) {
      return response.status(400).json({
        message: "Email is required",
        Status: "Failed",
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return response.status(404).json({
        message: "Invalid Email Address",
        Status: "Failed",
      });
    }
    const token = jwt.sign(
      { _id: user._id, email: email },
      process.env.JWT_SECRET,
      { expiresIn: "5m" },
    );
    console.log(token);
    const resetLink = `http://localhost:5173/change-password?token=${token}`;
    // send verify link
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: `Reset Your Password`,
      html: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>Password Reset</title>
    <style>
      body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
      table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
      img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
      table { border-collapse: collapse !important; }
      body { margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #f8fafc; }
      
      .wrapper { width: 100%; table-layout: fixed; background-color: #f8fafc; padding: 40px 0; }
      .main { background-color: #ffffff; margin: 0 auto; width: 100%; max-width: 600px; border-spacing: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1e293b; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
      
      .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 50px 20px; text-align: center; }
      .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; }
      
      .content { padding: 45px 35px; text-align: center; }
      .user-name { font-size: 22px; font-weight: 700; color: #0f172a; margin-bottom: 12px; }
      .text { font-size: 16px; line-height: 1.6; color: #64748b; margin-bottom: 30px; }
      
      .btn-container { margin: 30px 0; }
      .reset-btn { display: inline-block; padding: 18px 45px; background-color: #0d47a1; color: #ffffff !important; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; box-shadow: 0 5px 15px rgba(13, 71, 161, 0.3); }
      
      .footer { padding: 35px; text-align: center; font-size: 13px; color: #94a3b8; line-height: 1.8; background-color: #ffffff; border-top: 1px solid #f1f5f9; }
      .footer a { color: #0d47a1; text-decoration: none; font-weight: 600; }
    </style>
  </head>
  <body>
    <div style="display:none; max-height:0; overflow:hidden; opacity:0; font-size:1px;">Securely reset your account password.</div>
    
    <div class="wrapper">
      <table class="main" align="center">
        <tr>
          <td class="header">
            <h1>AUTHENTICATION</h1>
          </td>
        </tr>

        <tr>
          <td class="content">
            <div class="user-name">Password Reset Request 🔒</div>
            <div style="font-size: 18px; color: #334155; margin-bottom: 15px;">
              Hi ${user.firstName + " " + user.lastName},
            </div>
            <p class="text">
              We received a request to reset your password. To ensure the security of your account, please click the button below to set a new password:
            </p>
            
            <div class="btn-container">
              <a href="${resetLink}" class="reset-btn">Reset Password</a>
            </div>

            <p class="text" style="font-size: 14px;">
              This link is valid for <strong>5 minutes</strong>. If you did not make this request, you can safely ignore this email; your account is still secure.
            </p>
          </td>
        </tr>

        <tr>
          <td class="footer">
            <strong>Security Center</strong><br>
            Keeping your data safe and secure.<br>
            &copy; ${new Date().getFullYear()} All rights reserved. <br>
            <a href="mailto:anus.azeem846@gmail.com">Contact Support</a>
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>
`,
    });

    response.status(200).json({
      message: "Please check your email for reset link",
      Status: "Success",
      data: null,
    });
  } catch (error) {
    response.status(500).json({
      message: error.message || "Something went wrong",
      Status: "Failed",
      data: null,
    });
  }
};

export const changePasswordController = async (request, response) => {
  try {
    const { token, newPassword } = request.body;

    if (!token || !newPassword) {
      return response.status(400).json({
        message: "All fields are required",
        Status: "Failed",
      });
    }

    let tokenVerified;
    try {
      tokenVerified = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return response.status(401).json({
        message: "Link expired or invalid token",
        Status: "Failed",
      });
    }

    if (!tokenVerified.email || !tokenVerified._id) {
      return response.status(401).json({
        message: "Invalid Token details",
        Status: "Failed",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await UserModel.findByIdAndUpdate(tokenVerified._id, {
      password: hashedPassword,
    });

    if (!user) {
      return response.status(404).json({
        message: "User not found",
        Status: "Failed",
      });
    }

    response.status(200).json({
      message: "Password changed successfully",
      Status: "Success",
      data: null,
    });
  } catch (error) {
    response.status(500).json({
      message: error.message || "Something went wrong",
      Status: "Failed",
      data: null,
    });
  }
};
