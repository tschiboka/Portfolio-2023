import type { Dictionary } from '@utils'
import { VisitModel } from '../Visit/Visit.model'
import { LikeModel } from '../Like/Like.model'
import { MessageModel } from '../Message/Message.model'
import { LogModel } from '../Log/Log.model'

/** Data-access layer for the activity feed â€” reads across the visit/like/message/log collections. */
export const ActivityRepository = {
    findVisits: (filter: Dictionary) => VisitModel.find(filter).lean(),
    findLikes: (filter: Dictionary) => LikeModel.find(filter).lean(),
    findMessages: (filter: Dictionary) => MessageModel.find(filter).lean(),
    findLogs: (filter: Dictionary) => LogModel.find(filter).lean(),
}
