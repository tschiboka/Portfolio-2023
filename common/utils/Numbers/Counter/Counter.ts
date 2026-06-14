import { isFiniteNumber } from '@common/utils/Predicate/Predicate'
import { truncateTo } from '../truncateTo'

type Unit = { value: number; suffix: string }

const UNITS: readonly Unit[] = [
    { value: 1e12, suffix: 'T' },
    { value: 1e9, suffix: 'B' },
    { value: 1e6, suffix: 'M' },
    { value: 1e3, suffix: 'K' },
] as const
const MAX = 1e15

const formatWithUnit = (value: number, unit: Unit): string =>
    `${truncateTo(value / unit.value, 1)}${unit.suffix}`

const formatRecursive = (value: number, units: readonly Unit[], index = 0): string => {
    const unit = units[index]

    if (!unit) return String(Math.floor(value))
    if (value >= unit.value) return formatWithUnit(value, unit)
    return formatRecursive(value, units, index + 1)
}

/**
 * Formats a count as a compact badge-friendly string with unit suffixes.
 * Values are truncated (not rounded) to 1 decimal place per unit.
 * @param input - The count to format
 * @returns Formatted string (e.g. "1.5K", "999.9M", "999T+"), or "0" if input is non-positive or non-finite
 * @example
 * ```ts
 * Numbers.Counter.format(1500)        // "1.5K"
 * Numbers.Counter.format(1500000)     // "1.5M"
 * Numbers.Counter.format(1500000000)  // "1.5B"
 * Numbers.Counter.format(1500000000000) // "1.5T"
 * Numbers.Counter.format(1e15)        // "999T+"
 * Numbers.Counter.format(0)           // "0"
 * Numbers.Counter.format(-100)        // "0"
 * ```
 */
export const formatCompactCount = (input: number): string => {
    const value = Math.floor(input)

    if (!isFiniteNumber(value) || value <= 0) return '0'
    if (value >= MAX) return '999T+'
    return formatRecursive(value, UNITS)
}

export const Counter = {
    format: formatCompactCount,
}
