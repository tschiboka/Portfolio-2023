const mongoose = require("mongoose");
const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)
const jwt = require("jsonwebtoken")

const schema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 20,
        trim: true,
    },
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
        maxLength: 255,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String, 
        minLength: 8,
        maxLength: 255,
        required: true,
        trim: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    capabilities: {
        type: Array,
        default: []
    },
    avatarId: {
        type: mongoose.Schema.Types.ObjectId,
        default: undefined,
    },
    // Verified true after email verification
    verified: { 
        type: Boolean,
        default: false,
    },
    // Active true after first login and set to false if user deletes profile
    active: {
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
        fullName: Joi.string().required().min(3).max(50),
        userName: Joi.string().required().min(3).max(20),
        email: Joi.string().required().email({ tlds: { allow: false } }),
        password: Joi.string().min(8).required(40),
        isAdmin: Joi.boolean(),
        capabilities: Joi.array().items(Joi.string().min(5).max(20)),
        avatarId: Joi.objectId(),
        created: Joi.date(),
        updated: Joi.date(),
        lastLogin: Joi.date().optional(),
    })
    return schema.validate(user)
}

const generateToken = (userToken) => {
    const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY
    if (!JWT_PRIVATE_KEY) throw Error("Fatal error: JWT Private key is not defined!")

    return jwt.sign(userToken, JWT_PRIVATE_KEY)
}

const getUserToken = async (req) => {
    const userToken = req.headers['x-auth-token'];
    const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY
    if (!JWT_PRIVATE_KEY) throw Error("Fatal error: JWT Private key is not defined!")
    
    const token = jwt.decode(userToken, JWT_PRIVATE_KEY)
    return await User.findById(token.id)
}

exports.User = User,
exports.validateUser = validateUser
exports.generateToken = generateToken
exports.getUserToken = getUserToken