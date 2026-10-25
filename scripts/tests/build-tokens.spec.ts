import { describe, expect, it } from 'vitest'
import { buildCss, buildRules, buildScss, buildTs, keyOf } from '../build-tokens.js'

describe('keyOf', () => {
    it.each(['0', '1', '5', 'X', 'Black'])('should leave the key %s bare', (step) => {
        expect(keyOf(step)).toBe(step)
    })

    it.each(['0a01', '1a10', '2a05', '5a90'])('should quote the key %s', (step) => {
        expect(keyOf(step)).toBe(`'${step}'`)
    })
})

describe('buildTs', () => {
    /** A colour body line: a quoted string, an identifier or a plain index, then a string value. */
    const ColourLine = /^ {8}('[^']+'|[A-Za-z_$][\w$]*|\d+): '.+',$/

    const bodyOf = () =>
        buildTs()
            .split('\n')
            .filter((line) => line.startsWith('        '))

    it('should write every colour key in a form the parser accepts', () => {
        expect(bodyOf().filter((line) => !ColourLine.test(line))).toEqual([])
    })

    it('should quote the first alpha step of a family', () => {
        expect(bodyOf()).toContain(`        '0a01': 'rgba(0, 0, 0, 0.01)',`)
    })

    it('should keep a plain index bare', () => {
        expect(bodyOf()).toContain(`        0: '#000',`)
    })

    it('should keep a lettered step bare', () => {
        expect(bodyOf()).toContain(`        X: '#0a0a0a',`)
    })
})

describe('the renamed warning family', () => {
    it.each([
        ['a custom property', buildCss(), '--warning: #ffd740;'],
        ['a Sass variable', buildScss(), '$warning: #ffd740;'],
        ['a Const map', buildTs(), '    Warning: {'],
        ['the rule family list', buildRules(), `'warning'`],
    ])('should reach %s', (_where, mirror, expected) => {
        expect(mirror).toContain(expected)
    })

    it('should leave the old name in no mirror', () => {
        const mirrors = [buildCss(), buildScss(), buildTs(), buildRules()]

        expect(mirrors.filter((mirror) => mirror.includes('yellow'))).toEqual([])
    })
})

describe('the bare gray', () => {
    it.each([
        ['a custom property', buildCss(), '--gray: #666;'],
        ['a Sass variable', buildScss(), '$gray: #666;'],
        ['the rule token list', buildRules(), `'gray'`],
    ])('should reach %s', (_where, mirror, expected) => {
        expect(mirror).toContain(expected)
    })

    it('should take the zero step of its map', () => {
        expect(buildTs()).toContain(`        0: '#666',`)
    })
})

describe('the breakpoints the rule mirror carries', () => {
    it('should map each name to its pixel value', () => {
        expect(buildRules()).toContain("    md: 768,")
    })

    it('should quote a name that cannot start an identifier', () => {
        expect(buildRules()).toContain("    '2xl': 1580,")
    })

    it('should read an open ended breakpoint as Infinity', () => {
        expect(buildRules()).toContain('    accordion: Infinity,')
    })
})
