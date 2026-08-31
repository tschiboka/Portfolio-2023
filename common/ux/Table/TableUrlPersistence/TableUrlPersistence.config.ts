import type { Codec } from '@common-utils'
import { Codecs } from '@common-utils'
import type { FilterConfig } from '../TableFilterConfig'

// Each filter's `type` guarantees its value type, so widening the concrete codecs to
// `Codec<unknown>` here is sound: `buildCodec` returns a generic codec the caller narrows by `type`.
const typeCodecMap = {
    text: Codecs.text,
    search: Codecs.text,
    date: Codecs.text,
    option: Codecs.text,
    number: Codecs.number,
    checkbox: Codecs.checkbox,
} as Record<FilterConfig['type'], Codec<unknown>>

/**
 * Resolves the URL codec for a filter config, honoring per-filter `encode`/`decode` overrides.
 * The returned codec is generic (`unknown` value) — the caller narrows it by the filter's `type`.
 * @example
 * const codec = buildCodec({ type: 'text' })
 * codec.encode('  hi  ')   // 'hi'       (trims)
 * codec.encode('')         // undefined  (empty omitted)
 * codec.decode(null)       // undefined  (absent value)
 */
export const buildCodec = (config: FilterConfig): Codec<unknown> => {
    const base: Codec<unknown> = typeCodecMap[config.type]
    return {
        encode: config.encode ?? base.encode,
        decode: config.decode ?? base.decode,
    }
}
