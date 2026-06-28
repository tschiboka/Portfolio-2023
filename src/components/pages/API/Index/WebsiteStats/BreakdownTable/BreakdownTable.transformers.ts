import type { ActivityFeedSortBy, GetActivityFeedQuery } from '@common/types'
import type {
    TableSortState,
    TablePaginationState,
} from '@common/ux/Table/useTableController/useTableController.types'
import type { ActivityFiltersData } from './BreakdownTable.filters'
import { BaseTransformer } from '@common/utils/Transformer'

type BreakdownParamsInput = {
    filters: ActivityFiltersData
    sorting: TableSortState
    pagination: TablePaginationState
}

class BreakdownParamsTransformer extends BaseTransformer<
    BreakdownParamsInput,
    GetActivityFeedQuery
> {
    override Get(state: BreakdownParamsInput): GetActivityFeedQuery {
        return {
            path: state.filters.path,
            type: state.filters.type,
            dateFrom: state.filters.dateFrom,
            dateTo: state.filters.dateTo,
            sortBy: state.sorting.column as ActivityFeedSortBy,
            asc: state.sorting.direction === 'asc' ? 'true' : undefined,
            page: String(state.pagination.page),
            pageSize: String(state.pagination.pageSize),
        }
    }
}

export const breakdownParamsTransformer = new BreakdownParamsTransformer()
