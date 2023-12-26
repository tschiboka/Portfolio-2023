const mongoose = require("mongoose");
const Joi = require("joi");

const schema = mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
        minLength: 3,
        maxLength: 20,
        trim: true,
    },
    email: {
        type: String,
        unique: true,   
        required: true,
        minLength: 8,
        maxlength: 255,
        trim: true,
        lowercase: true,
    },
    passwordHash: {
        type: String,   
        required: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
        trim: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date,
    },
})

const User = new mongoose.model("User", schema)

const validateUser = (user) => {
    const schema = Joi.object({
        userName: Joi.string().required().min(3).max(20),
        email: Joi.string().required().email({ tlds: { allow: false } }),
        passwordHash: Joi.string().required(),
        fullName: Joi.string().required().min(3).max(50),
        isAdmin: Joi.boolean(),
        created: Joi.date(),
        updated: Joi.date(),
        lastLogin: Joi.date().optional(),
    })
    return schema.validate(user)
}

exports.User = User,
exports.validateUser = validateUser