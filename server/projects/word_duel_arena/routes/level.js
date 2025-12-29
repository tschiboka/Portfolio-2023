const express = require("express");
const router = express.Router();
const { Level, validateLevel } = require("../model/level");
const auth = require("../../../middlewares/auth");

router.get("/name", [], async (_, res) => {
    const levels = await Level.find().sort({ createdAt: -1 });
    const levelNames = levels.map((level) => level.name);
    res.status(200).json({ levelNames });
});

router.get("/:name", [], async (req, res) => {
    const { name } = req.params;
    const level = await Level.findOne({ name });
    if (!level) {
        return res.status(404).json({ error: "Level not found" });
    }
    res.status(200).json(level);
})

router.post("/", [auth], async (req, res) => {
    const level = req.body;

    const { error } = validateLevel(level);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const updatedLevel = await Level.findOneAndUpdate(
        { name: level.name },       
        { ...level, updatedAt: Date.now() }, 
        { new: true, upsert: true, runValidators: true } 
    )

    res.status(200).json({ data: { message: "OK", level: updatedLevel } });
    }
);

module.exports = router;
