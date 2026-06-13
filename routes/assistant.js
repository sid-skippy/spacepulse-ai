const express = require("express");
const router = express.Router();

// const { getAssistantReply } = require("../services/aiService");

router.post("/", async (req, res) => {
  const { messages } = req.body;

  try {
    // TEMPORARY stub — replace with real aiService once Member 3 pushes
    // const reply = await getAssistantReply(messages);

    const reply = "I'm SpacePulse AI! Ask me anything about space weather.";
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;