import type { ActivityEvent } from '../../../common/types'
import { DateTime } from '@utils'
import type { IVisit } from '../Visit/Visit.types'
import type { ILike } from '../Like/Like.types'
import type { IMessage } from '../Message/Message.types'
import type { ILog } from '../Log/Log.types'

/** Maps a raw visit doc to an {@link ActivityEvent}. */
const visit = (doc: IVisit): ActivityEvent => ({
    id: String(doc._id),
    datetime: DateTime.Format.toIso(doc.visitDate),
    path: doc.path,
    type: 'visit',
})

/** Maps a raw like doc to an {@link ActivityEvent}. */
const like = (doc: ILike): ActivityEvent => ({
    id: String(doc._id),
    datetime: DateTime.Format.toIso(doc.likeDate),
    path: doc.path,
    type: 'like',
})

/** Maps a raw message doc to an {@link ActivityEvent} with its detail payload. */
const message = (doc: IMessage): ActivityEvent => ({
    id: String(doc._id),
    datetime: DateTime.Format.toIso(doc.date),
    path: `message/${String(doc._id)}`,
    type: 'message',
    details: JSON.stringify({
        name: doc.name,
        email: doc.email,
        phone: doc.phone ?? null,
        message: doc.message,
        isRead: doc.isRead,
    }),
})

/** Maps a raw error-log doc to an {@link ActivityEvent} with its detail payload. */
const error = (doc: ILog): ActivityEvent => ({
    id: String(doc._id),
    datetime: DateTime.Format.toIso(doc.timestamp),
    path: `error/${doc.name ?? 'unknown'}`,
    type: 'error',
    details: JSON.stringify({
        name: doc.name,
        message: doc.message,
        stack: doc.stack,
    }),
})

/** Maps each activity collection's raw docs to feed rows â€” one per activity type. */
export const ActivityTransformers = {
    visit,
    like,
    message,
    error,
}
