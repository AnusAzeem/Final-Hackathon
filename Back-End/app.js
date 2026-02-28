import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import imageRoute from "./routes/image.js";
import userRoute from "./routes/userUpdate.js";

dotenv.config();
const app = express();


//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//For Front-End Access
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

//DB Connection
connectDB();

//All Routes
app.use("/api/auth", authRoutes);
app.use("/api/image", imageRoute);
app.use("/api/user", userRoute);

//Default Route
app.get("/", (req, res) => {
  res.json({ message: "API is running..." });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT,"0.0.0.0", () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
