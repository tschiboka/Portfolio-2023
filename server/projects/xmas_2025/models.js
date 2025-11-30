const Joi = require("joi");
const mongoose = require("mongoose");
Joi.objectId = require('joi-objectid')(Joi)

const xmasMessageSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 16,
        trim: true,
    },
    message: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 50,
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
        name: Joi.string().required().min(4).max(16),
        message: Joi.string().required().min(1).max(50),
        userId: Joi.string().required(),
    });

    return schema.validate(message);
}

const XmasCandleSchema = mongoose.Schema({
    candle1: { type: Boolean, default: false },
    candle2: { type: Boolean, default: false },
    candle3: { type: Boolean, default: false },
    candle4: { type: Boolean, default: false },
})
const XmasCandle = new mongoose.model("XmasCandle", XmasCandleSchema)

function validateCandle(candle) {
    const schema = Joi.object({
        candle1: Joi.boolean().required(),
        candle2: Joi.boolean().required(),
        candle3: Joi.boolean().required(),
        candle4: Joi.boolean().required(),
    });

    return schema.validate(candle);
}

exports.XmasCandle = XmasCandle;
exports.validateMessage = validateMessage;
exports.XmasMessage = XmasMessage;
exports.validateCandle = validateCandle;