import { ruleTester } from '../../config'
import { AliasErrorMessage, ErrorMessage } from '../TestNameVerb.constants'
import { Rules } from '../TestNameVerb.rules'

ruleTester.run('test-name-verb', Rules.Eslint.TestNameVerb9, {
    valid: [
        {
            name: 'should accept a test that opens with should',
            code: "it('should render the title', () => {})",
        },
        {
            name: 'should accept an it.each row whose template opens with should',
            code: "it.each([1, 2])('should double %i', () => {})",
        },
        {
            name: 'should accept a template that carries the opening before a placeholder',
            code: 'it.each([1, 2])(`should return ${count}`, () => {})',
        },
        {
            name: 'should accept a bare template that opens with should',
            code: 'it(`should render the title`, () => {})',
        },
        {
            name: 'should accept a name held in a binding, which cannot be read',
            code: 'it(testName, () => {})',
        },
        {
            name: 'should accept an it.each row whose name is held in a binding',
            code: 'it.each([1, 2])(testName, () => {})',
        },
        {
            name: 'should ignore a call that does not open a test',
            code: "describe('Blog', () => {})",
        },
        {
            name: 'should ignore a describe.each row, which names a suite and not a test',
            code: "describe.each([1, 2])('%s', () => {})",
        },
        {
            name: 'should ignore another function named like a matcher',
            code: "expect('should render').toBeDefined()",
        },
        {
            name: 'should check only the test inside a describe',
            code: "describe('Blog', () => { it('should render the title', () => {}) })",
        },
    ],
    invalid: [
        {
            name: 'should throw for a test that states its behaviour without should',
            code: "it('renders the title', () => {})",
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for the test alias even when its name is correct',
            code: "test('should render the title', () => {})",
            errors: [{ message: AliasErrorMessage }],
        },
        {
            name: 'should throw for the test alias on an each row',
            code: "test.each([1, 2])('should double %i', () => {})",
            errors: [{ message: AliasErrorMessage }],
        },
        {
            name: 'should throw for a test alias that also omits the opening',
            code: "test('renders the title', () => {})",
            errors: [{ message: AliasErrorMessage }],
        },
        {
            name: 'should throw for an it.each row that omits the opening',
            code: "it.each([1, 2])('doubles %i', () => {})",
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a template that omits the opening',
            code: 'it.each([1, 2])(`returns ${count}`, () => {})',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a missing space after should',
            code: "it('shouldrender the title', () => {})",
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a capitalised opening',
            code: "it('Should render the title', () => {})",
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for an empty name',
            code: "it('', () => {})",
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a test nested inside a describe',
            code: "describe('Blog', () => { it('renders the title', () => {}) })",
            errors: [{ message: ErrorMessage }],
        },
    ],
})
