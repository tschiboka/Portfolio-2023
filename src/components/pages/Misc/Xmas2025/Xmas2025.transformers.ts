import { PostXmasMessageRequest, User } from '@common/types'
import { XmasFormData } from './Xmas2025.types'

export const xmasTransformer = {
    toApi: (data: XmasFormData, user: User): PostXmasMessageRequest => ({
        name: data.name,
        message: data.message,
        userId: user.id!,
    }),
}
