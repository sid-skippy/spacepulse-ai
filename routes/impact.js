const express = require("express");
const router = express.Router();
const Observation = require("../models/Observation");

// Member 3 will push this — import once it exists
// const { getImpact } = require("../services/impactEngine");

router.post("/", async (req, res) => {
  const { profession, event, severity, user_id } = req.body;

  try {
    // TEMPORARY stub — replace with real engine once Member 3 pushes
    // const result = await getImpact(profession, event, severity);

    const result = {
      impactScore: 8,
      summary: "High disruption expected for this profession.",
      recommendation: "Avoid GPS-reliant operations for the next 6 hours.",
    };

    // Save observation to MongoDB
    if (user_id) {
      await Observation.create({
        user_id,
        event,
        impact_score: result.impactScore,
      });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;