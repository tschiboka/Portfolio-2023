/* eslint-disable standards/matching-spec -- TODO [0011] check the convention */
import { ClientTransformers } from '@common-utils'
import type { ActivityFeedSortBy, GetActivityFeedQuery } from '@common-types'
import type { BreakdownParamsInput } from './BreakdownTable.types'

const Get = (state: BreakdownParamsInput): GetActivityFeedQuery => ({
    path: state.filters.path,
    type: state.filters.type,
    dateFrom: state.filters.dateFrom,
    dateTo: state.filters.dateTo,
    sortBy: state.sorting.column as ActivityFeedSortBy,
    asc: state.sorting.direction === 'asc' ? 'true' : undefined,
    pageNumber: String(state.pagination.pageNumber),
    pageSize: String(state.pagination.pageSize),
})

export const BreakdownTableTransformers = ClientTransformers<
    BreakdownParamsInput,
    GetActivityFeedQuery
>({
    Get,
})
