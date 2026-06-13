/**
 * Checks whether the current page is running on a localhost environment.
 * Useful for disabling analytics, visits, or other side-effects in dev.
 * @param hostname - Optional override for testing. Defaults to `window.location.hostname`.
 */
export const isLocalhost = (hostname?: string): boolean => {
    const name = hostname ?? window.location.hostname
    return name === 'localhost' || name === '127.0.0.1'
}
