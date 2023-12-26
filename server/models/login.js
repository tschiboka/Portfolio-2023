const Joi = require("joi");

function validateLogin(loginDetails) {
    const schema = Joi.object({
        email: Joi.string().required().email({ tlds: { allow: false } }),
        password: Joi.string().required(),
    });

    return schema.validate(loginDetails);
}

exports.validateLogin = validateLogin;