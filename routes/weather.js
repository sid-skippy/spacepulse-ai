const express = require("express");
const router = express.Router();

// const { getWeather } = require("../services/weatherService");

router.get("/", async (req, res) => {
  try {
    // TEMPORARY stub
    const weather = { cloudCover: 30, visibility: 20, goodViewing: true };
    res.json(weather);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;