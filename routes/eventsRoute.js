import express from "express";
import protectRoute from "../middlewares/protectedRoute.js";
import { createEvent, getAllEvents } from "./controller/eventController.js";

const router = express.Router();

router.post("/create-event", protectRoute, createEvent);

router.post("/get-all-event", protectRoute, getAllEvents);

export default router;
