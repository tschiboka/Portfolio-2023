import {
    ArrayMessage,
    InstanceMessage,
    LengthMessage,
    NullishMessage,
    TruthyMessage,
    TypeofMessage,
} from '../PredicateCase.constants'
import { Rules } from '../PredicateCase.rules'
import { ruleTester } from '../../config'

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
            name: 'should accept a NaN comparison, which no guard names',
            code: 'const nan = value === NaN',
        },
        {
            name: 'should accept a floor of zero, which asks nothing',
            code: 'const any = words.length >= 0',
        },
        {
            name: 'should accept Boolean as a reference rather than a call',
            code: 'const guard = Boolean',
        },
        {
            name: 'should accept Array.isArray as a reference rather than a call',
            code: 'const checker = Array.isArray',
        },
        {
            name: 'should accept a typeof result no guard names — a bigint',
            code: "const wide = typeof value === 'bigint'",
        },
        {
            name: 'should accept a plain negation',
            code: 'const empty = !items',
        },
        {
            name: 'should accept an optional read that is no length',
            code: 'const label = value?.name',
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
        {
            name: 'should throw for an object typeof comparison',
            code: "const record = typeof value === 'object'",
            errors: [{ message: TypeofMessage }],
        },
        {
            name: 'should throw for an undefined typeof comparison',
            code: "const missing = typeof value === 'undefined'",
            errors: [{ message: TypeofMessage }],
        },
        {
            name: 'should throw for an instance check',
            code: 'const when = value instanceof Date',
            errors: [{ message: InstanceMessage }],
        },
        {
            name: 'should throw for an array check',
            code: 'const list = Array.isArray(value)',
            errors: [{ message: ArrayMessage }],
        },
        {
            name: 'should throw for a Boolean cast',
            code: 'const flag = Boolean(value)',
            errors: [{ message: TruthyMessage }],
        },
        {
            name: 'should throw once per shape in a joined expression',
            code: 'const both = Boolean(value) && value instanceof Date',
            errors: [{ message: TruthyMessage }, { message: InstanceMessage }],
        },
        {
            name: 'should throw for a computed array check',
            code: "const list = Array['isArray'](value)",
            errors: [{ message: ArrayMessage }],
        },
        {
            name: 'should throw for a negated length',
            code: 'const empty = !items.length',
            errors: [{ message: LengthMessage }],
        },
        {
            name: 'should throw for a Boolean construction',
            code: 'const flag = new Boolean(value)',
            errors: [{ message: TruthyMessage }],
        },
        {
            name: 'should throw for an optional length',
            code: 'const filled = items?.length > 0',
            errors: [{ message: LengthMessage }],
        },
        {
            name: 'should throw for a void zero comparison',
            code: 'const missing = value === void 0',
            errors: [{ message: NullishMessage }],
        },
    ],
})
