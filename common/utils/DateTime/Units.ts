export const Units = {
    Ms: {
        fromSec: (sec = 1) => sec * 1000,
        fromMin: (min = 1) => Units.Ms.fromSec(min * 60),
        fromHour: (hour = 1) => Units.Ms.fromMin(hour * 60),
        fromDay: (day = 1) => Units.Ms.fromHour(day * 24),
        fromWeek: (week = 1) => Units.Ms.fromDay(week * 7),
    },
}
