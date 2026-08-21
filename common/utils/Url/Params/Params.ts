import type { Optional } from '@common/utils/Generics'

const build = (namespace: Optional<string>, key: string): string =>
    namespace ? `${namespace}.${key}` : key

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
}
