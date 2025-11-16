const express = require("express");
const router = express.Router()
const auth = require("../../middlewares/auth");
const { validateMessage, XmasMessage } = require("./models");

router.get("/", [], async (_, res) => {
    res.status(200).json({data: { message: "OK" }})
})

router.post("/message", [auth], async (req, res) => {
    const { error } = validateMessage(req.body)
    if (error) return res.status(400).json({ success: false, message: error.details[0].message, error })
    
    const xmasMessage = new XmasMessage(req.body)
    await xmasMessage.save()
    
    res.status(200).json({ success: true, message: "Message sent successfully" })
})

module.exports = router;
