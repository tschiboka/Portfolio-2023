import { ClientTransformers, Regexp } from '@common-utils'
import type { PostMessageRequest } from '@common-types'
import type { ContactFormData } from './Contact.types'

/** Maps the contact form's fields onto the API's message payload. */
const Post = (data: ContactFormData): PostMessageRequest => ({
    name: data.name,
    email: data.email.toLowerCase(),
    phone: data.phone.replace(Regexp.NonDigit, '') || undefined,
    message: data.message,
})

export const ContactTransformers = ClientTransformers<ContactFormData, PostMessageRequest>({ Post })
