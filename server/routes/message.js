const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { Message, validateMessage } = require("../models/message");


router.post("/", async (req, res) => {
    const { name, email, phone, message } = req.body;
    const { error } = validateMessage(req.body);
    
    if (error) return res.json({
        success: false,
        error: error.message
    });

    const messageEntry = await Message({
        name,
        email,
        phone: phone.length === 0 ? undefined : phone,
        message,
    });

    await messageEntry.save();
    
    return res.status(200).json({ success: true, message: "Message Sent!" });
});

module.exports = router;