import { TableHooks } from '@common-ux'
import type { GetActivityFeedQuery } from '@common-types'
import { BreakdownTableFilters } from './BreakdownTable.filters'
import { BreakdownTableTransformers } from './BreakdownTable.transformers'
import type { ActivityFiltersData } from './BreakdownTable.types'

const useTable = () =>
    TableHooks.useTableController<ActivityFiltersData, GetActivityFeedQuery>({
        filters: BreakdownTableFilters,
        sorting: { default: { column: 'datetime', direction: 'desc' } },
        urlPersistence: { namespace: 'breakdown' },
        toParams: BreakdownTableTransformers.Get,
    })

export const BreakdownTableController = { useTable }
