const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema({
    path: {               // Complete path apart from domain
        type: String,
        required: true,
        lowercase: true,
        maxLength: 100,
        trim: true,
    },
    likeDate: {         
        type: Date,
        default: Date.now,        
    },
});

function validateLike(like) {
    const schema = Joi.object({
        path: Joi.string().min(1).max(100).required()
    });

    return schema.validate(like);
}

const Like = mongoose.model("Like", schema);

exports.Like = Like;
exports.validateLike = validateLike;