/**
 * Safe wrapper around localStorage with JSON serialisation.
 * All methods are guarded against inaccessible localStorage
 * and malformed JSON — they degrade gracefully instead of throwing.
 */

const get = <T = unknown>(key: string): T | null => {
    try {
        const raw = localStorage.getItem(key)
        if (raw === null) return null
        return JSON.parse(raw) as T
    } catch (e) {
        console.error(`Storage.get("${key}") failed:`, e)
        return null
    }
}

const set = <T>(key: string, value: T): void => {
    try {
        localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
        console.error(`Storage.set("${key}") failed:`, e)
    }
}

const remove = (key: string): void => {
    try {
        localStorage.removeItem(key)
    } catch (e) {
        console.error(`Storage.remove("${key}") failed:`, e)
    }
}

const update = <T>(key: string, updater: (prev: T | null) => T): T => {
    const prev = get<T>(key)
    const next = updater(prev)
    set(key, next)
    return next
}

export const Storage = { get, set, remove, update }
