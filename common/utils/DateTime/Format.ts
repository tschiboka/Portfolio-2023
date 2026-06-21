import moment from 'moment'
import { Formats } from './Formats'

export type FormatKey = keyof typeof Formats

type InputValue = string | number | Date | undefined | null

/** Ordered list of format strings to try when parsing date strings. */
const PARSE_FORMATS = Object.values(Formats)

function toMoment(value: InputValue): moment.Moment | undefined {
    if (value === undefined || value === null || value === '') return undefined

    // For strings, try our known formats first (e.g. DD/MM/YYYY) before falling
    // back to moment's auto-detection (which assumes US date format).
    if (typeof value === 'string') {
        const parsed = moment(value, PARSE_FORMATS, true)
        if (parsed.isValid()) return parsed
    }

    const m = moment(value)
    if (!m.isValid()) return undefined

    return m
}

export const Format = {
    /**
     * Converts a date value to a predefined format string.
     *
     * Accepts Date objects, timestamps, ISO strings, or date strings in any of the known formats.
     *
     * @param to - The target format key (e.g. `'DisplayDate'`, `'DisplayLongDate'`)
     * @param value - The date value to format
     * @returns The formatted string, or `undefined` if the value is empty or invalid
     *
     * @example
     *   DateTime.Format.to('DisplayLongDate', '2023-08-06')   // "Sun, 06. Aug. 2023"
     *   DateTime.Format.to('DisplayDate', new Date(2023, 7, 6)) // "06/08/2023"
     *   DateTime.Format.to('DisplayDate', undefined)            // undefined
     */
    to(to: FormatKey, value: InputValue): string | undefined {
        const m = toMoment(value)
        if (!m) return undefined

        return m.format(Formats[to])
    },

    /**
     * Parses a date value into a Date object.
     *
     * Accepts Date objects, timestamps, ISO strings, or date strings in any of the known formats.
     *
     * @param value - The date value to parse
     * @returns A valid Date, or `undefined` if the value is empty or unparseable
     *
     * @example
     *   DateTime.Format.parse('12/06/2026')       // Date(2026, 5, 12)
     *   DateTime.Format.parse('2023-08-06')        // Date(2023, 7, 6)
     *   DateTime.Format.parse(new Date(2023, 7, 6)) // Date(2023, 7, 6)
     *   DateTime.Format.parse(undefined)            // undefined
     */
    parse(value: InputValue): Date | undefined {
        const m = toMoment(value)
        return m?.toDate()
    },

    /**
     * Converts a date value to a Unix timestamp (milliseconds since 1970-01-01).
     *
     * Useful for sorting and numeric comparisons.
     *
     * @param value - The date value to convert
     * @returns Milliseconds since Unix epoch, or `0` if the value is empty or unparseable
     *
     * @example
     *   DateTime.Format.ms('12/06/2026')      // 1778198400000
     *   DateTime.Format.ms(new Date())         // 1718123456000
     *   DateTime.Format.ms(undefined)          // 0
     */
    ms(value: InputValue): number {
        const m = toMoment(value)
        return m?.valueOf() ?? 0
    },
}
