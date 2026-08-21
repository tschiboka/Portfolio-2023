import type { Dictionary } from '../Generics'

/**
 * Builds an object from an iterable of `[key, value]` pairs, typed as `T`.
 *
 * `Object.fromEntries` can't infer a generic caller-supplied shape, so this centralizes the
 * single `as T` assertion behind a named, documented boundary (see AGENTS.md §3.3 — extract the
 * generic, don't inline it).
 * @example
 * const filters = fromEntries<{ name: string }>([['name', 'ada']]) // { name: 'ada' }
 */
export const fromEntries = <T extends Dictionary>(
    entries: Iterable<readonly [string, unknown]>,
): T => Object.fromEntries(entries) as T
