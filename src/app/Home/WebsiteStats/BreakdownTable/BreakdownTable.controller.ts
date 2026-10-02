import { useTableController } from '@common-ux'
import type { GetActivityFeedQuery } from '@common-types'
import { BreakdownTableFilters } from './BreakdownTable.filters'
import { BreakdownTransformers } from './BreakdownTable.transformers'
import type { ActivityFiltersData } from './BreakdownTable.types'

export const useBreakdownTableController = () =>
    useTableController<ActivityFiltersData, GetActivityFeedQuery>({
        filters: BreakdownTableFilters,
        sorting: { default: { column: 'datetime', direction: 'desc' } },
        urlPersistence: { namespace: 'breakdown' },
        toParams: BreakdownTransformers.Get,
    })
