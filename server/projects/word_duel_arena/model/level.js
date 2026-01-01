const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);

const LevelWordSchema = new mongoose.Schema({
    word: {
        type: String,
        required: true,
        trim: true,
    },
    frequency: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
}, { _id: false });

const levelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 8,
        trim: true,
    },
    allowedWords: {
        type: [LevelWordSchema],
        required: true,
    },
    words: {
        type: [String],
        required: true,
    },
    difficulty: {   
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    tags: {
        type: [String],
        default: [],
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

// Joi validation
function validateLevel(level) {
    const levelWordSchema = Joi.object({
        word: Joi.string().required(),
        frequency: Joi.number().min(1).max(100).required(),
    });

    const schema = Joi.object({
        name: Joi.string().required().min(4).max(16),
        words: Joi.array().items(Joi.string()).required(),
        allowedWords: Joi.array().items(levelWordSchema).required(),
        difficulty: Joi.number().min(1).max(10).required(),
        tags: Joi.array().items(Joi.string()),
    });

    return schema.validate(level);
}

exports.Level = Level;
exports.validateLevel = validateLevel;
