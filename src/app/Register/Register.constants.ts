import { Regexp } from '@common-utils'

/** Everything registration alone fixes: field limits, name pattern and the password rules. */
export const RegisterConstants = {
    fieldLimits: {
        fullName: { min: 5, max: 20 },
        userName: { min: 5, max: 20 },
        email: { min: 8, max: 255 },
        password: { min: 8, max: 40 },
    },
    /** A rule registration alone has. Any pattern a second feature could need belongs in `Regexp`. */
    fullNamePattern: /^[a-z '-]+$/i,
    /** The password character rules, in the order they are reported. */
    passwordRules: [
        { pattern: Regexp.PasswordLowercase, subject: 'a lowercase character' },
        { pattern: Regexp.PasswordUppercase, subject: 'an uppercase character' },
        { pattern: Regexp.PasswordDigit, subject: 'a number' },
        { pattern: Regexp.PasswordSpecial, subject: 'a special character' },
    ],
} as const
