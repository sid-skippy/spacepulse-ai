const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String },
  profession: { type: String },
  location_lat: { type: Number },
  location_lon: { type: Number },
});

module.exports = mongoose.model("User", userSchema);