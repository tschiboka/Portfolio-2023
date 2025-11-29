const express = require('express')
const router = express.Router()
const { User } = require('../models/user')
const { Settings } = require("../models/setting")
const auth = require("../middlewares/auth");

router.get("/", [auth], async (req, res) => {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password')
    
    if (!user) return res.status(404).json({ success: false, message: "User not found" })
    
    const settings = await Settings.findOne()
    res.status(200).json({ success: true, 
        data: { 
            user: {
                id: user._id,
                ...user.toObject()
            }, settings }
    })
})

module.exports = router;
