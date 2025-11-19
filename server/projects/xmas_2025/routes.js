const express = require("express");
const router = express.Router()
const auth = require("../../middlewares/auth");
const { validateMessage, XmasMessage } = require("./models");
const { User } = require("../../models/user");

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

router.get("/message", [auth], async (req, res) => {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ success: false, message: "User ID is required" })

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" })
        
    if (user.isAdmin) {
        const messages = await XmasMessage.find().sort({ createdAt: -1 });
        return res.status(200).json({ success: true, data: messages })
    }

    const messages = await XmasMessage.find({ userId: user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: messages })
})

router.get("/message/device", async (_, res) => {
    const messages = await XmasMessage.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: messages })
})

module.exports = router;
