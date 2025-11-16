const express = require("express")
const router = express.Router()
const { validateLogin } = require("../models/login")
const { User } = require('../models/user')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


router.post("/", async (req, res) => {
    const { error } = validateLogin(req.body)
    if (error) return res.status(400).json({ success: false, message: error.details[0].message, error })

    const user = await User.findOne({ email: req.body.email }) // TO-DO: Log failed login attempts
    if (!user) return res.status(400).json({ success: false, message: "Incorrect email or password" })
    
    const auth = await bcrypt.compare(req.body.password, user.password)
    if (!auth) res.status(400).json({ success: false, message: "Incorrect email or password" })
    
    if (!process.env.JWT_PRIVATE_KEY) res.status(404).json({ success: false, message: "JWT private key is not defined" })
    const { _id, isAdmin } = user;

    user.password = undefined

    const token = jwt.sign({ id: _id, isAdmin }, process.env.JWT_PRIVATE_KEY)
    res.status(200).header("x-auth-token", token).json({ success: true, token, user: {id: _id, ...user.toObject()} })
})

module.exports = router