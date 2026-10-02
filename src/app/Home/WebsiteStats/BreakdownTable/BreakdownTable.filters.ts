import { text, select, date } from '@common-ux'
import type { FilterConfig } from '@common-ux/Table/TableFilterConfig'
import type { Dictionary } from '@common-utils'

export const BreakdownTableFilters: Dictionary<FilterConfig> = {
    path: text({ label: 'Path', placeholder: 'Filter by path...' }),
    type: select({
        label: 'Type',
        options: [
            { label: 'Visit', value: 'visit' },
            { label: 'Like', value: 'like' },
            { label: 'Message', value: 'message' },
            { label: 'Error', value: 'error' },
        ],
    }),
    dateFrom: date({ label: 'From' }),
    dateTo: date({ label: 'To' }),
}
