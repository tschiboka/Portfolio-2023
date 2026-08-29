/** Length constraints for user fields — the single source of truth for schema + validation. */
export const UserFieldLimits = {
    fullName: { min: 5, max: 20 },
    userName: { min: 5, max: 20 },
    email: { min: 8, max: 255 },
    password: { min: 8, max: 40 },
    capability: { min: 5, max: 20 },
} as const

/** bcrypt password-hashing config — the single source of truth for auth + validation. */
export const UserPassword = {
    /** bcrypt cost factor. */
    saltRounds: 10,
    /** Max length of a stored bcrypt password hash (bcrypt output is always 60 chars). */
    hashLength: 60,
} as const
