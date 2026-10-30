import { describe, it, expect } from 'vitest'
import { Strings } from '..'

describe('Strings.equalIgnoreCase', () => {
    it('should return true for equal strings ignoring case', () => {
        expect(Strings.equalIgnoreCase('Hello', 'hello')).toBe(true)
        expect(Strings.equalIgnoreCase('HELLO', 'Hello')).toBe(true)
        expect(Strings.equalIgnoreCase('hello', 'hello')).toBe(true)
    })

    it('should return false for different strings', () => {
        expect(Strings.equalIgnoreCase('Hello', 'world')).toBe(false)
        expect(Strings.equalIgnoreCase('Hello', 'Hella')).toBe(false)
    })

    it('should return true for empty strings', () => {
        expect(Strings.equalIgnoreCase('', '')).toBe(true)
    })

    it('should return false when only one string is empty', () => {
        expect(Strings.equalIgnoreCase('', 'a')).toBe(false)
        expect(Strings.equalIgnoreCase('a', '')).toBe(false)
    })

    it('should handle mixed-case and numeric-content strings', () => {
        expect(Strings.equalIgnoreCase('Version 2', 'VERSION 2')).toBe(true)
        expect(Strings.equalIgnoreCase('Version 2', 'Version 3')).toBe(false)
    })

    it('should be symmetric in its arguments', () => {
        expect(Strings.equalIgnoreCase('aBc', 'AbC')).toBe(Strings.equalIgnoreCase('AbC', 'aBc'))
    })

    it('should handle accented (non-ASCII) characters case-insensitively', () => {
        expect(Strings.equalIgnoreCase('CAFÉ', 'café')).toBe(true)
    })

    it('should not trim surrounding whitespace (raw string comparison)', () => {
        expect(Strings.equalIgnoreCase('Hello ', 'Hello')).toBe(false)
        expect(Strings.equalIgnoreCase(' Hello', 'Hello')).toBe(false)
    })

    it('should treat whitespace-only strings as unequal unless identical', () => {
        expect(Strings.equalIgnoreCase(' ', '')).toBe(false)
        expect(Strings.equalIgnoreCase(' ', ' ')).toBe(true)
    })
})

describe('Strings.includesIgnoreCase', () => {
    it('should return true when search is a case-insensitive substring', () => {
        expect(Strings.includesIgnoreCase('Hello World', 'WORLD')).toBe(true)
        expect(Strings.includesIgnoreCase('Hello World', 'hello')).toBe(true)
        expect(Strings.includesIgnoreCase('Hello World', 'lo wo')).toBe(true)
    })

    it('should return false when search is not present', () => {
        expect(Strings.includesIgnoreCase('Hello World', 'planet')).toBe(false)
        expect(Strings.includesIgnoreCase('Hello World', 'xyz')).toBe(false)
    })

    it('should return true for an empty search string', () => {
        expect(Strings.includesIgnoreCase('Hello', '')).toBe(true)
    })

    it('should return false when text is empty but search is not', () => {
        expect(Strings.includesIgnoreCase('', 'a')).toBe(false)
    })

    it('should handle numbers embedded in strings', () => {
        expect(Strings.includesIgnoreCase('Order 42', 'order 42')).toBe(true)
        expect(Strings.includesIgnoreCase('Order 42', 'order 43')).toBe(false)
    })

    it('should match accented (non-ASCII) substrings case-insensitively', () => {
        expect(Strings.includesIgnoreCase('Hello CAFÉ world', 'café')).toBe(true)
    })

    it('should match across embedded whitespace/newlines', () => {
        expect(Strings.includesIgnoreCase('line1\nline2', 'LINE')).toBe(true)
        expect(Strings.includesIgnoreCase('a b c', 'a b')).toBe(true)
    })
})

describe('Strings.capitalise', () => {
    it('should uppercase the first letter of a lowercase word', () => {
        expect(Strings.capitalise('exercise')).toBe('Exercise')
        expect(Strings.capitalise('routine')).toBe('Routine')
        expect(Strings.capitalise('user')).toBe('User')
    })

    it('should leave the rest of the string unchanged', () => {
        expect(Strings.capitalise('exercises list')).toBe('Exercises list')
        expect(Strings.capitalise('camelCase')).toBe('CamelCase')
    })

    it('should leave an already-capitalised string unchanged', () => {
        expect(Strings.capitalise('Exercise')).toBe('Exercise')
        expect(Strings.capitalise('Hello World')).toBe('Hello World')
    })

    it('should leave all-uppercase words effectively unchanged (only first char touched)', () => {
        expect(Strings.capitalise('USER')).toBe('USER')
        expect(Strings.capitalise('API')).toBe('API')
    })

    it('should return an empty string for empty input', () => {
        expect(Strings.capitalise('')).toBe('')
    })

    it('should uppercase a single-character string', () => {
        expect(Strings.capitalise('x')).toBe('X')
        expect(Strings.capitalise('A')).toBe('A')
    })

    it('should uppercase non-ASCII first characters', () => {
        expect(Strings.capitalise('élan')).toBe('Élan')
        expect(Strings.capitalise('über')).toBe('Über')
    })

    it('should not trim leading whitespace (capitalises the whitespace char, if any)', () => {
        // A leading space is "capitalised" (unchanged) and the following char stays lowercase
        expect(Strings.capitalise(' test')).toBe(' test')
    })

    it.each([
        ['space', ' '],
        ['tab', '\t'],
        ['newline', '\n'],
        ['carriage return', '\r'],
        ['vertical tab', '\v'],
        ['form feed', '\f'],
        ['nbsp', '\u00A0'],
    ])('should leave a leading %s unchanged and lowercase nothing after it', (_label, ws) => {
        expect(Strings.capitalise(`${ws}word`)).toBe(`${ws}word`)
    })

    it('should leave trailing whitespace intact while capitalising the content', () => {
        expect(Strings.capitalise('test ')).toBe('Test ')
        expect(Strings.capitalise('hello\t')).toBe('Hello\t')
    })

    it('should handle digits and symbols in the rest of the string unchanged', () => {
        expect(Strings.capitalise('x2 format')).toBe('X2 format')
        expect(Strings.capitalise('p1')).toBe('P1')
    })

    it('should return an empty string for nullish input', () => {
        expect(Strings.capitalise(null)).toBe('')
        expect(Strings.capitalise(undefined)).toBe('')
    })

    it('should return a whitespace-only string unchanged (no trimming)', () => {
        expect(Strings.capitalise('   ')).toBe('   ')
    })

    it('should capitalise the first char of a multiline string, leaving the rest intact', () => {
        expect(Strings.capitalise('hello\nworld')).toBe('Hello\nworld')
    })

    it('should leave an emoji/surrogate-pair leading char unchanged', () => {
        // text[0] is the high surrogate of the pair; toUpperCase leaves it as-is
        expect(Strings.capitalise('🧪test')).toBe('🧪test')
        expect(Strings.capitalise('🎉party')).toBe('🎉party')
    })

    it('should capitalise a tab-indented string without trimming', () => {
        expect(Strings.capitalise('\thello')).toBe('\thello')
    })

    it('should leave a digit-leading string unchanged at position 0 (digit has no case)', () => {
        expect(Strings.capitalise('1exercise')).toBe('1exercise')
    })
})
