import { useTableController } from '@common-ux'
import type { GetActivityFeedQuery } from '@common-types'
import { filters, type ActivityFiltersData } from './BreakdownTable.filters'
import { BreakdownTransformers } from './BreakdownTable.transformers'

export const useBreakdownTableController = () =>
    useTableController<ActivityFiltersData, GetActivityFeedQuery>({
        filters,
        sorting: { default: { column: 'datetime', direction: 'desc' } },
        urlPersistence: { namespace: 'breakdown' },
        toParams: BreakdownTransformers.Get,
    })
