import { useTableController } from '@ux'
import type { GetActivityFeedQuery } from '@types'
import { filters, type ActivityFiltersData } from './BreakdownTable.filters'
import { breakdownParamsTransformer } from './BreakdownTable.transformers'

export const useBreakdownTableController = () =>
    useTableController<ActivityFiltersData, GetActivityFeedQuery>({
        filters,
        sorting: { default: { column: 'datetime', direction: 'desc' } },
        urlPersistence: { namespace: 'breakdown' },
        toParams: breakdownParamsTransformer.Get,
    })
