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
    visitDate: {         
        type: Date,
        default: Date.now,        
    },
});

function validateVisit(visit) {
    const schema = Joi.object({
        path: Joi.string().min(1).max(100).required()
    });

    return schema.validate(visit);
}

const Visit = mongoose.model("Visit", schema);

exports.Visit = Visit;
exports.validateVisit = validateVisit;