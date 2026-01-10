const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);

function validateLevel(level) {
    const schema = Joi.object({
        name: Joi.string().required().min(4).max(16),
        targetWords: Joi.array().items(Joi.string()).required(),
        difficulty: Joi.number().min(1).max(10).required(),
    });

    return schema.validate(level);
}

module.exports = { validateLevel };
