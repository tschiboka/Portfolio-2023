import type {
    ActivityEvent,
    ActivityMessageDetails,
    ActivityErrorDetails,
    ActivityType,
} from '@common-types'
import type { TableState } from '@common-ux/Table/Table.hooks.types'

export type BreakdownRow = ActivityEvent
export type { ActivityMessageDetails, ActivityErrorDetails }

export type BreakdownParamsInput = TableState<ActivityFiltersData>

export type ActivityFiltersData = {
    path?: string
    type?: ActivityType
    dateFrom?: string
    dateTo?: string
}
