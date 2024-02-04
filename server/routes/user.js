const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const { User, validateUser, generateToken } = require('../models/user')
const bcrypt = require("bcrypt")
const { Settings, HALF_AN_HOUR_IN_SEC } = require("../models/setting")
const { Token, validateToken } = require("../models/token")
const nodemailer = require("nodemailer");

router.get("/", async (req, res) => {
    const users = await User.find()
    if (!users.length) return res.status(404).json({ success: false, message: "Content not Found" })
    res.status(200).json({ success: true, data: users })
})

router.get("/:id", async (req, res) => {
    const valid = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!valid) return res.status(400).json({ success: false, message: "Invalid user id: " + req.params.id }) 
    
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ success: false, message: "Content not Found" })
    res.status(200).json({ success: true, data: user })
})

router.post("/", async (req, res) => {
    const { error } = validateUser(req.body)
    if (error) return res.status(400).json({ success: false, message: error.details[0].message, error })

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)
    
    // Create user
    const user = await new User({...req.body, password })

    // Get settings for session expiry duration and max users
    const settingErrorMsg = "Could not find settings on database"
    const settings = await Settings.find()
    const setting = settings[0]
    if (!setting) return res.status(404).json({ success: false, message: settingErrorMsg })
    
    const expiresErrorMsg = "Invalid expiration time in settings"
    const {registrationTokensExpireInMs: expires, maxUsers} = setting
    const iat = Math.floor(Date.now() / 1000)
    if (expires === undefined || expires < HALF_AN_HOUR_IN_SEC) return res.status(400).json({ success: false, message: expiresErrorMsg })
    
    const users = await User.find()
    const maxUserMessage = "Registration failed: the application reached the maximum number of users"
    if (users.length >= maxUsers) return res.status(403).json({ success: false, message: maxUserMessage })

    // Generate and store token
    const emailVerificationToken = generateToken(user, iat + expires, false)
    const token = new Token({userId: user._id, token: emailVerificationToken})
    await token.save()
    await user.save()

    // Send confirmation email
    const emailMessage = `
    <h1>Confirm Registration</h1>
    <p>Please confirm your registration on Tschiboka App by clicking on the link below:</p>
    <p><a href=https://localhost:5000/api/confirm/${emailVerificationToken}>
        <strong>Verify registration</strong>
    </a></p>`
    
    const fromEmailAddress = "tibi.aki.tivadar@gmail.com";
    const toEmailAddress = "dev@tschiboka.co.uk";
    const emailPassword = process.env.EMAIL_PASSWORD;
    
    const mailOptions = {                                          // Email Specifications
        from: fromEmailAddress,                                       
        to: [fromEmailAddress, toEmailAddress],
        subject: 'Confirm Registration | TSCHIBOKA.CO.UK',
        html: emailMessage
    };

    const transporter = nodemailer.createTransport({
        auth: {
            user: fromEmailAddress,
            pass: emailPassword
        },
        secure: true,
        port: 465,
        tls: { rejectUnauthorized: false },
        host: "smtp.gmail.com",
    });
    try {
        await transporter.sendMail(mailOptions);
        return res.json({success: true, message: "Confirmation email sent"});
    } catch (err) {
        return res.status(500).json({ success: false, message: "Could not send verification email" });
    }
})

module.exports = router