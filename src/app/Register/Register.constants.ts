import { Regexp } from '@common-utils'

export const RegisterConstants = {
    fieldLimits: {
        fullName: { min: 5, max: 20 },
        userName: { min: 5, max: 20 },
        email: { min: 8, max: 255 },
        password: { min: 8, max: 40 },
    },
    passwordRules: [
        { pattern: Regexp.PasswordLowercase, subject: 'a lowercase character' },
        { pattern: Regexp.PasswordUppercase, subject: 'an uppercase character' },
        { pattern: Regexp.PasswordDigit, subject: 'a number' },
        { pattern: Regexp.PasswordSpecial, subject: 'a special character' },
    ],
} as const
