import { ruleTester } from '../../config'
import {
    LengthMessage,
    NullishMessage,
    TypeofMessage,
} from '../PredicateCase.constants'
import { Rules } from '../PredicateCase.rules'

ruleTester.run('predicate-case', Rules.Eslint.PredicateCase9, {
    valid: [
        {
            name: 'should accept a bound rather than a presence check',
            code: 'const long = word.length > 3',
        },
        {
            name: 'should accept a length read outside a comparison',
            code: 'const size = words.length',
        },
        {
            name: 'should accept a typeof result no guard names',
            code: "const object = typeof value === 'object'",
        },
        {
            name: 'should accept a comparison against zero',
            code: 'const none = count === 0',
        },
        {
            name: 'should accept a predicate call',
            code: 'const filled = isNonEmpty(words)',
        },
        {
            name: 'should accept a comparison between two names',
            code: 'const same = value === other',
        },
        {
            name: 'should accept a computed length key, which reads a field by name',
            code: "const filled = value['length'] > 0",
        },
        {
            name: 'should accept a size that is no length',
            code: 'const filled = value.size > 0',
        },
        {
            name: 'should accept a string that spells a null',
            code: "const literal = value === 'null'",
        },
        {
            name: 'should accept a typeof compared against a name',
            code: 'const matched = typeof value === expected',
        },
        {
            name: 'should accept a typeof result no guard names — a symbol',
            code: "const symbol = typeof value === 'symbol'",
        },
        {
            name: 'should accept a typeof result no guard names — undefined',
            code: "const missing = typeof value === 'undefined'",
        },
        {
            name: 'should accept a NaN comparison, which no guard names',
            code: 'const nan = value === NaN',
        },
        {
            name: 'should accept a floor of zero, which asks nothing',
            code: 'const any = words.length >= 0',
        },
    ],
    invalid: [
        {
            name: 'should throw for a length above zero',
            code: 'const filled = words.length > 0',
            errors: [{ message: LengthMessage }],
        },
        {
            name: 'should throw for a length of at least one',
            code: 'const filled = words.length >= 1',
            errors: [{ message: LengthMessage }],
        },
        {
            name: 'should throw for a length of zero',
            code: 'const empty = words.length === 0',
            errors: [{ message: LengthMessage }],
        },
        {
            name: 'should throw for a length under one',
            code: 'const empty = words.length < 1',
            errors: [{ message: LengthMessage }],
        },
        {
            name: 'should throw when the literal comes first',
            code: 'const filled = 0 < words.length',
            errors: [{ message: LengthMessage }],
        },
        {
            name: 'should throw for a typeof string',
            code: "const text = typeof value === 'string'",
            errors: [{ message: TypeofMessage }],
        },
        {
            name: 'should throw for a typeof number',
            code: "const numeric = typeof value === 'number'",
            errors: [{ message: TypeofMessage }],
        },
        {
            name: 'should throw for a typeof function',
            code: "const callable = typeof value === 'function'",
            errors: [{ message: TypeofMessage }],
        },
        {
            name: 'should throw for a null comparison',
            code: 'const absent = value === null',
            errors: [{ message: NullishMessage }],
        },
        {
            name: 'should throw for an undefined comparison',
            code: 'const absent = value !== undefined',
            errors: [{ message: NullishMessage }],
        },
        {
            name: 'should throw for a loose null comparison',
            code: 'const absent = value == null',
            errors: [{ message: NullishMessage }],
        },
        {
            name: 'should throw when the count is compared from its literal',
            code: 'const empty = 1 > words.length',
            errors: [{ message: LengthMessage }],
        },
        {
            name: 'should throw for a typeof read on the right',
            code: "const text = 'string' === typeof value",
            errors: [{ message: TypeofMessage }],
        },
        {
            name: 'should throw for a typeof boolean',
            code: "const flag = typeof value !== 'boolean'",
            errors: [{ message: TypeofMessage }],
        },
        {
            name: 'should throw when null is compared from the left',
            code: 'const absent = null === value',
            errors: [{ message: NullishMessage }],
        },
        {
            name: 'should throw for an undefined compared from the left',
            code: 'const absent = undefined === value',
            errors: [{ message: NullishMessage }],
        },
        {
            name: 'should throw for a loose undefined comparison',
            code: 'const absent = value != null',
            errors: [{ message: NullishMessage }],
        },
        {
            name: 'should throw once per comparison',
            code: 'const both = value === null && words.length > 0',
            errors: [{ message: NullishMessage }, { message: LengthMessage }],
        },
        {
            name: 'should throw when the count of one is compared from its literal',
            code: 'const filled = 1 <= words.length',
            errors: [{ message: LengthMessage }],
        },
        {
            name: 'should throw when a zero count is compared from its literal',
            code: 'const empty = 0 === words.length',
            errors: [{ message: LengthMessage }],
        },
        {
            name: 'should throw for a loose typeof comparison',
            code: "const text = typeof value == 'string'",
            errors: [{ message: TypeofMessage }],
        },
        {
            name: 'should throw for a null comparison that negates',
            code: 'const present = value !== null',
            errors: [{ message: NullishMessage }],
        },
        {
            name: 'should throw for an undefined comparison that asserts',
            code: 'const missing = value === undefined',
            errors: [{ message: NullishMessage }],
        },
        {
            name: 'should throw when a loose null is compared from the left',
            code: 'const absent = null != value',
            errors: [{ message: NullishMessage }],
        },
    ],
})
