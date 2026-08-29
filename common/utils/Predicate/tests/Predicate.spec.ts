import type { Nullish } from '../../Generics'
import {
    isDefined,
    isUndefined,
    isNull,
    isNullish,
    isTruthy,
    isFalsy,
    isBoolean,
    isNumber,
    isPositiveInteger,
    isString,
    isDigits,
    isPrimitive,
    isFunction,
    isFiniteNumber,
    isArray,
    isObject,
    isObjectId,
    isValidObjectId,
    isPlainObject,
    hasLength,
    isEmpty,
    isNonEmpty,
    isNested,
    hasProperty,
    hasValue,
    isOneOf,
    includesAll,
    isShallowEqual,
    isEqual,
    isUnique,
    isInstanceOf,
    isDate,
    isError,
    isRegExp,
    isPromise,
    isThenable,
    isAll,
    isAny,
} from '../Predicate'

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = (): void => {}

describe('isDefined', () => {
    it('returns true for non-null, non-undefined values', () => {
        expect(isDefined(0)).toBe(true)
        expect(isDefined('')).toBe(true)
        expect(isDefined(false)).toBe(true)
        expect(isDefined([])).toBe(true)
        expect(isDefined({})).toBe(true)
    })

    it('returns false for null', () => {
        expect(isDefined(null)).toBe(false)
    })

    it('returns false for undefined', () => {
        expect(isDefined(undefined)).toBe(false)
    })

    it('works as a filter callback', () => {
        const items: Nullish<string>[] = ['a', null, 'b', undefined]
        const result = items.filter(isDefined)
        expect(result).toEqual(['a', 'b'])
    })
})

describe('isUndefined', () => {
    it('returns true for undefined', () => {
        expect(isUndefined(undefined)).toBe(true)
    })

    it('returns false for null', () => {
        expect(isUndefined(null)).toBe(false)
    })

    it('returns false for other values', () => {
        expect(isUndefined(0)).toBe(false)
        expect(isUndefined('')).toBe(false)
        expect(isUndefined(false)).toBe(false)
    })
})

describe('isNull', () => {
    it('returns true for null', () => {
        expect(isNull(null)).toBe(true)
    })

    it('returns false for undefined', () => {
        expect(isNull(undefined)).toBe(false)
    })

    it('returns false for other values', () => {
        expect(isNull(0)).toBe(false)
        expect(isNull('')).toBe(false)
        expect(isNull(false)).toBe(false)
    })
})

describe('isNullish', () => {
    it('returns true for null', () => {
        expect(isNullish(null)).toBe(true)
    })

    it('returns true for undefined', () => {
        expect(isNullish(undefined)).toBe(true)
    })

    it('returns false for other values', () => {
        expect(isNullish(0)).toBe(false)
        expect(isNullish('')).toBe(false)
        expect(isNullish(false)).toBe(false)
        expect(isNullish('null')).toBe(false)
        expect(isNullish('undefined')).toBe(false)
        expect(isNullish(NaN)).toBe(false)
        expect(isNullish({})).toBe(false)
        expect(isNullish([])).toBe(false)
    })
})

describe('isTruthy', () => {
    it('returns true for truthy values', () => {
        expect(isTruthy(1)).toBe(true)
        expect(isTruthy('hello')).toBe(true)
        expect(isTruthy(true)).toBe(true)
        expect(isTruthy([])).toBe(true)
        expect(isTruthy({})).toBe(true)
    })

    it('returns false for falsy values', () => {
        expect(isTruthy(0)).toBe(false)
        expect(isTruthy('')).toBe(false)
        expect(isTruthy(false)).toBe(false)
        expect(isTruthy(null)).toBe(false)
        expect(isTruthy(undefined)).toBe(false)
    })

    it('works as a filter callback', () => {
        const items = ['a', null, 0, 'b', undefined, '']
        const result = items.filter(isTruthy)
        expect(result).toEqual(['a', 'b'])
    })
})

describe('isFalsy', () => {
    it('returns true for falsy values', () => {
        expect(isFalsy(0)).toBe(true)
        expect(isFalsy('')).toBe(true)
        expect(isFalsy(false)).toBe(true)
        expect(isFalsy(null)).toBe(true)
        expect(isFalsy(undefined)).toBe(true)
    })

    it('returns false for truthy values', () => {
        expect(isFalsy(1)).toBe(false)
        expect(isFalsy('hello')).toBe(false)
        expect(isFalsy(true)).toBe(false)
        expect(isFalsy([])).toBe(false)
        expect(isFalsy({})).toBe(false)
    })
})

describe('isBoolean', () => {
    it('returns true for booleans', () => {
        expect(isBoolean(true)).toBe(true)
        expect(isBoolean(false)).toBe(true)
    })

    it('returns false for non-booleans', () => {
        expect(isBoolean(0)).toBe(false)
        expect(isBoolean(1)).toBe(false)
        expect(isBoolean('')).toBe(false)
        expect(isBoolean('true')).toBe(false)
        expect(isBoolean(null)).toBe(false)
    })
})

describe('isNumber', () => {
    it('returns true for numbers', () => {
        expect(isNumber(42)).toBe(true)
        expect(isNumber(0)).toBe(true)
        expect(isNumber(-1)).toBe(true)
        expect(isNumber(3.14)).toBe(true)
        expect(isNumber(NaN)).toBe(true)
        expect(isNumber(Infinity)).toBe(true)
    })

    it('returns false for non-numbers', () => {
        expect(isNumber('42')).toBe(false)
        expect(isNumber(null)).toBe(false)
        expect(isNumber(undefined)).toBe(false)
        expect(isNumber(true)).toBe(false)
    })
})

describe('isPositiveInteger', () => {
    it('returns true for positive integers', () => {
        expect(isPositiveInteger(1)).toBe(true)
        expect(isPositiveInteger(42)).toBe(true)
        expect(isPositiveInteger(Number.MAX_SAFE_INTEGER)).toBe(true)
    })

    it('returns false for zero and negative integers', () => {
        expect(isPositiveInteger(0)).toBe(false)
        expect(isPositiveInteger(-1)).toBe(false)
        expect(isPositiveInteger(-42)).toBe(false)
        expect(isPositiveInteger(Number.MIN_SAFE_INTEGER)).toBe(false)
    })

    it('returns false for fractional numbers', () => {
        expect(isPositiveInteger(2.5)).toBe(false)
        expect(isPositiveInteger(-2.5)).toBe(false)
        expect(isPositiveInteger(0.5)).toBe(false)
        expect(isPositiveInteger(Math.PI)).toBe(false)
    })

    it('returns false for non-finite numbers', () => {
        expect(isPositiveInteger(NaN)).toBe(false)
        expect(isPositiveInteger(Infinity)).toBe(false)
        expect(isPositiveInteger(-Infinity)).toBe(false)
    })

    it('returns false for non-number values', () => {
        expect(isPositiveInteger('3')).toBe(false)
        expect(isPositiveInteger('')).toBe(false)
        expect(isPositiveInteger(null)).toBe(false)
        expect(isPositiveInteger(undefined)).toBe(false)
        expect(isPositiveInteger(true)).toBe(false)
        expect(isPositiveInteger(false)).toBe(false)
        expect(isPositiveInteger([])).toBe(false)
        expect(isPositiveInteger({})).toBe(false)
        expect(isPositiveInteger(Symbol('3'))).toBe(false)
    })

    it('narrows the type to a positive integer when asserted', () => {
        const value: unknown = 5
        if (isPositiveInteger(value)) {
            // value is narrowed to number here
            expect(value > 0).toBe(true)
        } else {
            throw new Error('expected 5 to be a positive integer')
        }
    })
})

describe('isString', () => {
    it('returns true for strings', () => {
        expect(isString('')).toBe(true)
        expect(isString('hello')).toBe(true)
        expect(isString(`template`)).toBe(true)
    })

    it('returns false for non-strings', () => {
        expect(isString(42)).toBe(false)
        expect(isString(null)).toBe(false)
        expect(isString(undefined)).toBe(false)
        expect(isString(true)).toBe(false)
        expect(isString([])).toBe(false)
    })
})

describe('isDigits', () => {
    it.each(['0', '12345', '999000111222', '007'])(
        'returns true for digit-only strings: %s',
        (value) => {
            expect(isDigits(value)).toBe(true)
        },
    )

    it('returns false for the empty string', () => {
        expect(isDigits('')).toBe(false)
    })

    it.each(['12a45', '12 45', '12.5', '1-2', '1_2', '+12', '-12'])(
        'returns false for strings with non-digits: %s',
        (value) => {
            expect(isDigits(value)).toBe(false)
        },
    )

    it('returns false for non-strings', () => {
        expect(isDigits(12345)).toBe(false)
        expect(isDigits(null)).toBe(false)
        expect(isDigits(undefined)).toBe(false)
    })
})

describe('isPrimitive', () => {
    it('returns true for primitives', () => {
        expect(isPrimitive('hello')).toBe(true)
        expect(isPrimitive(42)).toBe(true)
        expect(isPrimitive(true)).toBe(true)
        expect(isPrimitive(null)).toBe(true)
        expect(isPrimitive(undefined)).toBe(true)
    })

    it('returns false for non-primitives', () => {
        expect(isPrimitive({})).toBe(false)
        expect(isPrimitive([])).toBe(false)
        expect(isPrimitive(noop)).toBe(false)
        expect(isPrimitive(new Date())).toBe(false)
    })
})

describe('isFunction', () => {
    it('returns true for functions', () => {
        expect(isFunction(noop)).toBe(true)
        expect(
            isFunction(function named() {
                noop()
            }),
        ).toBe(true)
        expect(isFunction(Math.max)).toBe(true)
    })

    it('returns false for non-functions', () => {
        expect(isFunction('hello')).toBe(false)
        expect(isFunction(42)).toBe(false)
        expect(isFunction(null)).toBe(false)
        expect(isFunction({})).toBe(false)
    })
})

describe('isFiniteNumber', () => {
    it('returns true for finite numbers', () => {
        expect(isFiniteNumber(42)).toBe(true)
        expect(isFiniteNumber(0)).toBe(true)
        expect(isFiniteNumber(-1.5)).toBe(true)
    })

    it('returns false for NaN', () => {
        expect(isFiniteNumber(NaN)).toBe(false)
    })

    it('returns false for Infinity', () => {
        expect(isFiniteNumber(Infinity)).toBe(false)
        expect(isFiniteNumber(-Infinity)).toBe(false)
    })

    it('returns false for non-numbers', () => {
        expect(isFiniteNumber('42')).toBe(false)
        expect(isFiniteNumber(null)).toBe(false)
    })
})

describe('isArray', () => {
    it('returns true for arrays', () => {
        expect(isArray([])).toBe(true)
        expect(isArray([1, 2, 3])).toBe(true)
        expect(isArray(new Array(3))).toBe(true)
    })

    it('returns false for non-arrays', () => {
        expect(isArray('hi')).toBe(false)
        expect(isArray({ length: 0 })).toBe(false)
        expect(isArray(null)).toBe(false)
        expect(isArray({})).toBe(false)
    })
})

describe('isObject', () => {
    it('returns true for plain objects', () => {
        expect(isObject({})).toBe(true)
        expect(isObject({ a: 1 })).toBe(true)
    })

    it('returns true for class instances', () => {
        expect(isObject(new Date())).toBe(true)
        expect(isObject(/regex/)).toBe(true)
    })

    it('returns false for arrays', () => {
        expect(isObject([])).toBe(false)
    })

    it('returns false for null', () => {
        expect(isObject(null)).toBe(false)
    })

    it('returns false for primitives', () => {
        expect(isObject('string')).toBe(false)
        expect(isObject(42)).toBe(false)
    })
})

describe('isObjectId', () => {
    /** Valid 24-char lowercase hex ObjectId string. */
    const HEX = '64b000000000000000000000'
    /** Duck-typed Mongo ObjectId: an object whose String() form is the given value. */
    const objectId = (asString: string) => ({ toString: () => asString })

    it('returns true for an object whose String() form is 24-char lowercase hex', () => {
        expect(isObjectId(objectId(HEX))).toBe(true)
    })

    it('returns false for a primitive 24-char hex string (it is the representation, not the object)', () => {
        expect(isObjectId(HEX)).toBe(false)
    })

    describe('primitive values', () => {
        it.each([
            [HEX],
            [''],
            ['not-an-id'],
            [0],
            [42],
            [-1],
            [1.5],
            [NaN],
            [Infinity],
            [-Infinity],
            [true],
            [false],
            [null],
            [undefined],
        ])('returns false for primitive %p', (primitive) => {
            expect(isObjectId(primitive)).toBe(false)
        })

        it('returns false for BigInt and Symbol primitives', () => {
            expect(isObjectId(10n)).toBe(false)
            expect(isObjectId(Symbol('id'))).toBe(false)
        })
    })

    it('returns false for arrays and functions', () => {
        expect(isObjectId([])).toBe(false)
        expect(isObjectId(['64b000000000000000000000'])).toBe(false)
        expect(isObjectId(noop)).toBe(false)
    })

    describe('hex-format boundaries', () => {
        it('returns true for exactly 24 chars', () => {
            expect(isObjectId(objectId(HEX))).toBe(true)
        })

        it.each([
            ['shorter than 24', objectId('64b00000000000000000')],
            ['longer than 24', objectId(`${HEX}0`)],
            ['empty', objectId('')],
            ['non-hex char', objectId('64b00000000000000000000g')],
            ['space', objectId('64b0000000000000000 00000')],
            ['tab', objectId('64b0000000000000000\t00000')],
            ['newline', objectId('64b0000000000000000\n00000')],
            ['leading whitespace', objectId(` ${HEX}`)],
            ['trailing whitespace', objectId(`${HEX} `)],
            ['leading/trailing whitespace', objectId(` ${HEX} `)],
            ['leading 0x prefix', objectId(`0x${HEX}`)],
            ['hyphenated', objectId('64b00000-0000-0000-0000-000000000000')],
            ['uuid-shaped', objectId('64b00000-0000-4000-8000-000000000000')],
        ])('returns false when %s', (_label, value) => {
            expect(isObjectId(value)).toBe(false)
        })
    })

    describe('hexadecimal alphabet (case-sensitive, lowercase-only)', () => {
        it('returns true for 0-9 and a-f', () => {
            expect(isObjectId(objectId('000000000000000000000000'))).toBe(true)
            expect(isObjectId(objectId('ffffffffffffffffffffffff'))).toBe(true)
            expect(isObjectId(objectId('64b000000000000000000000'))).toBe(true)
        })

        it('rejects uppercase A-F', () => {
            expect(isObjectId(objectId('64B000000000000000000000'))).toBe(false)
            expect(isObjectId(objectId('64b0000000000000000000FF'))).toBe(false)
            expect(isObjectId(objectId('64b0000000000000000000A0'))).toBe(false)
        })

        it('rejects invalid alphabetic characters and punctuation', () => {
            expect(isObjectId(objectId('64b00000000000000000000g'))).toBe(false)
            expect(isObjectId(objectId('64b00000000000000000000Z'))).toBe(false)
            expect(isObjectId(objectId('64b00000000000000000000_'))).toBe(false)
            expect(isObjectId(objectId('64b00000000000000000000-'))).toBe(false)
            expect(isObjectId(objectId('64b00000000000000000000/'))).toBe(false)
            expect(isObjectId(objectId('64b00000000000000000000\\'))).toBe(false)
        })
    })

    describe('standard object families (default toString is never 24-hex)', () => {
        it.each([
            ['empty object', {}],
            ['Date', new Date()],
            ['invalid Date', new Date('invalid')],
            ['RegExp', /abc/],
            ['Error', new Error('boom')],
            ['Map', new Map()],
            ['Set', new Set()],
        ])('returns false for a %s', (_label, value) => {
            expect(isObjectId(value)).toBe(false)
        })

        it('returns true for a String wrapper object whose value is a valid ObjectId', () => {
            expect(isObjectId(new String(HEX))).toBe(true)
        })

        it('returns false for Number and Boolean wrapper objects', () => {
            expect(isObjectId(new Number(42))).toBe(false)
            expect(isObjectId(new Number(NaN))).toBe(false)
            expect(isObjectId(new Boolean(true))).toBe(false)
        })

        it('returns false for an invalid String wrapper object', () => {
            expect(isObjectId(new String('not-an-id'))).toBe(false)
            expect(isObjectId(new String(''))).toBe(false)
        })
    })

    describe('custom toString() / coercion', () => {
        it('returns true for an object with an own custom toString() returning a valid ObjectId', () => {
            expect(isObjectId(objectId(HEX))).toBe(true)
        })

        it('returns true for an object inheriting a custom toString() returning a valid ObjectId', () => {
            const proto = Object.create({ toString: () => HEX }) as { toString(): string }
            expect(isObjectId(proto)).toBe(true)
        })

        it('returns false for an object whose custom toString() is invalid', () => {
            expect(isObjectId({ toString: () => 'not-an-id' })).toBe(false)
        })

        it('coerces toString() returning a non-string via String()', () => {
            expect(isObjectId({ toString: () => 42 })).toBe(false)
        })

        it('coerces a null-prototype object via String()', () => {
            const nullProto = Object.create(null) as { toString(): string }
            nullProto.toString = () => HEX
            expect(isObjectId(nullProto)).toBe(true)
        })
    })

    describe('Symbol.toPrimitive precedence', () => {
        it('honours Symbol.toPrimitive over toString()', () => {
            const withToPrimitive = {
                toString: () => 'not-an-id',
                [Symbol.toPrimitive]: () => HEX,
            }
            expect(isObjectId(withToPrimitive)).toBe(true)
        })

        it('rejects when Symbol.toPrimitive returns an invalid string', () => {
            const withToPrimitive = {
                toString: () => HEX,
                [Symbol.toPrimitive]: () => 'bad',
            }
            expect(isObjectId(withToPrimitive)).toBe(false)
        })
    })

    describe('exceptions', () => {
        it('propagates a throwing toString()', () => {
            const throwing = {
                toString: () => {
                    throw new Error('boom')
                },
            }
            expect(() => isObjectId(throwing)).toThrow('boom')
        })

        it('propagates a throwing Symbol.toPrimitive', () => {
            const throwing = {
                [Symbol.toPrimitive]: () => {
                    throw new Error('boom')
                },
            }
            expect(() => isObjectId(throwing)).toThrow('boom')
        })
    })

    describe('core value use: the real mongoose ObjectId shape', () => {
        it('returns true for an object mirroring mongoose ObjectId.toString()', () => {
            const fakeMongooseId = { toString: () => '64b000000000000000000000' }
            expect(isObjectId(fakeMongooseId)).toBe(true)
        })
    })
})

describe('isValidObjectId', () => {
    /** Valid 24-char lowercase hex ObjectId string. */
    const HEX = '64b000000000000000000000'

    it('returns true for exactly 24 lowercase hex characters', () => {
        expect(isValidObjectId(HEX)).toBe(true)
        expect(isValidObjectId('000000000000000000000000')).toBe(true)
        expect(isValidObjectId('ffffffffffffffffffffffff')).toBe(true)
    })

    it('rejects exactly 24 uppercase hex characters (lowercase-only)', () => {
        expect(isValidObjectId('64B000000000000000000000')).toBe(false)
        expect(isValidObjectId('FFFFFFFFFFFFFFFFFFFFFFFF')).toBe(false)
        expect(isValidObjectId('64b0000000000000000000A0')).toBe(false)
    })

    describe('non-string values', () => {
        it.each([
            ['undefined', undefined],
            ['null', null],
            ['number', 42],
            ['boolean', true],
            ['object', {}],
            ['array', [HEX]],
            ['ObjectId-like object', { toString: () => HEX }],
            ['String wrapper', new String(HEX)],
        ])('returns false for a %s', (_label, value) => {
            expect(isValidObjectId(value)).toBe(false)
        })
    })

    describe('invalid string representations', () => {
        it.each([
            ['empty', ''],
            ['shorter than 24', '64b00000000000000000000'],
            ['longer than 24', `${HEX}0`],
            ['non-hex char', '64b00000000000000000000g'],
            ['leading whitespace', ` ${HEX}`],
            ['trailing whitespace', `${HEX} `],
            ['embedded whitespace', '64b0000000000000000 00000'],
            ['0x prefix', `0x${HEX}`],
            ['uuid-shaped', '64b00000-0000-4000-8000-000000000000'],
        ])('returns false when %s', (_label, value) => {
            expect(isValidObjectId(value)).toBe(false)
        })
    })
})

describe('isPlainObject', () => {
    it('returns true for literal objects', () => {
        expect(isPlainObject({})).toBe(true)
        expect(isPlainObject({ a: 1 })).toBe(true)
    })

    it('returns true for Object.create(null)', () => {
        expect(isPlainObject(Object.create(null))).toBe(true)
    })

    it('returns false for class instances', () => {
        expect(isPlainObject(new Date())).toBe(false)
        expect(isPlainObject(/regex/)).toBe(false)
    })

    it('returns false for arrays', () => {
        expect(isPlainObject([])).toBe(false)
    })

    it('returns false for null', () => {
        expect(isPlainObject(null)).toBe(false)
    })
})

describe('hasLength', () => {
    it('returns true for non-empty arrays', () => {
        expect(hasLength([1, 2, 3])).toBe(true)
    })

    it('returns false for empty arrays', () => {
        expect(hasLength([])).toBe(false)
    })

    it('returns true for non-empty strings', () => {
        expect(hasLength('hello')).toBe(true)
    })

    it('returns false for empty strings', () => {
        expect(hasLength('')).toBe(false)
    })

    it('returns false for null', () => {
        expect(hasLength(null)).toBe(false)
    })

    it('returns false for undefined', () => {
        expect(hasLength(undefined)).toBe(false)
    })
})

describe('isEmpty', () => {
    it('returns true for empty arrays', () => {
        expect(isEmpty([])).toBe(true)
    })

    it('returns false for non-empty arrays', () => {
        expect(isEmpty([1])).toBe(false)
    })

    it('returns true for empty strings', () => {
        expect(isEmpty('')).toBe(true)
    })

    it('returns false for non-empty strings', () => {
        expect(isEmpty('hello')).toBe(false)
    })

    it('returns true for empty objects', () => {
        expect(isEmpty({})).toBe(true)
    })

    it('returns false for non-empty objects', () => {
        expect(isEmpty({ a: 1 })).toBe(false)
    })

    it('returns true for null', () => {
        expect(isEmpty(null)).toBe(true)
    })

    it('returns true for undefined', () => {
        expect(isEmpty(undefined)).toBe(true)
    })

    it('returns true for empty Sets and Maps', () => {
        expect(isEmpty(new Set())).toBe(true)
        expect(isEmpty(new Map())).toBe(true)
    })

    it('returns false for non-empty Sets and Maps', () => {
        const set = new Set([1])
        const map = new Map([['key', 'value']])
        expect(isEmpty(set)).toBe(false)
        expect(isEmpty(map)).toBe(false)
    })
})

describe('isNonEmpty', () => {
    it('is the inverse of isEmpty for arrays', () => {
        expect(isNonEmpty([])).toBe(false)
        expect(isNonEmpty([1])).toBe(true)
    })

    it('is the inverse of isEmpty for strings', () => {
        expect(isNonEmpty('')).toBe(false)
        expect(isNonEmpty('hello')).toBe(true)
    })

    it('is the inverse of isEmpty for objects', () => {
        expect(isNonEmpty({})).toBe(false)
        expect(isNonEmpty({ a: 1 })).toBe(true)
    })

    it('returns false for null', () => {
        expect(isNonEmpty(null)).toBe(false)
    })

    it('returns false for undefined', () => {
        expect(isNonEmpty(undefined)).toBe(false)
    })
})

describe('isNested', () => {
    it('returns true for arrays with nested arrays', () => {
        expect(isNested([1, [2]])).toBe(true)
    })

    it('returns true for arrays with nested objects', () => {
        expect(isNested([1, { a: 2 }])).toBe(true)
    })

    it('returns false for flat arrays', () => {
        expect(isNested([1, 2, 3])).toBe(false)
    })

    it('returns true for objects with nested objects', () => {
        expect(isNested({ a: { b: 1 } })).toBe(true)
    })

    it('returns true for objects with nested arrays', () => {
        expect(isNested({ a: [1] })).toBe(true)
    })

    it('returns false for flat objects', () => {
        expect(isNested({ a: 1, b: 2 })).toBe(false)
    })

    it('returns false for empty collections', () => {
        expect(isNested([])).toBe(false)
        expect(isNested({})).toBe(false)
    })
})

describe('hasProperty', () => {
    it('returns true when object has the property', () => {
        expect(hasProperty({ name: 'Alice' }, 'name')).toBe(true)
    })

    it('returns false when object lacks the property', () => {
        expect(hasProperty({ name: 'Alice' }, 'age')).toBe(false)
    })

    it('returns false for null', () => {
        expect(hasProperty(null, 'key')).toBe(false)
    })

    it('returns false for primitives', () => {
        expect(hasProperty('string', 'length')).toBe(false)
        expect(hasProperty(42, 'toString')).toBe(false)
    })

    it('does not match inherited properties', () => {
        const obj: Record<string, unknown> = Object.create({ inherited: true }) as Record<
            string,
            unknown
        >
        expect(hasProperty(obj, 'inherited')).toBe(false)
    })

    it('matches own properties on prototype-less objects', () => {
        const obj = Object.create(null) as Record<string, unknown>
        obj.key = 'value'
        expect(hasProperty(obj, 'key')).toBe(true)
    })
})

describe('hasValue', () => {
    it('finds values in arrays', () => {
        expect(hasValue([1, 2, 3], 2)).toBe(true)
        expect(hasValue([1, 2, 3], 4)).toBe(false)
    })

    it('finds values in objects', () => {
        expect(hasValue({ a: 1, b: 2 }, 2)).toBe(true)
        expect(hasValue({ a: 1, b: 2 }, 3)).toBe(false)
    })

    it('finds values in Sets', () => {
        expect(hasValue(new Set([1, 2, 3]), 2)).toBe(true)
        expect(hasValue(new Set([1, 2, 3]), 4)).toBe(false)
    })

    it('finds values in Maps', () => {
        const map = new Map<string, number>([
            ['a', 1],
            ['b', 2],
        ])
        expect(hasValue(map, 1)).toBe(true)
        expect(hasValue(map, 3)).toBe(false)
    })
})

describe('isOneOf', () => {
    const statuses = ['active', 'inactive'] as const

    it('returns true when value is in the options', () => {
        expect(isOneOf('active', statuses)).toBe(true)
        expect(isOneOf('inactive', statuses)).toBe(true)
    })

    it('returns false when value is not in the options', () => {
        expect(isOneOf('deleted', statuses)).toBe(false)
    })

    it('works with number arrays', () => {
        expect(isOneOf(1, [1, 2, 3])).toBe(true)
        expect(isOneOf(4, [1, 2, 3])).toBe(false)
    })
})

describe('isShallowEqual', () => {
    it('returns true for identical primitives', () => {
        expect(isShallowEqual(1, 1)).toBe(true)
        expect(isShallowEqual('a', 'a')).toBe(true)
        expect(isShallowEqual(true, true)).toBe(true)
        expect(isShallowEqual(null, null)).toBe(true)
        expect(isShallowEqual(undefined, undefined)).toBe(true)
    })

    it('returns false for different primitives', () => {
        expect(isShallowEqual(1, 2)).toBe(false)
        expect(isShallowEqual('a', 'b')).toBe(false)
    })

    it('returns true for arrays with same elements', () => {
        expect(isShallowEqual([1, 2], [1, 2])).toBe(true)
    })

    it('returns false for arrays with different elements', () => {
        expect(isShallowEqual([1, 2], [1, 3])).toBe(false)
    })

    it('returns false for arrays with different lengths', () => {
        expect(isShallowEqual([1, 2], [1, 2, 3])).toBe(false)
    })

    it('returns true for objects with same key-value pairs', () => {
        expect(isShallowEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true)
    })

    it('returns false for objects with different values', () => {
        expect(isShallowEqual({ a: 1 }, { a: 2 })).toBe(false)
    })

    it('does NOT deeply compare nested objects', () => {
        expect(isShallowEqual({ a: { b: 1 } }, { a: { b: 1 } })).toBe(false)
    })

    it('returns false for different types', () => {
        expect(isShallowEqual(1, '1')).toBe(false)
        expect(isShallowEqual(null, undefined)).toBe(false)
    })
})

describe('isEqual', () => {
    it('returns true for identical primitives', () => {
        expect(isEqual(1, 1)).toBe(true)
        expect(isEqual('a', 'a')).toBe(true)
        expect(isEqual(null, null)).toBe(true)
    })

    it('returns true for deeply equal arrays', () => {
        expect(isEqual([1, [2, 3]], [1, [2, 3]])).toBe(true)
    })

    it('returns false for deeply unequal arrays', () => {
        expect(isEqual([1, [2, 3]], [1, [2, 4]])).toBe(false)
    })

    it('returns true for deeply equal objects', () => {
        expect(isEqual({ a: { b: 1 } }, { a: { b: 1 } })).toBe(true)
    })

    it('returns false for deeply unequal objects', () => {
        expect(isEqual({ a: { b: 1 } }, { a: { b: 2 } })).toBe(false)
    })

    it('handles mixed nested structures', () => {
        expect(isEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] })).toBe(true)
        expect(isEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 3 }] })).toBe(false)
    })

    it('returns false for different types', () => {
        expect(isEqual(1, '1')).toBe(false)
    })

    it('returns false when one is null', () => {
        expect(isEqual(null, {})).toBe(false)
        expect(isEqual({}, null)).toBe(false)
    })

    it('returns false for objects with different key counts', () => {
        expect(isEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false)
    })
})

describe('isUnique', () => {
    it('returns true for arrays with unique elements', () => {
        expect(isUnique([1, 2, 3])).toBe(true)
        expect(isUnique(['a', 'b', 'c'])).toBe(true)
    })

    it('returns false for arrays with duplicates', () => {
        expect(isUnique([1, 2, 1])).toBe(false)
        expect(isUnique(['a', 'a'])).toBe(false)
    })

    it('returns true for empty arrays', () => {
        expect(isUnique([])).toBe(true)
    })

    it('returns true for single-element arrays', () => {
        expect(isUnique([1])).toBe(true)
    })
})

describe('isInstanceOf', () => {
    it('returns true for matching instances', () => {
        expect(isInstanceOf(new Date(), Date)).toBe(true)
        expect(isInstanceOf(new TypeError(), Error)).toBe(true)
        expect(isInstanceOf(new TypeError(), TypeError)).toBe(true)
    })

    it('returns false for non-matching instances', () => {
        expect(isInstanceOf('hello', Date as never)).toBe(false)
        expect(isInstanceOf(42, Date as never)).toBe(false)
    })

    it('returns false for plain objects', () => {
        expect(isInstanceOf({}, Date as never)).toBe(false)
    })
})

describe('isDate', () => {
    it('returns true for valid dates', () => {
        expect(isDate(new Date())).toBe(true)
        expect(isDate(new Date('2024-01-01'))).toBe(true)
    })

    it('returns false for invalid dates', () => {
        expect(isDate(new Date('invalid'))).toBe(false)
    })

    it('returns false for non-Date values', () => {
        expect(isDate('2024-01-01')).toBe(false)
        expect(isDate(1234567890)).toBe(false)
        expect(isDate(null)).toBe(false)
    })
})

describe('isError', () => {
    it('returns true for Error instances', () => {
        expect(isError(new Error('oops'))).toBe(true)
        expect(isError(new TypeError('bad'))).toBe(true)
        expect(isError(new RangeError('out'))).toBe(true)
    })

    it('returns false for error-like objects', () => {
        expect(isError({ message: 'fake' })).toBe(false)
    })

    it('returns false for non-errors', () => {
        expect(isError('error')).toBe(false)
        expect(isError(null)).toBe(false)
    })
})

describe('isRegExp', () => {
    it('returns true for regex literals', () => {
        expect(isRegExp(/abc/)).toBe(true)
    })

    it('returns true for RegExp constructor', () => {
        expect(isRegExp(new RegExp('a'))).toBe(true)
    })

    it('returns false for strings', () => {
        expect(isRegExp('abc')).toBe(false)
    })

    it('returns false for other values', () => {
        expect(isRegExp(null)).toBe(false)
        expect(isRegExp({})).toBe(false)
    })
})

describe('isPromise', () => {
    it('returns true for native Promises', () => {
        expect(isPromise(Promise.resolve(1))).toBe(true)
        expect(isPromise(new Promise(noop))).toBe(true)
    })

    it('returns false for thenables that are not Promises', () => {
        expect(isPromise({ then: noop })).toBe(false)
    })

    it('returns false for non-promises', () => {
        expect(isPromise(42)).toBe(false)
        expect(isPromise(null)).toBe(false)
        expect(isPromise({})).toBe(false)
    })
})

describe('isThenable', () => {
    it('returns true for Promises', () => {
        expect(isThenable(Promise.resolve(1))).toBe(true)
    })

    it('returns true for custom thenables', () => {
        expect(isThenable({ then: noop })).toBe(true)
    })

    it('returns false when then is not a function', () => {
        expect(isThenable({ then: 'not a function' })).toBe(false)
    })

    it('returns false for non-objects', () => {
        expect(isThenable(42)).toBe(false)
        expect(isThenable('hello')).toBe(false)
        expect(isThenable(null)).toBe(false)
    })
})

describe('isAll', () => {
    const allStrings = isAll(isString)

    it('returns true when all elements match', () => {
        expect(allStrings(['a', 'b', 'c'])).toBe(true)
    })

    it('returns false when any element does not match', () => {
        expect(allStrings(['a', 1 as unknown, 'c'])).toBe(false)
    })

    it('returns true for empty arrays', () => {
        expect(allStrings([])).toBe(true)
    })
})

describe('isAny', () => {
    const anyNumber = isAny(isNumber)

    it('returns true when at least one element matches', () => {
        expect(anyNumber([1, 'a'])).toBe(true)
    })

    it('returns false when no elements match', () => {
        expect(anyNumber(['a', 'b'])).toBe(false)
    })

    it('returns false for empty arrays', () => {
        expect(anyNumber([])).toBe(false)
    })
})

describe('includesAll', () => {
    it('returns true when every required element is present', () => {
        expect(includesAll(['a', 'b'], ['a', 'b', 'c'])).toBe(true)
    })

    it('returns false when a required element is missing', () => {
        expect(includesAll(['a', 'd'], ['a', 'b', 'c'])).toBe(false)
    })

    it('returns true for an empty required list (empty is a subset of everything)', () => {
        expect(includesAll([], ['a', 'b'])).toBe(true)
        expect(includesAll([], [])).toBe(true)
    })

    it('returns true when both lists are empty', () => {
        expect(includesAll([], [])).toBe(true)
    })

    it('returns false when available is empty but required is not', () => {
        expect(includesAll(['a'], [])).toBe(false)
    })

    it('handles duplicate required values against a single available value', () => {
        expect(includesAll(['a', 'a'], ['a', 'b'])).toBe(true)
    })

    it('handles numbers', () => {
        expect(includesAll([1, 2], [1, 2, 3])).toBe(true)
        expect(includesAll([1, 4], [1, 2, 3])).toBe(false)
    })

    it('handles objects by reference identity', () => {
        const shared = { id: 1 }
        const other = { id: 2 }
        expect(includesAll([shared], [shared, other])).toBe(true)
        expect(includesAll([{ id: 1 }], [shared, other])).toBe(false)
    })
})
