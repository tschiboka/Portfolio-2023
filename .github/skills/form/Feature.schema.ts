// @ts-nocheck — skill example, outside the tsconfig include.
import { object, ref, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Regexp, ValidationMessage } from '@common-utils'
import { FeatureFieldLimits, NAME_PATTERN } from './Feature.constants'

const { name, userName, password } = FeatureFieldLimits

// The single home for validation rules. No markup, no submit logic.
// Every message comes from the validation catalogue — never a literal.
// Every pattern and bound comes from a constant — a shared pattern from `Regexp`, a
// feature's own rule from `Feature.constants.ts`.
// One builder per rule, so each reads as the rule it enforces.
export const featureSchema = object({
    name: string()
        .required(ValidationMessage.Required('name'))
        .min(name.min, ValidationMessage.Bound('name', name.min, 'characters', 'at least'))
        .max(name.max, ValidationMessage.Bound('name', name.max, 'characters', 'under'))
        .matches(NAME_PATTERN, ValidationMessage.Allowed('name', "letters, space, ' and -")),
    userName: string()
        .required(ValidationMessage.Required('user name'))
        .min(
            userName.min,
            ValidationMessage.Bound('user name', userName.min, 'characters', 'at least'),
        )
        .max(
            userName.max,
            ValidationMessage.Bound('user name', userName.max, 'characters', 'under'),
        )
        .matches(Regexp.Alphanumeric, ValidationMessage.Allowed('user name', 'alphanumerics')),
    email: string()
        .required(ValidationMessage.Required('email'))
        .email(ValidationMessage.Invalid('email address', 'a valid email address')),
    password: string()
        .required(ValidationMessage.Required('password'))
        .min(
            password.min,
            ValidationMessage.Bound('password', password.min, 'characters', 'at least'),
        )
        .max(password.max, ValidationMessage.Bound('password', password.max, 'characters', 'under'))
        .matches(
            Regexp.PasswordUppercase,
            ValidationMessage.Allowed('password', 'an uppercase character', 'contains'),
        ),
    passwordConfirmation: string()
        .required(ValidationMessage.Required('password confirmation'))
        .oneOf([ref('password')], ValidationMessage.Matches('password', 'confirmation')),
    category: string().required(ValidationMessage.Required('category')),
})

// Bound once here, so the component wires the schema without restating the resolver.
export const featureResolver = yupResolver(featureSchema)
