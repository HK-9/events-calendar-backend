import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  datetime: { type: Date, required: true },
  tag: { type: String },
});

const Event = mongoose.model("Event", EventSchema);

export default Event;
