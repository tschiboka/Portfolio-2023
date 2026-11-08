import { ruleTester } from '../../config'
import {
    BoundMessage,
    ComparisonMessage,
    PatternMessage,
} from '../NoInlineValidationLiteral.constants'
import { Rules } from '../NoInlineValidationLiteral.rules'

ruleTester.run('no-inline-validation-literal', Rules.Eslint.NoInlineValidationLiteral9, {
    valid: [
        {
            name: 'should accept a bound that asserts presence',
            code: 'yup.string().min(1)',
        },
        {
            name: 'should accept a floor of zero, which is a first index',
            code: 'Joi.number().integer().min(0)',
        },
        {
            name: 'should accept a bound that names its constant',
            code: 'yup.string().min(PasswordConstants.minCharacters)',
        },
        {
            name: 'should accept a ceiling that names its constant',
            code: 'yup.array().max(WordConstants.maxWordsPerLevel)',
        },
        {
            name: 'should accept a pattern that names itself',
            code: 'yup.string().matches(Regexp.Alphanumeric)',
        },
        {
            name: 'should accept a comparison against a constant',
            code: "yup.string().test('phone', message, (value) => value.length >= minDigits)",
        },
        {
            name: 'should ignore a comparison outside a test callback',
            code: 'const isLong = (value) => value.length >= 10',
        },
        {
            name: 'should ignore an equality check, which is no bound',
            code: "yup.string().test('phone', message, (value) => value.length === 0)",
        },
        {
            name: 'should ignore a computed method name it cannot read',
            code: 'yup.string()[name](8)',
        },
    ],
    invalid: [
        {
            name: 'should throw for a floor written out',
            code: 'yup.string().min(8)',
            errors: [{ message: BoundMessage }],
        },
        {
            name: 'should throw for a ceiling written out',
            code: 'yup.string().max(255)',
            errors: [{ message: BoundMessage }],
        },
        {
            name: 'should throw for an exact length written out',
            code: 'yup.string().length(10)',
            errors: [{ message: BoundMessage }],
        },
        {
            name: 'should throw for a ceiling of one, which is no presence check',
            code: 'yup.string().max(1)',
            errors: [{ message: BoundMessage }],
        },
        {
            name: 'should throw for a pattern written out',
            code: 'yup.string().matches(/^[0-9]+$/)',
            errors: [{ message: PatternMessage }],
        },
        {
            name: 'should throw for a comparison against a written floor',
            code: "yup.string().test('phone', message, (value) => value.length >= 10)",
            errors: [{ message: ComparisonMessage }],
        },
        {
            name: 'should throw for a comparison against a written ceiling',
            code: "yup.string().test('phone', message, (value) => value.length <= 16)",
            errors: [{ message: ComparisonMessage }],
        },
        {
            name: 'should throw once per bound written out',
            code: 'yup.string().min(8).max(40)',
            errors: [{ message: BoundMessage }, { message: BoundMessage }],
        },
    ],
})
