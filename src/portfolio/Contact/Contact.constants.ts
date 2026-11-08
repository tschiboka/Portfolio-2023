/** Everything the contact form alone fixes: its field limits, and the punctuation a message may carry. */
export const ContactConstants = {
    fieldLimits: {
        name: { max: 50 },
        email: { min: 6, max: 255 },
        phone: { min: 10, max: 16 },
        message: { min: 10, max: 1000 },
    },
    /** No second feature allows this punctuation set, so it stays out of the shared catalogue. */
    messagePattern: /^[a-zA-Z0-9,.!?()&£$*\\[\]:;@'"\-\s]*$/,
} as const
