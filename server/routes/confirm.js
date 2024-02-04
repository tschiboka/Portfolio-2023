const express = require("express")
const router = express.Router()
const { Token } = require("../models/token")
const jwt = require("jsonwebtoken")

router.get("/:verificationToken", async (req, res) => {
    // Extract token
    const {verificationToken} = req.params
    const token = await Token.findOne({token: verificationToken})
    if (!token) return res.status(301).redirect(`https://tschiboka.co.uk/confirm/email.html?error=no-token&success=false`);
    console.log(token)
    const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY
    if (!JWT_PRIVATE_KEY) throw Error("Fatal error: JWT Private key is not defined!")
    const decoded = jwt.verify(token.token, JWT_PRIVATE_KEY);
    console.log(decoded)

    
    res.send(token)
})

module.exports = router