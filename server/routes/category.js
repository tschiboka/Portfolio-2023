const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router()
const { getUserToken } = require("../models/user")
const { Category, validateCategory } = require("../models/category")

router.post("/", [auth], async (req, res) => {
    const user = await getUserToken(req)
    if (!user) return res.status(404).json({success: false, message: "User not found"})
        
    const {error} = validateCategory(req.body)
    console.log(error)
    if (error) res.status(404).json(error)
    // const category = new Category(req)
    
    // return res.status(200).json({success:  false})
})

module.exports = router