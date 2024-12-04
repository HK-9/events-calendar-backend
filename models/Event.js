const mongoose = require("mongoose");
const EventSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  datetime: { type: Date, required: true },
  tag: { type: String },
});
module.exports = mongoose.model("Event", EventSchema);
