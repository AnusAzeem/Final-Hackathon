import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    console.log("Authorization Header:", authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer "))
      return res.status(401).json({ message: "UnAuth user!" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    if (decoded.userId) {   
      console.log("User ID from token:", decoded.userId);
      req.userId = decoded.userId;
      next();
    } else {
      res.status(401).json({ message: "UnAuth user!" });
    }
  } catch (error) {
    console.error("Auth error:", error.message);
    res.status(401).json({ message: error.message || "UnAuth user!" });
  }
};
