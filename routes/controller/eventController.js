import Event from "../../models/event.model.js";

// Route to create an event
export const createEvent = async (req, res) => {
  const { name, datetime, tag } = req.body;

  // Validate event overlap: Check if there's an event at the same time
  const conflict = await Event.findOne({
    userId: req.user.id,
    datetime: new Date(datetime),
  });

  if (conflict) {
    return res.status(400).json({ error: "Event time conflict" });
  }

  const event = new Event({
    userId: req.user.id,
    name,
    datetime,
    tag,
  });

  await event.save();
  res.json({ message: "Event created successfully", event });
};

// Route to list all events for the authenticated user
export const getAllEvents = async (req, res) => {
  const events = await Event.find({ userId: req.user.id });
  res.json({ events });
};
