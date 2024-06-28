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
    description: { type: String, required: true },
    icon: String, 
    color: String,
    created_at: {
        type: Date,
        default: Date.now()
    },
    isParent: { type: Boolean, required: true },
    // parent: { type: String, maxLength: 20 } // TODO: Make it an objectID 
});

function validateCategory(category) {
    const schema = Joi.object({
        name: Joi.string().max(20).required(),
        description: Joi.string().max(255).required(),
        icon: Joi.string().required(),
        color: Joi.string(),
        isParent: Joi.boolean().required(),
        // parent: Joi.string().max(20).optional(),
    });

    return schema.validate(category);
}


module.exports.Category = Category;
module.exports.validateCategory = validateCategory;