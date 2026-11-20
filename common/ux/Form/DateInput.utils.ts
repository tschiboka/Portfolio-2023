import { Regexp } from '@common-utils'
import { DateInputConstants } from './DateInput.constants'
import type { Nullable } from '@common-utils'

function getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number): number {
    const day = new Date(year, month, 1).getDay()
    return day === 0 ? DateInputConstants.daysPerWeek - 1 : day - 1 // Monday-based
}

function formatDate(iso: string): string {
    if (!iso) return ''
    const [y, m, d] = iso.split('-')
    return `${d}/${m}/${y}`
}

function parseDate(text: string): Nullable<string> {
    const { decimalRadix, digitCount, longestMonth, maxYear, minYear, monthCount, segmentEnds } =
        DateInputConstants
    const cleaned = text.replace(Regexp.Slash, '')
    if (cleaned.length !== digitCount) return null
    const d = parseInt(cleaned.slice(0, segmentEnds[0]), decimalRadix)
    const m = parseInt(cleaned.slice(segmentEnds[0], segmentEnds[1]), decimalRadix)
    const y = parseInt(cleaned.slice(segmentEnds[1], digitCount), decimalRadix)
    if (isNaN(d) || isNaN(m) || isNaN(y)) return null
    if (d < 1 || d > longestMonth || m < 1 || m > monthCount || y < minYear || y > maxYear)
        return null
    const daysInMonth = getDaysInMonth(y, m - 1)
    if (d > daysInMonth) return null
    return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

function toISODate(year: number, month: number, day: number): string {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export const DateInputUtils = {
    getDaysInMonth,
    getFirstDayOfMonth,
    formatDate,
    parseDate,
    toISODate,
}
