/** Everything the contact form alone fixes: its field limits. */
export const ContactConstants = {
    fieldLimits: {
        name: { max: 50 },
        email: { min: 6, max: 255 },
        phone: { min: 10, max: 16 },
        message: { min: 10, max: 1000 },
    },
} as const
