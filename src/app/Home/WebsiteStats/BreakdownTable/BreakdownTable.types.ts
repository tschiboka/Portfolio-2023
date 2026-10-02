import type {
    ActivityEvent,
    ActivityMessageDetails,
    ActivityErrorDetails,
    ActivityType,
} from '@common-types'

export type BreakdownRow = ActivityEvent
export type { ActivityMessageDetails, ActivityErrorDetails }

export type ActivityFiltersData = {
    path?: string
    type?: ActivityType
    dateFrom?: string
    dateTo?: string
}
