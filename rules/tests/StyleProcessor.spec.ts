import { describe, expect, it } from 'vitest'
import { styleProcessor } from '../styleProcessor'

/**
 * Reads the first processed line as a value: it is an object literal of two strings, so it
 * parses as JSON once the wrapping parentheses go. `void 0` reads as `undefined`.
 */
const read = (source: string): unknown => {
    const [block] = styleProcessor.preprocess(source)
    const [line = ''] = block.split('\n')
    const trimmed = line.trim()

    if (trimmed === 'void 0;') return undefined

    return JSON.parse(trimmed.replace(/^\(\{/, '{').replace(/\}\);$/, '}')) as unknown
}

describe('styleProcessor', () => {
    it('should read a declaration as a property and its value', () => {
        expect(read('    z-index: 59;')).toEqual({ 'z-index': '59' })
    })

    it('should read a custom property as a declaration', () => {
        expect(read('--z-sticky: 20;')).toEqual({ '--z-sticky': '20' })
    })

    it('should read a declaration written without a semicolon', () => {
        expect(read('z-index: var(--z-top)')).toEqual({ 'z-index': 'var(--z-top)' })
    })

    it('should keep a colon that sits inside the value', () => {
        expect(read('background: url(https://example.com/a.png);')).toEqual({
            background: 'url(https://example.com/a.png)',
        })
    })

    it('should drop a trailing comment from the value', () => {
        expect(read('z-index: 10000; // above the shop')).toEqual({ 'z-index': '10000' })
    })

    it('should not read a selector as a declaration', () => {
        expect(read('.Submenu {')).toBeUndefined()
    })

    it('should not read an at-rule as a declaration', () => {
        expect(read('@media (max-width: 768px) {')).toBeUndefined()
    })

    it('should not read a closing brace as a declaration', () => {
        expect(read('}')).toBeUndefined()
    })

    it('should not read an import rule as a declaration', () => {
        expect(read("@use '@shared-styles/palette.scss' as palette;")).toBeUndefined()
    })

    it('should not read a commented-out declaration', () => {
        expect(read('/* z-index: 5; */')).toBeUndefined()
    })

    it('should not read a declaration that has no value', () => {
        expect(read('        animation:')).toBeUndefined()
    })

    it('should not read an empty line', () => {
        expect(read('')).toBeUndefined()
    })

    it('should read a declaration indented with a tab', () => {
        expect(read('\tz-index: 5;')).toEqual({ 'z-index': '5' })
    })

    it('should read a vendor-prefixed property', () => {
        expect(read('    -webkit-transform: scale(1.1);')).toEqual({
            '-webkit-transform': 'scale(1.1)',
        })
    })

    it('should keep an important flag inside the value', () => {
        expect(read('z-index: var(--z-top) !important;')).toEqual({
            'z-index': 'var(--z-top) !important',
        })
    })

    it('should read a property in its written case', () => {
        expect(read('Z-INDEX: 5;')).toEqual({ 'Z-INDEX': '5' })
    })

    it('should not read the second of two declarations on one line', () => {
        expect(read('margin: 0 auto; padding: 1rem;')).toBeUndefined()
    })

    it('should keep a quote carried by the value', () => {
        expect(read('content: "a";')).toEqual({ content: '"a"' })
    })

    it('should keep a single-quoted value as it stands', () => {
        expect(read("content: 'a';")).toEqual({ content: "'a'" })
    })

    it('should read a declaration written with CRLF line endings', () => {
        expect(read('z-index: 59;\r\n')).toEqual({ 'z-index': '59' })
    })

    it('should emit one line for every input line', () => {
        const source = ['a {', '    z-index: 1;', '}', ''].join('\n')

        expect(styleProcessor.preprocess(source)[0].split('\n')).toHaveLength(4)
    })
})
