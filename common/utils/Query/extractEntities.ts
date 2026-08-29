import type { Dictionary, Nullish } from '../Generics'

/**
 * Extracts the entity collection stored under `key` in a response body, defaulting to an empty
 * array when the body or the key is absent. Pairs with `extractAxiosData`, which returns the body.
 * @example
 * extractEntities({ difficulties: [{ value: 'beginner', label: 'Beginner' }] }, 'difficulties')
 * // [{ value: 'beginner', label: 'Beginner' }]
 */
export const extractEntities = <TEntity>(
    body: Nullish<Dictionary<TEntity[]>>,
    key: string,
): TEntity[] => body?.[key] ?? []
