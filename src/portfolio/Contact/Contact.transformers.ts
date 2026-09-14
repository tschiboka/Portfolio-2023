import type { PostMessageRequest } from '@common-types'
import type { ContactFormData } from './Contact.types'

/** Maps the contact form's fields onto the API's message payload. */
export const contactTransformer = {
    toApi: (data: ContactFormData): PostMessageRequest => ({
        name: data.name,
        email: data.email.toLowerCase(),
        phone: data.phone.replace(/\D/g, '') || undefined,
        message: data.message,
    }),
}
