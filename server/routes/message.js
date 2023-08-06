const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
    return res.status(200).json({ success: true, message: "Message Sent!" });
});

module.exports = router;