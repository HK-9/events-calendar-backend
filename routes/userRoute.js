import express from "express";
import protectRoute from "../middlewares/protectedRoute.js";
import { getUserDetails } from "./controller/userController.js";

const router = express.Router();

router.get("/get-user-details", protectRoute, getUserDetails);

export default router;
