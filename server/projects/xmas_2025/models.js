const Joi = require("joi");
const mongoose = require("mongoose");
Joi.objectId = require('joi-objectid')(Joi)

const xmasMessageSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 20,
        trim: true,
    },
    message: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 40,
        trim: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
}, { timestamps: true });

const XmasMessage = new mongoose.model("XmasMessage", xmasMessageSchema)

function validateMessage(message) {
    const schema = Joi.object({
        name: Joi.string().required().min(4).max(20),
        message: Joi.string().required().min(1).max(40),
        userId: Joi.string().required(),
    });

    return schema.validate(message);
}

exports.validateMessage = validateMessage;
exports.XmasMessage = XmasMessage;