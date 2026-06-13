const express = require("express");
const router = express.Router();

// Member 2 will push these — import once they exist
// const { getKpIndex } = require("../services/noaaService");
// const { getSolarFlare } = require("../services/nasaService");
// const { getISSPass } = require("../services/celestrakService");

router.get("/", async (req, res) => {
  try {
    // TEMPORARY stub — replace with real services once Member 2 pushes
    const event = {
      event: "geomagnetic storm",
      severity: 7,
      kpIndex: 7,
      solarFlare: "X1.4",
      iss: { nextPassMinutes: 21, direction: "NE" },
      weather: { cloudCover: 30, goodViewing: true },
    };
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;