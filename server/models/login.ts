import Joi from 'joi'

interface LoginInput {
    email: string
    password: string
}

function validateLogin(loginDetails: LoginInput) {
    const schema = Joi.object({
        email: Joi.string()
            .required()
            .email({ tlds: { allow: false } }),
        password: Joi.string().required(),
    })

    return schema.validate(loginDetails)
}

export { validateLogin }
