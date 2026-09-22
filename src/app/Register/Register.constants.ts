import { Regexp } from '@common-utils'

/** Length constraints for registration fields — single source of truth for schema + form. */
export const RegisterFieldLimits = {
    fullName: { min: 5, max: 20 },
    userName: { min: 5, max: 20 },
    email: { min: 8, max: 255 },
    password: { min: 8, max: 40 },
} as const

/** A rule registration alone has. Any pattern a second feature could need belongs in `Regexp`. */
export const FULL_NAME_PATTERN = /^[a-z '-]+$/i

/** The password character rules, in the order they are reported. */
export const PASSWORD_RULES = [
    { pattern: Regexp.PasswordLowercase, subject: 'a lowercase character' },
    { pattern: Regexp.PasswordUppercase, subject: 'an uppercase character' },
    { pattern: Regexp.PasswordDigit, subject: 'a number' },
    { pattern: Regexp.PasswordSpecial, subject: 'a special character' },
] as const
