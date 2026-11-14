import type { Dictionary } from '../Generics'

export type CacheKeyState = {
    key: string
    feature?: string
    id?: string | number
    filters?: Dictionary
}

export type CacheKey = Array<string | number | Dictionary>
