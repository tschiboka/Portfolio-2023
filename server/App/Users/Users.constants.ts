export const UsersConstants = {
    /** Length constraints for user fields — the single source of truth for schema + validation. */
    fieldLimits: {
        fullName: { min: 5, max: 20 },
        userName: { min: 5, max: 20 },
        email: { min: 8, max: 255 },
        password: { min: 8, max: 40 },
        capability: { min: 5, max: 20 },
    },
    /** bcrypt password-hashing config — the single source of truth for auth + validation. */
    password: {
        /** bcrypt cost factor. */
        saltRounds: 10,
        /** Max length of a stored bcrypt hash (bcrypt output is always 60 chars). */
        hashLength: 60,
    },
} as const
