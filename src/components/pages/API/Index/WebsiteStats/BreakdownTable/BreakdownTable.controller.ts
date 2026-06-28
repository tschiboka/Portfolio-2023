import { useTableController } from '@common/ux'
import type { GetActivityFeedQuery } from '@common/types'
import { filters, type ActivityFiltersData } from './BreakdownTable.filters'
import { breakdownParamsTransformer } from './BreakdownTable.transformers'

export const useBreakdownTableController = () =>
    useTableController<ActivityFiltersData, GetActivityFeedQuery>({
        filters,
        sorting: { default: { column: 'datetime', direction: 'desc' } },
        toParams: breakdownParamsTransformer.Get,
    })
