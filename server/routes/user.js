const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const { User, validateUser } = require('../models/user')

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

    const user = await new User(req.body)
    await user.save()
    res.status(200).json({ success: true, user })
})

module.exports = router