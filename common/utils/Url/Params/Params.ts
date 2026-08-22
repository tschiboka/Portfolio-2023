import type { Optional, Dictionary } from '@common/utils/Generics'

const build = (namespace: Optional<string>, key: string): string =>
    namespace ? `${namespace}.${key}` : key

/** Serialises an object of query params to a `?key=value&...` string, or `''` when empty/undefined.
 * Pure — builds a fresh `URLSearchParams`; does not mutate input.
 * @example
 * toQueryString({ a: '1', b: 'x y' }) // '?a=1&b=x+y'
 * toQueryString({})                    // ''
 * toQueryString(undefined)             // ''
 */
const toQueryString = (query: Optional<Dictionary<string>>): string => {
    if (!query) return ''
    const s = new URLSearchParams(query).toString()
    return s === '' ? '' : `?${s}`
}

/** Return a copy of `params` with `key` set to `value` when it differs from `fallback`;
 * otherwise with `key` removed. Pure — does not mutate the input. Used to keep URLs
 * minimal (values at their default are omitted rather than written).
 * @example
 * Params.setIfDifferent(new URLSearchParams('a=1'), undefined, 'a', '2', '1').toString() // 'a=2'
 * Params.setIfDifferent(new URLSearchParams('a=1'), undefined, 'a', '1', '1').toString() // ''
 */
const setIfDifferent = (
    params: URLSearchParams,
    namespace: Optional<string>,
    key: string,
    value: string,
    fallback: string,
): URLSearchParams => {
    const next = new URLSearchParams(params)
    const builtKey = build(namespace, key)
    if (value !== fallback) next.set(builtKey, value)
    else next.delete(builtKey)
    return next
}

export const Params = {
    build,
    setIfDifferent,
    toQueryString,
}
