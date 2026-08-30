import { hasLength } from '@utils'
import { ApiMessage, ApiResponder } from '@utils'
import type { PostMessageRequest, PostMessageResponse } from '../../../common/types'
import { MessageRepository } from './Message.repository'
import { MessageSchema } from './Message.schema'
import { sendNotificationEmail } from './Message.utils'

/** Business logic for contact messages â€” persistence via the repository, validation via the schema. */
export const MessageService = {
    /** Validates and persists a contact message, then notifies the owner by email. */
    create: async (input: PostMessageRequest): Promise<PostMessageResponse> => {
        const { name, email, phone, message } = input
        const { error } = MessageSchema.validate(input)
        if (error) throw ApiResponder.badRequest(error)

        const entry = MessageRepository.create({
            name,
            email,
            phone: hasLength(phone) ? phone : undefined,
            message,
        })

        await MessageRepository.save(entry)
        await sendNotificationEmail({ name, email, phone, message })

        return { message: ApiMessage.sent('message') }
    },
}
