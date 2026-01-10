const mongoose = require("mongoose");

const levelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 8,
        trim: true,
    },
    targetWords: {
        type: [String],
        required: true,
    },
    difficulty: {   
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Level = mongoose.model("WDA_Level", levelSchema);

module.exports = { Level };
