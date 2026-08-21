/**
 * A deliberate no-op: accepts any arguments and returns `undefined`.
 * Use where a callback is required but no action is intended, so the intent is explicit
 * rather than an empty function body.
 * @example
 * onPageChange: Functions.noop
 */
export const noop = <TArgs extends unknown[]>(..._args: TArgs): void => undefined

export const Functions = { noop }
