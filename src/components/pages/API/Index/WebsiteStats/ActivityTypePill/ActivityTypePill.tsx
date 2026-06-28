import { Pill, Inline } from '@common/ux'
import type { PillColor } from '@common/ux/Pill/Pill'
import type { ActivityType, ActivityFeedContext } from '@common/types'
import './ActivityTypePill.scss'

const TYPE_COLORS: Record<ActivityType, PillColor> = {
    visit: 'success',
    like: 'orange',
    message: 'purple',
    error: 'error',
}

const SUMMARY_KEY: Record<ActivityType, keyof ActivityFeedContext> = {
    visit: 'visits',
    like: 'likes',
    message: 'messages',
    error: 'errors',
}

export const ActivityTypePill = ({ type }: { type: ActivityType }) => (
    <Pill label={type} color={TYPE_COLORS[type]} variant="outlined" />
)

type LegendProps = {
    summary?: ActivityFeedContext
}

export const ActivityTypeLegend = ({ summary }: LegendProps) => (
    <Inline gap="12" wrap className="ActivityTypeLegend">
        {(Object.entries(TYPE_COLORS) as [ActivityType, PillColor][]).map(([type, color]) => {
            const count = summary ? summary[SUMMARY_KEY[type]] : undefined
            const label = count !== undefined ? `${type} (${count})` : type
            return <Pill key={type} label={label} color={color} variant="outlined" />
        })}
    </Inline>
)
