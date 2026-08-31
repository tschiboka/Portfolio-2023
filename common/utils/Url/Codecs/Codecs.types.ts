import type { Nullish, Optional } from '@common-utils'

export type UrlKey = string
// A raw URL query value as read from search params — absent params are null/undefined.
export type UrlValue = Nullish<string>
// UI value -> URL string (undefined = omit the param)
export type UrlEncode<T = unknown> = (value: T) => Optional<string>
// Raw URL value -> UI value (undefined = absent/invalid)
export type UrlDecode<T = unknown> = (raw: Nullish<string>) => Optional<T>

export type Codec<T = string> = {
    encode: UrlEncode<T>
    decode: UrlDecode<T>
}
