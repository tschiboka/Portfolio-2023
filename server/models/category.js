const mongoose = require('mongoose');
const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi)

const Category = mongoose.model('Category', {
    name: { type: String, required: true, maxLength: 20 },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    description: { type: String, required: true, minLength: 10, maxLength: 255 },
    icon: String, 
    color: String,
    status: { type: String, default: "active"},
    created_at: {
        type: Date,
        default: Date.now()
    },
    isParent: { type: Boolean, required: true },
    parentId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "Category" } 
});

function validateCategory(category) {
    const schema = Joi.object({
        name: Joi.string().max(20).required(),
        description: Joi.string().min(10).max(255).required(),
        icon: Joi.string().required(),
        color: Joi.string(),
        status: Joi.string().valid("active", "inactive", "deleted"),
        isParent: Joi.boolean().required(),
        parentId: Joi.objectId().optional(),
    });

    return schema.validate(category);
}


module.exports.Category = Category;
module.exports.validateCategory = validateCategory;