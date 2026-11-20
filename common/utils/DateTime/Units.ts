const MS_PER_SECOND = 1000
const SECONDS_PER_MINUTE = 60
const MINUTES_PER_HOUR = 60
const HOURS_PER_DAY = 24
const DAYS_PER_WEEK = 7

export const Units = {
    Ms: {
        fromSec: (sec = 1) => sec * MS_PER_SECOND,
        fromMin: (min = 1) => Units.Ms.fromSec(min * SECONDS_PER_MINUTE),
        fromHour: (hour = 1) => Units.Ms.fromMin(hour * MINUTES_PER_HOUR),
        fromDay: (day = 1) => Units.Ms.fromHour(day * HOURS_PER_DAY),
        fromWeek: (week = 1) => Units.Ms.fromDay(week * DAYS_PER_WEEK),
        toSec: (ms: number) => ms / MS_PER_SECOND,
    },
}
