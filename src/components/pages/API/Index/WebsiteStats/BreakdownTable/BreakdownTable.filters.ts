import { text, select, date } from '@ux'
import type { ActivityType } from '@types'
import type { Dictionary } from '@utils'
import { FilterConfig } from '@ux/Table/TableFilterConfig'

export type ActivityFiltersData = {
    path?: string
    type?: ActivityType
    dateFrom?: string
    dateTo?: string
}

export const filters: Dictionary<FilterConfig> = {
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
