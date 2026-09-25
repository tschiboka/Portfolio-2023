import { ruleTester } from '../../config'
import { Rules, ErrorMessage } from '../NoEmptyRowInJsx.rules'

ruleTester.run('no-newline-in-jsx', Rules.Eslint.Min9, {
    valid: [
        {
            name: 'should not throw for a self-closing element',
            code: '<div />',
            filename: 'a.tsx',
        },
        {
            name: 'should not throw for content on the lines adjacent to the tags',
            code: '<div>\n    <span />\n</div>',
            filename: 'a.tsx',
        },
        {
            name: 'should not throw for text on the lines adjacent to the tags',
            code: '<div>\n    text\n</div>',
            filename: 'a.tsx',
        },
        {
            name: 'should not throw for nested elements without blank rows',
            code: '<div>\n    <span>\n        <em />\n    </span>\n</div>',
            filename: 'a.tsx',
        },
    ],
    invalid: [
        {
            name: 'should throw for a blank row after the opening tag',
            code: '<div>\n\n    <span />\n</div>',
            filename: 'a.tsx',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a blank row before the closing tag',
            code: '<div>\n    <span />\n\n</div>',
            filename: 'a.tsx',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a blank row between siblings',
            code: '<div>\n    <span />\n\n    <span />\n</div>',
            filename: 'a.tsx',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a blank row around text',
            code: '<div>\n    text\n\n</div>',
            filename: 'a.tsx',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a whitespace-only blank row',
            code: '<div>\n    <span />\n    \n    <span />\n</div>',
            filename: 'a.tsx',
            errors: [{ message: ErrorMessage }],
        },
    ],
})
