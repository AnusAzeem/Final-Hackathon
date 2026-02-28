import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String, default: "" },
    // Role logic added here
    role: {
      type: String,
      enum: ["Admin", "Doctor", "Patient", "Receptionist"],
      default: "Patient",
    },
    // Optional: Doctors ke liye specialization
    specialization: { type: String, default: "" },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
