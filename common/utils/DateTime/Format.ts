import moment from 'moment'
import { Formats } from './Formats'
import type { Optional, Nullish } from '../Generics'
import { isString, isNullish } from '../Predicate'

export type FormatKey = keyof typeof Formats

type InputValue = Nullish<string | number | Date>

/** The formats the app itself produces. A string is held to these exactly. */
const DISPLAY_FORMATS = Object.values(Formats)

/**
 * Held to only after the strict pass fails, and always leniently. An array cannot do this
 * job: moment resolves an array by best-match and does not fall through, so one pass
 * rejects `12/06/2026 3:4:5` on the `HH` of a two-digit format.
 */
const LOOSE_FORMATS = [
    'D/M/YYYY',
    'D/M/YYYY H:m',
    'D/M/YYYY H:m:s',
    'D/M/YYYY H:m:s Z',
    'ddd, D. MMM. YYYY',
    'YYYY-MM-DDTHH:mm:ss.SSSZ',
]

/**
 * Parses a value to a moment. A string must match a known format; anything else returns
 * `undefined` rather than being handed to `new Date()`, which reads slashed dates
 * month-first and would silently turn `12/6/2026` into December.
 */
function toMoment(value: InputValue): Optional<moment.Moment> {
    if (isNullish(value) || value === '') return undefined

    if (!isString(value)) {
        const asMoment = moment(value)
        return asMoment.isValid() ? asMoment : undefined
    }

    const strict = moment(value, DISPLAY_FORMATS, true)
    if (strict.isValid()) return strict

    const loose = moment(value, LOOSE_FORMATS)
    return loose.isValid() ? loose : undefined
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
    to(to: FormatKey, value: InputValue): Optional<string> {
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
    parse(value: InputValue): Optional<Date> {
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

    /**
     * Converts a date value to an ISO `String` (e.g. `2023-08-06T14:30:00.000Z`), or the ISO form
     * of a fallback date when the value is empty or unparseable.
     *
     * @param value - The date value to convert
     * @param fallback - The date to use when `value` is empty/invalid (defaults to now)
     * @returns An ISO date string
     *
     * @example
     *   DateTime.Format.toIso('2023-08-06')          // "2023-08-05T22:00:00.000Z"
     *   DateTime.Format.toIso(undefined)             // <now in ISO>
     *   DateTime.Format.toIso('not-a-date', new Date(2020, 0, 1)) // "2019-12-31T23:00:00.000Z"
     */
    toIso(value: InputValue, fallback: Date = new Date()): string {
        const m = toMoment(value)
        return (m ?? toMoment(fallback))?.toISOString() ?? ''
    },
}
