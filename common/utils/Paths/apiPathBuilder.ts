import { getURL } from './getURL'
import { Paths } from './Paths'
import type { PathKey, ServerGroup } from './Path.types'

/**
 * Resolves a server endpoint key into a full URL, looked up in the given group.
 *
 * @param key - The endpoint key, e.g. `'Login'` or `'Gym'`.
 * @param group - The group the key lives in. Defaults to `'Api'`.
 * @example
 * ```ts
 * apiPathBuilder('Login')                       // http://localhost:5000/api/user/login
 * apiPathBuilder('Gym', 'Projects')             // http://localhost:5000/projects/gym
 * ```
 */
export const apiPathBuilder = (key: PathKey, group: ServerGroup = 'Api'): string => {
    const endpoints = Paths.Server[group] as Record<PathKey, string>

    return `${getURL()}/${endpoints[key]}`
}
