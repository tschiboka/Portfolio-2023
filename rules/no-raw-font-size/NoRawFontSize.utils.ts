import { isString } from '../../common/utils/Predicate/Predicate.js'

/** The two names a font size is written under: the stylesheet and the TS styles object. */
const FontSizeKeys = new Set(['font-size', 'fontSize'])

/** An absolute length — px, a physical unit, or a rem that bypasses the scale. */
const AbsoluteLength = /-?\d*\.?\d+(?:px|pt|pc|cm|mm|in|rem)\b/i

type KeyLike = { type: string; name?: string; value?: unknown }

/** Reads a property key, whether it is an identifier or a quoted string. */
export const getKeyText = (key: KeyLike): string => {
    if (key.type === 'Identifier') return key.name ?? ''
    if (isString(key.value)) return key.value

    return ''
}

/** Answers whether a property names a font size. */
export const isFontSize = (key: KeyLike): boolean => FontSizeKeys.has(getKeyText(key))

/**
 * Answers whether a value carries an absolute length.
 *
 * It reads the whole value, so `calc(1.2rem + 2px)` is caught while `var(--font-md)`, `$font_sm`
 * and a contextual `2.4em` are not.
 */
export const hasAbsoluteLength = (value: KeyLike): boolean =>
    value.type === 'Literal' && isString(value.value) && AbsoluteLength.test(value.value)
