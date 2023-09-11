const express = require("express");
const dailyEmail = require("../scheduled/dailyEmail");
const route = express.Router();

route.post("/daily-breakdown", async (req, res) => {
    console.log("HERE");
    await dailyEmail();
    res.status(200).json({ success: true });
});

module.exports = route;