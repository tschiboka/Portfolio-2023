const express = require("express");
const dailyEmail = require("../scheduled/dailyEmail");
const route = express.Router();

route.post("/daily-breakdown", async (req, res) => {
    console.log("Send Scheduled Daily Breakdown Email...");
    const result = await dailyEmail();
    res.status(200).json(result);
});

module.exports = route;