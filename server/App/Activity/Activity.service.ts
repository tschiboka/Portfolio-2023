import type {
    ActivityEvent,
    ActivityFeedContext,
    GetActivityFeedQuery,
    GetActivityFeedResponse,
} from '../../../common/types'
import { Paging } from '@common-utils'
import type { Dictionary } from '@common-utils'
import { ActivityRepository } from './Activity.repository'
import { ActivityTransformers } from './Activity.transformers'
import { ActivityFeedLimits } from './Activity.constants'

/**
 * Business logic for the activity feed â€” aggregates the latest activity across visits, likes,
 * messages and error logs, then filters / sorts / paginates the merged feed.
 */
export const ActivityService = {
    feed: async (query: GetActivityFeedQuery): Promise<GetActivityFeedResponse> => {
        const { path, type, dateFrom, dateTo, sortBy, asc, pageNumber, pageSize } = query

        const {
            pageNumber: currentPage,
            limit,
            skip,
        } = Paging.parse(pageNumber, pageSize, {
            pageNumberMin: ActivityFeedLimits.pageNumber.min,
            pageSizeMin: ActivityFeedLimits.pageSize.min,
            pageSizeMax: ActivityFeedLimits.pageSize.max,
        })
        const dir = asc === 'true' ? 1 : -1

        const pathFilter: Dictionary = path ? { path: { $regex: path, $options: 'i' } } : {}

        // Build each collection's rows in parallel, only for the requested type(s).
        const queries: Promise<ActivityEvent[]>[] = []

        if (!type || type === 'visit') {
            queries.push(
                ActivityRepository.findVisits(pathFilter).then((docs) =>
                    docs.map(ActivityTransformers.visit),
                ),
            )
        }

        if (!type || type === 'like') {
            queries.push(
                ActivityRepository.findLikes(pathFilter).then((docs) =>
                    docs.map(ActivityTransformers.like),
                ),
            )
        }

        if (!type || type === 'message') {
            queries.push(
                ActivityRepository.findMessages(pathFilter).then((docs) =>
                    docs.map(ActivityTransformers.message),
                ),
            )
        }

        if (!type || type === 'error') {
            queries.push(
                ActivityRepository.findLogs(pathFilter).then((docs) =>
                    docs.map(ActivityTransformers.error),
                ),
            )
        }

        const results = await Promise.all(queries)
        let rows = results.flat()

        // Apply date-range filter (dateTo inclusive of the whole day).
        const fromMs = dateFrom ? new Date(dateFrom).getTime() : undefined
        const toMs = dateTo ? new Date(dateTo).getTime() + 86400000 : undefined
        if (fromMs || toMs) {
            rows = rows.filter((row) => {
                const time = new Date(row.datetime).getTime()
                if (fromMs && time < fromMs) return false
                if (toMs && time > toMs) return false
                return true
            })
        }

        // Sort by the requested field.
        const sortField = sortBy ?? 'datetime'
        rows.sort((a, b) => {
            let cmp = 0
            switch (sortField) {
                case 'datetime':
                    cmp = new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
                    break
                case 'path':
                    cmp = a.path.localeCompare(b.path)
                    break
                case 'type':
                    cmp = a.type.localeCompare(b.type)
                    break
            }
            return dir * cmp
        })

        const context: ActivityFeedContext = {
            visits: rows.filter((r) => r.type === 'visit').length,
            likes: rows.filter((r) => r.type === 'like').length,
            messages: rows.filter((r) => r.type === 'message').length,
            errors: rows.filter((r) => r.type === 'error').length,
        }

        const totalItems = rows.length
        const data = rows.slice(skip, skip + limit)

        return {
            data,
            meta: Paging.toMeta(totalItems, limit, currentPage),
            context,
        }
    },
}
