import { Regexp } from '..'

describe('Regexp.ObjectId', () => {
    /** Valid 24-char lowercase hex ObjectId string. */
    const HEX = '64b000000000000000000000'

    it('should match exactly 24 lowercase hex characters', () => {
        expect(Regexp.ObjectId.test(HEX)).toBe(true)
    })

    describe('length boundaries', () => {
        it.each([
            ['23 chars', '64b00000000000000000000'],
            ['25 chars', `${HEX}0`],
            ['empty', ''],
        ])('should reject %s', (_label, value) => {
            expect(Regexp.ObjectId.test(value)).toBe(false)
        })
    })

    describe('case sensitivity (lowercase-only, no i flag)', () => {
        it('should match 0-9', () => {
            expect(Regexp.ObjectId.test('000000000000000000000000')).toBe(true)
        })

        it('should match a-f', () => {
            expect(Regexp.ObjectId.test('ffffffffffffffffffffffff')).toBe(true)
        })

        it('should reject uppercase A-F', () => {
            expect(Regexp.ObjectId.test('64B000000000000000000000')).toBe(false)
            expect(Regexp.ObjectId.test('64b0000000000000000000FF')).toBe(false)
            expect(Regexp.ObjectId.test('64b0000000000000000000A0')).toBe(false)
        })
    })

    describe('hexadecimal alphabet', () => {
        it.each(['g', 'z', 'Z'])('should reject a %s in the 24th position', (char) => {
            expect(Regexp.ObjectId.test(`${HEX.slice(0, 23)}${char}`)).toBe(false)
        })

        it.each(['_', '-', '/', '\\', '.', ' ', ':'])(
            'should reject punctuation %p in the 24th position',
            (char) => {
                expect(Regexp.ObjectId.test(`${HEX.slice(0, 23)}${char}`)).toBe(false)
            },
        )
    })

    describe('anchoring (must match the entire string)', () => {
        it.each([
            ['a valid ObjectId followed by extra chars', `${HEX}g`],
            ['extra chars followed by a valid ObjectId', `g${HEX}`],
            ['a valid ObjectId with leading whitespace', ` ${HEX}`],
            ['a valid ObjectId with trailing whitespace', `${HEX} `],
            ['two concatenated valid ObjectIds', `${HEX}${HEX}`],
            ['a newline before a valid ObjectId', `\n${HEX}`],
            ['a newline after a valid ObjectId', `${HEX}\n`],
        ])('should reject %s', (_label, value) => {
            expect(Regexp.ObjectId.test(value)).toBe(false)
        })
    })

    it('should reject whitespace embedded among otherwise-valid hex', () => {
        expect(Regexp.ObjectId.test('64b0000000000000000 00000')).toBe(false)
        expect(Regexp.ObjectId.test('64b0000000000000000\t00000')).toBe(false)
    })

    it('should reject a 0x prefix', () => {
        expect(Regexp.ObjectId.test(`0x${HEX}`)).toBe(false)
    })

    it('should reject hyphenated and UUID-shaped strings', () => {
        expect(Regexp.ObjectId.test('64b00000-0000-4000-8000-000000000000')).toBe(false)
        expect(Regexp.ObjectId.test('64b00000-0000-0000-0000-000000000000')).toBe(false)
    })
})

describe('Regexp.exactWord', () => {
    it('should match the exact word case-insensitively', () => {
        expect(Regexp.exactWord('push').test('push')).toBe(true)
        expect(Regexp.exactWord('push').test('PUSH')).toBe(true)
        expect(Regexp.exactWord('push').test('Push')).toBe(true)
    })

    it('should anchor to the whole string (no substring match)', () => {
        expect(Regexp.exactWord('push').test('push-up')).toBe(false)
        expect(Regexp.exactWord('push').test('xpush')).toBe(false)
        expect(Regexp.exactWord('push').test('push ')).toBe(false)
        expect(Regexp.exactWord('push').test(' push')).toBe(false)
    })

    it('should handle regex-special characters as literals within the word', () => {
        expect(Regexp.exactWord('a.b').test('a.b')).toBe(true)
        expect(Regexp.exactWord('a.b').test('axb')).toBe(false)
    })
})

describe('Regexp.escape', () => {
    it('should escape regex-special characters', () => {
        expect(Regexp.escape('a.b')).toBe('a\\.b')
        expect(Regexp.escape('x*y')).toBe('x\\*y')
    })

    it('should leave plain alphanumeric strings unchanged', () => {
        expect(Regexp.escape('hello')).toBe('hello')
        expect(Regexp.escape('push12')).toBe('push12')
    })

    it('should escape every character in the regex metacharacter set', () => {
        expect(Regexp.escape('.+*?^${}()[]|\\')).toBe(String.raw`\.\+\*\?\^\$\{\}\(\)\[\]\|\\`)
    })
})
