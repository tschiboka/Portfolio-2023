import { describe, it, expect } from 'vitest'
import type { Nullish, Optional } from '../../../Generics'
import { Codecs } from '../Codecs'

describe('Codecs.text', () => {
    it.each<[unknown, Optional<string>]>([
        ['hi', 'hi'],
        ['  hi  ', 'hi'],
        ['', undefined],
        ['   ', undefined],
        [null, undefined],
    ])('encode(%j) should return %j', (value, expected) => {
        expect(Codecs.text.encode(value as string)).toBe(expected)
    })
    it.each<[Nullish<string>, Optional<string>]>([
        ['hi', 'hi'],
        ['', undefined],
        [null, undefined],
        [undefined, undefined],
    ])('decode(%j) should return %j', (raw, expected) => {
        expect(Codecs.text.decode(raw)).toBe(expected)
    })
})

describe('Codecs.search', () => {
    it.each<[unknown, Optional<string>]>([
        ['foo', 'foo'],
        ['  foo  ', 'foo'],
        ['', undefined],
        [null, undefined],
    ])('encode(%j) should return %j', (value, expected) => {
        expect(Codecs.search.encode(value as string)).toBe(expected)
    })
    it.each<[Nullish<string>, Optional<string>]>([
        ['foo', 'foo'],
        ['', undefined],
        [null, undefined],
    ])('decode(%j) should return %j', (raw, expected) => {
        expect(Codecs.search.decode(raw)).toBe(expected)
    })
})

describe('Codecs.option', () => {
    it.each<[unknown, Optional<string>]>([
        ['visit', 'visit'],
        ['  visit  ', 'visit'],
        ['', undefined],
        [null, undefined],
    ])('encode(%j) should return %j', (value, expected) => {
        expect(Codecs.option.encode(value as string)).toBe(expected)
    })
    it.each<[Nullish<string>, Optional<string>]>([
        ['visit', 'visit'],
        ['', undefined],
        [null, undefined],
    ])('decode(%j) should return %j', (raw, expected) => {
        expect(Codecs.option.decode(raw)).toBe(expected)
    })
})

describe('Codecs.date', () => {
    it.each<[unknown, Optional<string>]>([
        ['2026-08-01', '2026-08-01'],
        ['', undefined],
        [null, undefined],
    ])('encode(%j) should return %j', (value, expected) => {
        expect(Codecs.date.encode(value as string)).toBe(expected)
    })
    it.each<[Nullish<string>, Optional<string>]>([
        ['2026-08-01', '2026-08-01'],
        ['', undefined],
        [null, undefined],
    ])('decode(%j) should return %j', (raw, expected) => {
        expect(Codecs.date.decode(raw)).toBe(expected)
    })
})

describe('Codecs.number', () => {
    it.each<[number, Optional<string>]>([
        [42, '42'],
        [0, '0'],
        [-0, '0'],
        [3.14, '3.14'],
        [-3.14, '-3.14'],
        [Infinity, 'Infinity'],
        [NaN, undefined],
    ])('encode(%j) should return %j', (value, expected) => {
        expect(Codecs.number.encode(value)).toBe(expected)
    })
    it.each<[Nullish<string>, Optional<number>]>([
        ['42', 42],
        ['  42  ', 42],
        ['3.14', 3.14],
        ['0', 0],
        ['abc', undefined],
        ['', undefined],
        [null, undefined],
        [undefined, undefined],
    ])('decode(%j) should return %j', (raw, expected) => {
        expect(Codecs.number.decode(raw)).toBe(expected)
    })
})

describe('Codecs.checkbox', () => {
    it.each<[boolean, Optional<string>]>([
        [true, 'true'],
        [false, undefined],
    ])('encode(%j) should return %j', (value, expected) => {
        expect(Codecs.checkbox.encode(value)).toBe(expected)
    })
    it.each<[Nullish<string>, boolean]>([
        ['true', true],
        ['false', false],
        ['', false],
        [null, false],
        [undefined, false],
    ])('decode(%j) should return %j', (raw, expected) => {
        expect(Codecs.checkbox.decode(raw)).toBe(expected)
    })
})
