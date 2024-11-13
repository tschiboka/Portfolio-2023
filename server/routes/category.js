const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router()
const mongoose = require("mongoose")
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
    const categoryWithUser = await Category.find({ 
        userId: user._id, 
        name: { $regex: new RegExp(`^${req.body.name}$`, 'i') } 
    })
    if (categoryWithUser.length) return res.status(409).json({ error: { message: "Category exists for user" } })
        
    // Find if parent category exists with user
    const {parentId} = req.body
    if (parentId) {
        const isValidId = mongoose.Types.ObjectId.isValid(new mongoose.Types.ObjectId(parentId));
        if (!isValidId) return res.status(400).json({ error: { message: "Invalid parent id: " + parentId }}) 
            
        const parent = await Category.findOne({_id: parentId, userId: user._id})
        if (!parent) return res.status(404).json({ error: { message: "Parent don't exist" } })

        if (!parent.isParent) return res
            .status(400)
            .json({ error: { message: "Parent settings are disabled on category: " + parent.name} })
    }

    // Validate category
    const {error} = validateCategory({ ...req.body })
    if (error) return res.status(400).json({ error: { message: error.details[0].message }})

    // Create category
    const category = new Category({ ...req.body, userId: user._id })
    await category.save()
    return res.status(201).send()
})

module.exports = router