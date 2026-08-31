import type { ActivityFeedSortBy, GetActivityFeedQuery } from '@common-types'
import type { ActivityFiltersData } from './BreakdownTable.filters'
import { BaseTransformer } from '@common-utils'
import { TableState } from '@common-ux/Table/useTableController'

type BreakdownParamsInput = TableState<ActivityFiltersData>

class BreakdownParamsTransformer extends BaseTransformer<
    BreakdownParamsInput,
    GetActivityFeedQuery
> {
    override Get(this: void, state: BreakdownParamsInput): GetActivityFeedQuery {
        return {
            path: state.filters.path,
            type: state.filters.type,
            dateFrom: state.filters.dateFrom,
            dateTo: state.filters.dateTo,
            sortBy: state.sorting.column as ActivityFeedSortBy,
            asc: state.sorting.direction === 'asc' ? 'true' : undefined,
            pageNumber: String(state.pagination.pageNumber),
            pageSize: String(state.pagination.pageSize),
        }
    }
}

export const breakdownParamsTransformer = new BreakdownParamsTransformer()
