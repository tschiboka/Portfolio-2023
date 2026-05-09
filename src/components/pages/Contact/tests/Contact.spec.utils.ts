export const ContactLabels = {
    form: 'Contact form',
    fields: {
        name: 'Full name',
        email: 'Email',
        phone: 'Phone',
        message: 'Message',
    },
    buttons: {
        send: /Send Message/,
    },
    errors: { sendFailed: 'Failed to send message' },
} as const
