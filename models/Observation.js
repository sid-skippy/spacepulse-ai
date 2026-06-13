const mongoose = require("mongoose");

const observationSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  event: { type: String },
  impact_score: { type: Number },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Observation", observationSchema);