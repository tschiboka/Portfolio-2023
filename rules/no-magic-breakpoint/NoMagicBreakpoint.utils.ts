import { Breakpoints } from '../tokens.generated.js'

/** The widths the breakpoint tokens allow, which every bound has to name. */
const TokenWidths = Object.values(Breakpoints)

/** A width bound inside a media query — `(min-width: 768px)`. */
const widthClause = /\(\s*(?<bound>min|max)-width\s*:\s*(?<value>\d+)px\s*\)/g

/** A bound and the width it states. */
export type Width = {
    bound: string
    width: number
}

/** Reads the query text the processor stores as a media marker's value. */
export const getQueryText = (value: { type: string; value?: unknown }): string | null =>
    value.type === 'Literal' && typeof value.value === 'string' ? value.value : null

/** Every width bound a query states, in the order it writes them. */
export const getWidths = (query: string): Width[] =>
    Array.from(query.matchAll(widthClause), (match) => ({
        bound: match.groups?.bound ?? 'min',
        width: Number.parseInt(match.groups?.value ?? '0', 10),
    }))

/**
 * Answers whether a bound names a token.
 *
 * A `min-width` states the token itself; a `max-width` states the token less one, so `767px`
 * reads as `md`.
 */
export const isTokenWidth = ({ bound, width }: Width): boolean =>
    TokenWidths.includes(bound === 'max' ? width + 1 : width)
