const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    return res.status(200).json({ success: true });
});

module.exports = router;