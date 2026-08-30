import { PostXmasMessageRequest, User } from '@types'
import { XmasFormData } from './Xmas2025.types'

export const xmasTransformer = {
    toApi: (data: XmasFormData, user: User): PostXmasMessageRequest => ({
        name: data.name,
        message: data.message,
        userId: user.id!,
    }),
}
