import {
    isDefined,
    isUndefined,
    isNull,
    isTruthy,
    isFalsy,
    isBoolean,
    isNumber,
    isString,
    isPrimitive,
    isFunction,
    isFiniteNumber,
    isArray,
    isObject,
    isPlainObject,
    hasLength,
    isEmpty,
    isNonEmpty,
    isNested,
    hasProperty,
    hasValue,
    isOneOf,
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

// ── Nullish & Existence ──────────────────────────────────────────────────────

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
        const items: (string | null | undefined)[] = ['a', null, 'b', undefined]
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

// ── Truthiness ───────────────────────────────────────────────────────────────

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

// ── Primitive Type Guards ────────────────────────────────────────────────────

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

// ── Structural Type Guards ───────────────────────────────────────────────────

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

// ── Collection Checks ────────────────────────────────────────────────────────

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

// ── Property Checks ─────────────────────────────────────────────────────────

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

// ── Membership ───────────────────────────────────────────────────────────────

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

// ── Equality & Uniqueness ────────────────────────────────────────────────────

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

// ── Instance Check ───────────────────────────────────────────────────────────

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

// ── Built-in Type Guards ─────────────────────────────────────────────────────

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

// ── Predicate Combinators ────────────────────────────────────────────────────

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
