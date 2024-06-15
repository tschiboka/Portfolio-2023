const mongoose = require('mongoose');
const Joi = require("joi");

const Category = mongoose.model('Category', {
    name: { type: String, required: true, maxLength: 20 },
    description: { type: String, required: true },
    icon: String, 
    color: String
});

function validateCategory(category) {
    const schema = Joi.object({
        name: Joi.string().max(20).required(),
        description: Joi.string().max(255).required(),
        icon: Joi.string().required(),
        color: Joi.string()
    });

    return schema.validate(category);
}


module.exports.Category = Category;
module.exports.validateCategory = validateCategory;