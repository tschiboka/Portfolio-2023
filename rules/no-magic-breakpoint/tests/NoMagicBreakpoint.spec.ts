import { ruleTester } from '../../config'
import { ErrorMessage } from '../NoMagicBreakpoint.constants'
import { Rules } from '../NoMagicBreakpoint.rules'

ruleTester.run('no-magic-breakpoint', Rules.Eslint.NoMagicBreakpoint9, {
    valid: [
        {
            name: 'should accept a min width naming a token',
            code: '({ "@media": "(min-width: 768px)" });',
        },
        {
            name: 'should accept a max width naming the token less one',
            code: '({ "@media": "(max-width: 767px)" });',
        },
        {
            name: 'should accept a query that names a screen',
            code: '({ "@media": "screen and (min-width: 992px)" });',
        },
        {
            name: 'should accept a range bounded by two tokens',
            code: '({ "@media": "(min-width: 768px) and (max-width: 1199px)" });',
        },
        {
            name: 'should accept the smallest token',
            code: '({ "@media": "(min-width: 375px)" });',
        },
        {
            name: 'should accept a query that states no width',
            code: '({ "@media": "print" });',
        },
        {
            name: 'should ignore a property that is not a media query',
            code: '({ "color": "red" });',
        },
        {
            name: 'should ignore an identifier key',
            code: 'const styles = { media: "(min-width: 800px)" }',
        },
    ],
    invalid: [
        {
            name: 'should throw for a min width between two tokens',
            code: '({ "@media": "(min-width: 800px)" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a max width naming the token rather than one less',
            code: '({ "@media": "(max-width: 768px)" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for the width the ticket names first',
            code: '({ "@media": "(min-width: 1024px)" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for the width the ticket names second',
            code: '({ "@media": "(max-width: 168px)" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw when only one bound of a range is a token',
            code: '({ "@media": "(min-width: 768px) and (max-width: 1200px)" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a token width read as a max bound',
            code: '({ "@media": "screen and (max-width: 992px)" });',
            errors: [{ message: ErrorMessage }],
        },
    ],
})
