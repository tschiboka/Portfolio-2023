const express = require("express");
const dailyEmail = require("../scheduled/dailyEmail");
const route = express.Router();

route.post("/daily-breakdown", async (req, res) => {
    await dailyEmail();
    res.status(200).json({ success: true });
});

module.exports = route;