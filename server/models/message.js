const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema({
    name: {                                                    // FIRSTNAME: STRING REQUIRED, MIN: 1, MAX: 50
        type: String,   
        required: true,
        maxlength: 50,
        minlength: 1,
        trim: true,
    },
    email: {                                                    // FIRSTNAME: STRING REQUIRED, MIN: 1, MAX: 50
        type: String,   
        required: true,
        maxlength: 255,
        trim: true,
        lowercase: true,
    },
    phone: {                                                    // FIRSTNAME: STRING REQUIRED, MIN: 1, MAX: 50
        type: String,   
        maxlength: 16,
        minlength: 10,
        trim: true,
    },
    message: {
        type: String, 
        required: true, 
        trim: true,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    isRead: {
        type: Boolean,
        default: false,
    }
});

function validateMessage(message) {
    const schema = Joi.object({
        name: Joi.string().max(50).required(),
        email: Joi.string().required().email({ tlds: { allow: false } }),
        phone: Joi.string().regex(/^\d+$/).max(16).allow(""),
        message: Joi.string().required(),
        isRead: Joi.boolean(),
        date: Joi.date(),
    });
    return schema.validate(message);
}

const Message = mongoose.model("Message", schema);
exports.Message = Message;
exports.validateMessage = validateMessage;
