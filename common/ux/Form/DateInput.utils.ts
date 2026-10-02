import type { Nullable } from '@common-utils'

function getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number): number {
    const day = new Date(year, month, 1).getDay()
    return day === 0 ? 6 : day - 1 // Monday-based
}

function formatDate(iso: string): string {
    if (!iso) return ''
    const [y, m, d] = iso.split('-')
    return `${d}/${m}/${y}`
}

function parseDate(text: string): Nullable<string> {
    const cleaned = text.replace(/\//g, '')
    if (cleaned.length !== 8) return null
    const d = parseInt(cleaned.slice(0, 2), 10)
    const m = parseInt(cleaned.slice(2, 4), 10)
    const y = parseInt(cleaned.slice(4, 8), 10)
    if (isNaN(d) || isNaN(m) || isNaN(y)) return null
    if (d < 1 || d > 31 || m < 1 || m > 12 || y < 1900 || y > 2100) return null
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
