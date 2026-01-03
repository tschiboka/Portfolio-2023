const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);

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

// Joi validation
function validateLevel(level) {
    const schema = Joi.object({
        name: Joi.string().required().min(4).max(16),
        targetWords: Joi.array().items(Joi.string()).required(),
        difficulty: Joi.number().min(1).max(10).required(),
    });

    return schema.validate(level);
}

exports.Level = Level;
exports.validateLevel = validateLevel;
