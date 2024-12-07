import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  const token = req?.cookies?.jwt;
  // Check if token exists
  if (!token) {
    return res.status(401).json({ error: "Unauthorized - No Token Provided" });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Retrieve user based on decoded userId
    const user = await User.findById(decoded.id).select("-password");

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Attach user to request object
    req.user = user;

    // Proceed to the next middleware/route handler
    return next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Unauthorized - Token Expired" });
    }

    console.error("Error in protectRoute middleware:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;
