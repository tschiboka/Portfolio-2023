import { ClientTransformers, DateTime } from '@common-utils'
import moment from 'moment'
import type { PostXmasMessageRequest, User, XmasMessage } from '@common-types'
import type { XmasFormData, XmasMessageRow } from './Xmas2025.types'

const Post = (data: XmasFormData, user?: User): PostXmasMessageRequest => ({
    name: data.name,
    message: data.message,
    userId: user!.id!,
})

const toMessageRow = ({ createdAt, ...rest }: XmasMessage): XmasMessageRow => ({
    ...rest,
    date: moment(createdAt).format(DateTime.Formats.DisplayDateTime),
})

export const XmasTransformers = ClientTransformers<XmasFormData, PostXmasMessageRequest, User>({
    Post,
})

export const MessageTransformers = { toMessageRow }
