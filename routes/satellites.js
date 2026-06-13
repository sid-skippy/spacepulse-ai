const express = require("express");
const router = express.Router();

// const { getISSPass } = require("../services/celestrakService");

router.get("/", async (req, res) => {
  try {
    // TEMPORARY stub
    const iss = { nextPassMinutes: 21, direction: "NE", lat: 22.3, lon: 70.7 };
    res.json(iss);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;