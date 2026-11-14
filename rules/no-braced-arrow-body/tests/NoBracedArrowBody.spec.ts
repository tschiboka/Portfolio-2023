import { ErrorMessage } from '../NoBracedArrowBody.constants'
import { Rules } from '../NoBracedArrowBody.rules'
import { ruleTester, typescriptRuleTester } from '../../config'

ruleTester.run('no-braced-arrow-body', Rules.Eslint.NoBracedArrowBody9, {
    valid: [
        {
            name: 'should accept a body that already stands as an expression',
            code: 'const track = () => log()',
        },
        {
            name: 'should accept a body of two statements',
            code: 'const track = () => { log(); return 1 }',
        },
        {
            name: 'should accept a lone return, which arrow-body-style owns',
            code: 'const track = () => { return log() }',
        },
        {
            name: 'should accept a lone throw',
            code: 'const track = () => { throw new Error() }',
        },
        {
            name: 'should accept a lone declaration',
            code: 'const track = () => { const id = 1 }',
        },
        {
            name: 'should accept an empty body',
            code: 'const track = () => {}',
        },
        {
            name: 'should accept a lone directive',
            code: "const track = () => { 'use strict' }",
        },
        {
            name: 'should accept a function expression, whose braces are its syntax',
            code: 'const track = function () { log() }',
        },
    ],
    invalid: [
        {
            name: 'should throw for a lone call',
            code: 'const track = () => { log() }',
            output: 'const track = () => log()',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a lone call inside a callback',
            code: 'waitFor(() => { expect(fetch).toHaveBeenCalled() })',
            output: 'waitFor(() => expect(fetch).toHaveBeenCalled())',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a lone assignment',
            code: 'const select = (id) => { current = id }',
            output: 'const select = (id) => current = id',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a lone chain',
            code: 'const track = () => { list.forEach(log) }',
            output: 'const track = () => list.forEach(log)',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a lone await',
            code: 'const track = async () => { await reset() }',
            output: 'const track = async () => await reset()',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw without a fix when a comment leads the statement',
            code: 'const track = () => { /* why */ log() }',
            output: null,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw without a fix when a comment trails the statement',
            code: 'const track = () => { log() // why\n}',
            output: null,
            errors: [{ message: ErrorMessage }],
        },
    ],
})

typescriptRuleTester.run('no-braced-arrow-body with types', Rules.Eslint.NoBracedArrowBody9, {
    valid: [],
    invalid: [
        {
            name: 'should throw for a lone call under an annotation',
            code: 'const compute = (): number => { calculate() }',
            output: 'const compute = (): number => calculate()',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw without a fix when the arrow declares void',
            code: 'const track = (): void => { log() }',
            output: null,
            errors: [{ message: ErrorMessage }],
        },
    ],
})
