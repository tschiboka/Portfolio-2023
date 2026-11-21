import { VisitModel } from '../Visit'
import { LikeModel } from '../Like'
import { MessageModel } from '../Message'
import { LogModel } from '../Log'
import type { Dictionary } from '@common-utils'

/** Data-access layer for the activity feed - reads across the visit/like/message/log collections. */
export const ActivityRepository = {
    findVisits: (filter: Dictionary) => VisitModel.find(filter).lean(),
    findLikes: (filter: Dictionary) => LikeModel.find(filter).lean(),
    findMessages: (filter: Dictionary) => MessageModel.find(filter).lean(),
    findLogs: (filter: Dictionary) => LogModel.find(filter).lean(),
}
