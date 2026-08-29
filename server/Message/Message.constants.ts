/** Length/constraints for message fields — single source of truth for schema + validation. */
export const MessageFieldLimits = {
    name: { min: 1, max: 50 },
    email: { min: 6, max: 255 },
    phone: { min: 10, max: 16 },
    message: { min: 10, max: 1000 },
} as const
