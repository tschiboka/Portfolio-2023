import {
    getDaysInMonth,
    getFirstDayOfMonth,
    formatDate,
    parseDate,
    toISODate,
} from '../DateInput.utils'

describe('DateInput.utils', () => {
    describe('getDaysInMonth', () => {
        it('returns 31 for January', () => {
            expect(getDaysInMonth(2024, 0)).toBe(31)
        })

        it('returns 28 for February in a non-leap year', () => {
            expect(getDaysInMonth(2023, 1)).toBe(28)
        })

        it('returns 29 for February in a leap year', () => {
            expect(getDaysInMonth(2024, 1)).toBe(29)
        })

        it('returns 30 for April', () => {
            expect(getDaysInMonth(2024, 3)).toBe(30)
        })

        it('returns 31 for December', () => {
            expect(getDaysInMonth(2024, 11)).toBe(31)
        })

        it('handles century non-leap year (1900)', () => {
            expect(getDaysInMonth(1900, 1)).toBe(28)
        })

        it('handles century leap year (2000)', () => {
            expect(getDaysInMonth(2000, 1)).toBe(29)
        })
    })

    describe('getFirstDayOfMonth', () => {
        it('returns Monday-based index (0=Monday)', () => {
            // 2024-01-01 is a Monday
            expect(getFirstDayOfMonth(2024, 0)).toBe(0)
        })

        it('returns correct day for a month starting on Sunday', () => {
            // 2024-09-01 is a Sunday
            expect(getFirstDayOfMonth(2024, 8)).toBe(6)
        })

        it('returns correct day for a month starting on Wednesday', () => {
            // 2024-05-01 is a Wednesday
            expect(getFirstDayOfMonth(2024, 4)).toBe(2)
        })
    })

    describe('formatDate', () => {
        it('formats ISO date to DD/MM/YYYY', () => {
            expect(formatDate('1990-05-15')).toBe('15/05/1990')
        })

        it('formats single-digit day and month', () => {
            expect(formatDate('2000-01-01')).toBe('01/01/2000')
        })

        it('formats end-of-year date', () => {
            expect(formatDate('2024-12-31')).toBe('31/12/2024')
        })

        it('returns empty string for empty input', () => {
            expect(formatDate('')).toBe('')
        })

        it('returns empty string for undefined', () => {
            expect(formatDate(undefined as unknown as string)).toBe('')
        })
    })

    describe('parseDate', () => {
        it('parses DD/MM/YYYY to ISO date', () => {
            expect(parseDate('15/05/1990')).toBe('1990-05-15')
        })

        it('parses single-digit day and month', () => {
            expect(parseDate('01/01/2000')).toBe('2000-01-01')
        })

        it('returns null for invalid format', () => {
            expect(parseDate('not-a-date')).toBeNull()
        })

        it('returns null for incomplete date', () => {
            expect(parseDate('15/05')).toBeNull()
        })

        it('returns null for day exceeding month days', () => {
            // Feb 30 does not exist
            expect(parseDate('30/02/2024')).toBeNull()
        })

        it('returns null for day 0', () => {
            expect(parseDate('00/05/2024')).toBeNull()
        })

        it('returns null for month 0', () => {
            expect(parseDate('15/00/2024')).toBeNull()
        })

        it('returns null for month > 12', () => {
            expect(parseDate('15/13/2024')).toBeNull()
        })

        it('returns null for year below 1900', () => {
            expect(parseDate('15/05/1899')).toBeNull()
        })

        it('returns null for year above 2100', () => {
            expect(parseDate('15/05/2101')).toBeNull()
        })

        it('validates leap year correctly (Feb 29)', () => {
            expect(parseDate('29/02/2024')).toBe('2024-02-29')
            expect(parseDate('29/02/2023')).toBeNull()
        })

        it('returns null for empty string', () => {
            expect(parseDate('')).toBeNull()
        })
    })

    describe('toISODate', () => {
        it('converts year, month (0-indexed), day to ISO string', () => {
            expect(toISODate(1990, 4, 15)).toBe('1990-05-15')
        })

        it('pads single-digit month and day', () => {
            expect(toISODate(2000, 0, 1)).toBe('2000-01-01')
        })

        it('handles December (month 11)', () => {
            expect(toISODate(2024, 11, 31)).toBe('2024-12-31')
        })
    })
})
