import express from "express";
import protectRoute from "../middlewares/protectedRoute.js";
import { login, logout, register } from "./controller/authController.js";

const router = express.Router();

// Register route
router.post("/register", register);

// Login route
router.post("/login", login);

// If the user is authenticated, this route will be reached
router.get("/check-auth", protectRoute, (req, res) => {
  res.status(200).json({ message: "User is authenticated" });
});

// Logout
router.post("/logout", logout);

export default router;
