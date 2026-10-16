import type { ActivityFeedSortBy, GetActivityFeedQuery } from '@common-types'
import type { ActivityFiltersData } from './BreakdownTable.types'
import { ClientTransformers } from '@common-utils'
import type { TableState } from '@common-ux/Table/Table.hooks.types'

type BreakdownParamsInput = TableState<ActivityFiltersData>

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
