const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  featureFlag: { type: Boolean, default: false }, // google calendar Sync
});
module.exports = mongoose.model("User", UserSchema);
