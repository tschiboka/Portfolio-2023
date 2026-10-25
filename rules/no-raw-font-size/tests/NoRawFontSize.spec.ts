import { ruleTester } from '../../config'
import { ErrorMessage } from '../NoRawFontSize.constants'
import { Rules } from '../NoRawFontSize.rules'

ruleTester.run('no-raw-font-size', Rules.Eslint.NoRawFontSize9, {
    valid: [
        {
            name: 'should accept a font token read as a custom property',
            code: '({ "font-size": "var(--font-md)" });',
        },
        {
            name: 'should accept a Sass font variable',
            code: '({ "font-size": "$font_sm" });',
        },
        {
            name: 'should accept a font token in a TS styles object',
            code: 'const styles = { fontSize: Const.Font.md }',
        },
        {
            name: 'should accept a size relative to its parent',
            code: '({ "font-size": "1.8em" });',
        },
        {
            name: 'should accept a size relative to the viewport',
            code: '({ "font-size": "3vh" });',
        },
        {
            name: 'should accept a zero without a unit',
            code: '({ "font-size": "0" });',
        },
        {
            name: 'should accept a token composed with calc',
            code: '({ "font-size": "calc(var(--font-md) * 2)" });',
        },
        {
            name: 'should ignore another property written in px',
            code: '({ "line-height": "12px", "padding": "14px" });',
        },
    ],
    invalid: [
        {
            name: 'should throw for a pixel font size in a stylesheet',
            code: '({ "font-size": "12px" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a rem literal that bypasses the scale',
            code: '({ "font-size": "1.2rem" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a fractional pixel font size',
            code: '({ "font-size": "0.75px" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a pixel font size in a TS styles object',
            code: "const styles = { fontSize: '14px' }",
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for an absolute length inside calc',
            code: '({ "font-size": "calc(1.2rem + 2px)" });',
            errors: [{ message: ErrorMessage }],
        },
    ],
})
