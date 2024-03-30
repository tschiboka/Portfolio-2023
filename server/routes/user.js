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
    
    // Check for duplicate user names
    const duplicateUserName = await User.find({userName: req.body.userName})
    if (duplicateUserName.length) return res.status(409).json({ success: false, message: "User name already in use" })
    
    // Check for duplicate email
    const duplicateEmail = await User.find({email: req.body.email})
    if (duplicateEmail.length) return res.status(409).json({ success: false, message: "Email already in use" })

    // Get settings for session expiry duration and max users
    const settingErrorMsg = "Could not find settings on database"
    const settings = await Settings.find()
    const setting = settings[0]
    if (!setting) return res.status(404).json({ success: false, message: settingErrorMsg })
    
    // Add token expiration date
    const expiresErrorMsg = "Invalid expiration time in settings"
    const {registrationTokensExpireInMs: expires, maxUsers} = setting
    const iat = Math.floor(Date.now() / 1000)
    if (expires === undefined || expires < HALF_AN_HOUR_IN_SEC) return res.status(400).json({ success: false, message: expiresErrorMsg })
    
    // Check app reached maximum number of users
    const users = await User.find()
    const maxUserMessage = "Registration failed: the application reached the maximum number of users"
    if (users.length >= maxUsers) return res.status(403).json({ success: false, message: maxUserMessage })

    // Generate user token object
    const userToken = {
        expires: iat + expires,
        fullName: req.body.fullName,
        userName: req.body.userName,
        email: req.body.email,
        password,
        isAdmin: false,
        active: false,
        verified: false,
    }

    // Generate token string and persist
    const tokenString = generateToken(userToken, false)
    const token = new Token({token: tokenString})
    await token.save()

    // Email configuration
    const emailContent = getEmailContent(tokenString)
    const from = "tibi.aki.tivadar@gmail.com";
    const to = userToken.email;
    const emailPassword = process.env.EMAIL_PASSWORD;
    const mailOptions = getMailOptions(from, to, emailContent)
    
    // Send confirmation email
    const transporter = getMailTransporter(from, emailPassword)
    try {
        await transporter.sendMail(mailOptions);
        return res.json({success: true, message: "Confirmation email sent"});
    } catch (err) {
        return res.status(500).json({ success: false, message: "Could not send verification email" });
    }
})

const getUrl = () => process.env.NODE_ENV === 'development'
    ? "localhost:5173"
    : "https://tschiboka.co.uk"


const getEmailContent = (token) => `
    <h1>Confirm Registration</h1>
    <p>Please confirm your registration on Tschiboka App by clicking on the link below:</p>
    <p><a href=${getUrl()}/#/api/email-verification/${token}>
        <strong>Verify registration</strong>
    </a></p>`


const getMailOptions = (from, to, content) => ({                                          // Email Specifications
    from: from,                                       
    to: [from, to],
    subject: 'Confirm Registration | TSCHIBOKA.CO.UK',
    html: content
});

const getMailTransporter = (from, emailPassword) => nodemailer.createTransport({
    auth: {
        user: from,
        pass: emailPassword
    },
    secure: true,
    port: 465,
    tls: { rejectUnauthorized: false },
    host: "smtp.gmail.com",
});

module.exports = router