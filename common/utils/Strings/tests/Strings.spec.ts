import { describe, it, expect } from 'vitest'
import { Strings } from '../Strings'

describe('Strings.equalIgnoreCase', () => {
    it('returns true for equal strings ignoring case', () => {
        expect(Strings.equalIgnoreCase('Hello', 'hello')).toBe(true)
        expect(Strings.equalIgnoreCase('HELLO', 'Hello')).toBe(true)
        expect(Strings.equalIgnoreCase('hello', 'hello')).toBe(true)
    })

    it('returns false for different strings', () => {
        expect(Strings.equalIgnoreCase('Hello', 'world')).toBe(false)
        expect(Strings.equalIgnoreCase('Hello', 'Hella')).toBe(false)
    })

    it('returns true for empty strings', () => {
        expect(Strings.equalIgnoreCase('', '')).toBe(true)
    })

    it('returns false when only one string is empty', () => {
        expect(Strings.equalIgnoreCase('', 'a')).toBe(false)
        expect(Strings.equalIgnoreCase('a', '')).toBe(false)
    })

    it('handles mixed-case and numeric-content strings', () => {
        expect(Strings.equalIgnoreCase('Version 2', 'VERSION 2')).toBe(true)
        expect(Strings.equalIgnoreCase('Version 2', 'Version 3')).toBe(false)
    })

    it('is symmetric in its arguments', () => {
        expect(Strings.equalIgnoreCase('aBc', 'AbC')).toBe(Strings.equalIgnoreCase('AbC', 'aBc'))
    })

    it('handles accented (non-ASCII) characters case-insensitively', () => {
        expect(Strings.equalIgnoreCase('CAFÉ', 'café')).toBe(true)
    })

    it('does not trim surrounding whitespace (raw string comparison)', () => {
        expect(Strings.equalIgnoreCase('Hello ', 'Hello')).toBe(false)
        expect(Strings.equalIgnoreCase(' Hello', 'Hello')).toBe(false)
    })

    it('treats whitespace-only strings as unequal unless identical', () => {
        expect(Strings.equalIgnoreCase(' ', '')).toBe(false)
        expect(Strings.equalIgnoreCase(' ', ' ')).toBe(true)
    })
})

describe('Strings.includesIgnoreCase', () => {
    it('returns true when search is a case-insensitive substring', () => {
        expect(Strings.includesIgnoreCase('Hello World', 'WORLD')).toBe(true)
        expect(Strings.includesIgnoreCase('Hello World', 'hello')).toBe(true)
        expect(Strings.includesIgnoreCase('Hello World', 'lo wo')).toBe(true)
    })

    it('returns false when search is not present', () => {
        expect(Strings.includesIgnoreCase('Hello World', 'planet')).toBe(false)
        expect(Strings.includesIgnoreCase('Hello World', 'xyz')).toBe(false)
    })

    it('returns true for an empty search string', () => {
        expect(Strings.includesIgnoreCase('Hello', '')).toBe(true)
    })

    it('returns false when text is empty but search is not', () => {
        expect(Strings.includesIgnoreCase('', 'a')).toBe(false)
    })

    it('handles numbers embedded in strings', () => {
        expect(Strings.includesIgnoreCase('Order 42', 'order 42')).toBe(true)
        expect(Strings.includesIgnoreCase('Order 42', 'order 43')).toBe(false)
    })

    it('matches accented (non-ASCII) substrings case-insensitively', () => {
        expect(Strings.includesIgnoreCase('Hello CAFÉ world', 'café')).toBe(true)
    })

    it('matches across embedded whitespace/newlines', () => {
        expect(Strings.includesIgnoreCase('line1\nline2', 'LINE')).toBe(true)
        expect(Strings.includesIgnoreCase('a b c', 'a b')).toBe(true)
    })
})
