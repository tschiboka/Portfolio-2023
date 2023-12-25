const express = require("express")
const route = express.Router()
const { validateSettings } = require("../models/setting")

route.post("/", async (req, res) => {
    const body = req.body

    const { error } = validateSettings(body)
    if (error) return res.status(400).json({
        success: false,
        message: error.message,
    })
})

module.exports = route