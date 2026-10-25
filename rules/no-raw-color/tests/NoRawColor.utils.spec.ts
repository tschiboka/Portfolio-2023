import { describe, expect, it } from 'vitest'
import { getPropertyName, isKnownColour, isPaletteName } from '../NoRawColor.utils'

describe('isKnownColour', () => {
    it('should accept a plain colour token', () => {
        expect(isKnownColour('--black-1')).toBe(true)
    })

    it('should accept an alpha variant', () => {
        expect(isKnownColour('--black-1a05')).toBe(true)
    })

    it('should accept a name given without the custom property prefix', () => {
        expect(isKnownColour('black-1')).toBe(true)
    })

    it('should reject a step the palette never defines', () => {
        expect(isKnownColour('--black-2a55')).toBe(false)
    })

    it('should reject a step outside a ramp', () => {
        expect(isKnownColour('--accent-dark-9')).toBe(false)
    })

    it('should leave another family to the rule that owns it', () => {
        expect(isKnownColour('--space-16')).toBe(true)
    })
})

describe('getPropertyName', () => {
    it('should read an identifier key', () => {
        expect(getPropertyName({ key: { type: 'Identifier', name: 'color' } })).toBe('color')
    })

    it('should read a quoted key', () => {
        expect(getPropertyName({ key: { type: 'Literal', value: '--brand' } })).toBe('--brand')
    })

    it('should return null for a computed key', () => {
        expect(getPropertyName({ key: { type: 'MemberExpression' } })).toBeNull()
    })

    it('should return null when the node carries no key', () => {
        expect(getPropertyName({})).toBeNull()
    })
})

describe('isPaletteName', () => {
    it.each(['orange', 'purple', 'gray', 'warning', 'accent', 'error', 'success'])(
        'should accept %s',
        (name) => {
            expect(isPaletteName(name)).toBe(true)
        },
    )

    it.each(['red', 'blue', 'white', 'black', 'Canvas'])('should reject %s', (name) => {
        expect(isPaletteName(name)).toBe(false)
    })
})
