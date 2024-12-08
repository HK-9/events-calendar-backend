import moment from "moment";
import Event from "../../models/event.model.js";
import { isValidDate } from "../../utils/helpers.js";

// Route to create an event
export const createEvent = async (req, res) => {
  const { name, startDate, endDate, tag } = req.body;

  // Validate input data
  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "Invalid event name" });
  }

  if (!startDate || !isValidDate(startDate)) {
    return res.status(400).json({ error: "Invalid start date" });
  }

  if (!endDate || !isValidDate(endDate)) {
    return res.status(400).json({ error: "Invalid end date" });
  }

  const start = moment(startDate);
  const end = moment(endDate);

  if (!start.isBefore(end)) {
    return res
      .status(400)
      .json({ error: "Start date must be before end date" });
  }

  if (tag && typeof tag !== "string") {
    return res.status(400).json({ error: "Invalid event tag" });
  }

  try {
    // Validate event overlap: Check if there's an event in the same time range
    const conflict = await Event.findOne({
      userId: req.user.id,
      $or: [
        {
          startDate: { $lte: end.toDate() },
          endDate: { $gte: start.toDate() },
        },
      ],
    });

    if (conflict) {
      return res.status(400).json({ error: "Event time conflict" });
    }

    const event = new Event({
      userId: req.user.id,
      name,
      startDate,
      endDate,
      tag,
    });

    await event.save();

    res.status(200).json({ message: "Event created successfully", event });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Failed to create event" });
  }
};

// Route to list all events for the authenticated user
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({ userId: req.user.id }).sort({
      startDate: 1,
    });
    res.status(200).json({ events });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};
