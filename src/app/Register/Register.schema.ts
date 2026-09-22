import * as yup from 'yup'
import { ValidationMessage } from '@common-utils'
import { FULL_NAME_PATTERN, PASSWORD_RULES, RegisterFieldLimits } from './Register.constants'
import { RegistrationFormData } from './Register.types'

const { fullName, userName, email, password } = RegisterFieldLimits

export const registrationSchema: yup.ObjectSchema<RegistrationFormData> = yup.object({
    fullName: yup
        .string()
        .required(ValidationMessage.Required('full name'))
        .min(
            fullName.min,
            ValidationMessage.Bound('full name', fullName.min, 'characters', 'at least'),
        )
        .max(
            fullName.max,
            ValidationMessage.Bound('full name', fullName.max, 'characters', 'under'),
        )
        .matches(
            FULL_NAME_PATTERN,
            ValidationMessage.Allowed('full name', "letters, space, ' and -"),
        ),
    userName: yup
        .string()
        .required(ValidationMessage.Required('user name'))
        .min(
            userName.min,
            ValidationMessage.Bound('user name', userName.min, 'characters', 'at least'),
        )
        .max(
            userName.max,
            ValidationMessage.Bound('user name', userName.max, 'characters', 'under'),
        ),
    email: yup
        .string()
        .required(ValidationMessage.Required('email'))
        .min(email.min, ValidationMessage.Bound('email', email.min, 'characters', 'at least'))
        .max(email.max, ValidationMessage.Bound('email', email.max, 'characters', 'under')),
    password: PASSWORD_RULES.reduce(
        (schema, { pattern, subject }) =>
            schema.matches(pattern, ValidationMessage.Allowed('password', subject, 'contains')),
        yup
            .string()
            .required(ValidationMessage.Required('password'))
            .min(
                password.min,
                ValidationMessage.Bound('password', password.min, 'characters', 'at least'),
            )
            .max(
                password.max,
                ValidationMessage.Bound('password', password.max, 'characters', 'under'),
            ),
    ),
    passwordConfirmation: yup
        .string()
        .required(ValidationMessage.Required('password confirmation'))
        .oneOf([yup.ref('password')], ValidationMessage.Matches('password', 'confirmation')),
})
