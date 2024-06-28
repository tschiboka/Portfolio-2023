const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router()
const { getUserToken } = require("../models/user")
const { Category, validateCategory } = require("../models/category")

router.get("/", [auth], async (req, res) => {
    const user = await getUserToken(req)
    if (!user) return res.status(404).json({ error: { message: "User not found" }})

    // Find user categories
    const categories = await Category.find({ userId: user._id }).select('-_id, -__v')
    res.status(200).json({data: categories})
})

router.post("/", [auth], async (req, res) => {
    const user = await getUserToken(req)
    if (!user) return res.status(404).json({ error: { message: "User not found" }})
    
    // Find if category exists for user
    const categoryWithUser = await Category.find({ userId: user._id, name: req.body.name })
    if (categoryWithUser.length) return res.status(409).json({error: { message: "Category exists for user" }})
        
    // Validate category
    const {error} = validateCategory({ ...req.body })
    if (error) return res.status(400).json({ error: { message: error.details[0].message }})

    // Create category
    const category = new Category({ ...req.body, userId: user._id })
    await category.save()
    return res.status(201).send()
})

module.exports = router