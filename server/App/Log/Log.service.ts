import type {
    GetLogQuery,
    GetLogTableResponse,
    GetLogResponse,
    DeleteLogResponse,
    Log,
} from '../../../common/types'
import { ApiTransformers } from '@utils'
import { Paging } from '@utils'
import { LogRepository } from './Log.repository'

/** Business logic for logs â€” persistence via the repository. */
export const LogService = {
    /** Returns the full log table for the admin UI. */
    table: async (): Promise<GetLogTableResponse> => {
        const logs = await LogRepository.find()
        return { table: logs.map(ApiTransformers.toApiResource<Log>) }
    },

    /** Returns a paginated, sorted and projected page of logs. */
    paged: async (query: GetLogQuery): Promise<GetLogResponse> => {
        const { sortBy, select } = query
        const desc = query.desc === 'true'
        const sortString = `${desc ? '-' : ''}${sortBy === 'timestamp' ? '_id' : sortBy}`

        const { pageNumber: _, limit, skip } = Paging.parse(query.page, query.limit)

        const logs = await LogRepository.findPaged(sortString, skip, limit, select)
        const total = await LogRepository.count()

        return { log: logs.map(ApiTransformers.toApiResource<Log>), total }
    },

    /** Deletes a batch of logs by ids. */
    remove: async (ids: string[]): Promise<DeleteLogResponse> => {
        const result = await LogRepository.deleteManyByIds(ids)
        return { acknowledged: result.acknowledged, deletedCount: result.deletedCount }
    },
}
