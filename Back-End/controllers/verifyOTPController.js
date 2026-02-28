import OTPModel from "../models/otp.js";
import UserModel from "../models/users.js";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";

export const verifyOTPController = async (request, response) => {
  try {
    const { email, otp } = request.body;
    if (!email || !otp) {
      return response.status(400).json({
        message: "Required fields are missing",
        status: "failed",
        data: null,
      });
    }
    const isExist = await OTPModel.findOne({ email, isUsed: false }).sort({
      createdAt: -1,
    });
    console.log("isExist:", isExist);
    if (!isExist) {
      return response.status(404).json({
        message: "Invalid OTP or Email",
        status: "failed",
        data: null,
      });
    }
    if (isExist.otp !== otp) {
      return response.status(401).json({
        message: "Invalid OTP or Email",
        status: "failed",
        data: null,
      });
    }
    //otp expiration check
    const otpAge = Date.now() - isExist.createdAt;
    if (otpAge > 1 * 60 * 1000) {
      // 2 minutes
      return response.status(401).json({
        message: "OTP has expired",
        status: "failed",
        data: null,
      });
    }
    await OTPModel.findByIdAndUpdate(isExist._id, { isUsed: true });
    await UserModel.findOneAndUpdate({ email }, { isVerified: true });
    console.log("OTP is Verified");
    response.status(200).json({
      message: "OTP is Verified",
      status: "success",
    });
  } catch (error) {
    response.status(500).json({
      message: error.message || "Something went wrong",
      status: "failed",
      data: null,
    });
  }
};

export const resetOTPController = async (request, response) => {
  try {
    const { email } = request.body;
    if (!email) {
      return response.status(400).json({
        message: "Required fields are missing",
        status: "failed",
        data: null,
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return response.status(404).json({
        message: "Invalid Email Address",
        status: "failed",
        data: null,
      });
    }
    // console.log("User Name", user.firstName)
    const otp = uuidv4().slice(0, 6);
    //Vertication Email Sending
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
      subject: `Your Resent OTP Code`,
      html: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>Account Verification</title>
    <style>
      body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
      table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
      img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
      table { border-collapse: collapse !important; }
      body { margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #f4f7fe; }
      
      .wrapper { width: 100%; table-layout: fixed; background-color: #f8fafc; padding: 40px 0; }
      .main { background-color: #ffffff; margin: 0 auto; width: 100%; max-width: 600px; border-spacing: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #334155; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
      
      .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 50px 20px; text-align: center; }
      .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; }
      
      .content { padding: 45px 35px; text-align: center; }
      .greeting { font-size: 22px; font-weight: 700; color: #0f172a; margin-bottom: 12px; }
      .instruction { font-size: 16px; line-height: 1.6; color: #64748b; margin-bottom: 35px; }
      
      .otp-card { background-color: #f8fafc; padding: 35px 20px; border-radius: 20px; margin: 25px 0; border: 2px solid #e2e8f0; }
      .otp-code { font-size: 44px; font-weight: 800; letter-spacing: 12px; color: #0d47a1; margin: 0; }
      .expiry-badge { display: inline-block; font-size: 13px; color: #ef4444; font-weight: 700; margin-top: 18px; background: #fee2e2; padding: 6px 16px; border-radius: 50px; text-transform: uppercase; }
      
      .btn { display: inline-block; padding: 16px 35px; background-color: #0f172a; color: #ffffff !important; text-decoration: none; border-radius: 12px; font-weight: 700; margin-top: 25px; }
      
      .footer { padding: 35px; text-align: center; font-size: 13px; color: #94a3b8; line-height: 1.8; background-color: #ffffff; border-top: 1px solid #f1f5f9; }
      .footer-bold { color: #64748b; font-weight: 600; }
    </style>
  </head>
  <body>
    <div style="display:none; max-height:0; overflow:hidden; opacity:0; font-size:1px;">Security verification: Your account activation code is here.</div>
    
    <div class="wrapper">
      <table class="main" align="center">
        <tr>
          <td class="header">
            <h1>AUTHENTICATION</h1>
          </td>
        </tr>

        <tr>
          <td class="content">
            <div class="greeting">Hi ${user.firstName + " " + user.lastName},</div>
            <p class="instruction">To ensure your account's security, please verify your identity. Use the unique verification code provided below to complete the process:</p>
            
            <div class="otp-card">
              <div class="otp-code">${otp}</div>
              <div class="expiry-badge">Expires in 02 minutes</div>
            </div>

            <p class="instruction" style="font-size: 14px; margin-top: 20px;">
              <strong>Security Note:</strong> If you did not request this code, your account security might be at risk. Please ignore this email or contact our support team if you have concerns.
            </p>
            
            <a href="mailto:anus.azeem846@gmail.com" class="btn">Get Technical Support</a>
          </td>
        </tr>

        <tr>
          <td class="footer">
            <span class="footer-bold">Security Center</span><br>
            Advanced encryption and identity protection.<br>
            &copy; ${new Date().getFullYear()} All rights reserved.
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>
`,
    });
    const otpObj = {
      otp,
      email,
    };
    await OTPModel.create(otpObj);
    response.status(200).json({
      message: "OTP Sent Successfully",
      status: "success",
    });
  } catch (error) {
    response.status(500).json({
      message: error.message || "Something went wrong",
      status: "failed",
      data: null,
    });
  }
};
