import { ruleTester } from '../../config'
import { ErrorMessage } from '../NoRawZIndex.constants'
import { Rules } from '../NoRawZIndex.rules'

ruleTester.run('no-raw-zindex', Rules.Eslint.NoRawZIndex9, {
    valid: [
        {
            name: 'should accept a layer read from Const.ZIndex',
            code: 'const styles = { zIndex: Const.ZIndex.sticky }',
        },
        {
            name: 'should accept the last layer of the scale',
            code: 'const styles = { zIndex: Const.ZIndex.top }',
        },
        {
            name: 'should accept a stylesheet custom property',
            code: '({ "z-index": "var(--z-sticky)" });',
        },
        {
            name: 'should ignore a property that is not a z-index',
            code: "const styles = { color: 'red', order: 5 }",
        },
        {
            name: 'should ignore a property whose name only starts with zIndex',
            code: 'const styles = { zIndexOrder: 5 }',
        },
        {
            name: 'should ignore a destructuring shortcut',
            code: 'const { zIndex } = styles',
        },
        {
            name: 'should ignore a destructuring rename',
            code: 'const { zIndex: layer } = styles',
        },
        {
            name: 'should ignore a destructuring default',
            code: 'const { zIndex = 5 } = styles',
        },
        {
            name: 'should accept a layer in a JSX style object',
            code: 'const el = <div style={{ zIndex: Const.ZIndex.sticky }} />',
        },
        {
            name: 'should accept a stylesheet property written in a TS object',
            code: "const styles = { 'z-index': 'var(--z-sticky)' }",
        },
        {
            name: 'should accept padding inside the custom property call',
            code: '({ "z-index": "var( --z-top )" });',
        },
        {
            name: 'should ignore an object spread',
            code: 'const styles = { ...base }',
        },
        {
            name: 'should ignore a computed key that is not a name',
            code: 'const styles = { [key]: 5 }',
        },
        {
            name: 'should accept a layer reached through a computed member',
            code: "const styles = { zIndex: Const.ZIndex['sticky'] }",
        },
    ],
    invalid: [
        {
            name: 'should report a raw number in a styles object',
            code: 'const styles = { zIndex: 5 }',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report a literal that happens to equal a layer',
            code: 'const styles = { zIndex: 20 }',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report a value read from another constant',
            code: 'const styles = { zIndex: Layers.sticky }',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report a raw declaration in a stylesheet',
            code: '({ "z-index": "59" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report a keyword declaration in a stylesheet',
            code: '({ "z-index": "auto" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report a custom property that is not a layer',
            code: '({ "z-index": "var(--site-header)" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report a number written as a string',
            code: "const styles = { zIndex: '20' }",
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report a reference without a layer',
            code: 'const styles = { zIndex: Const.ZIndex }',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report a raw number under the stylesheet key',
            code: "const styles = { 'z-index': 20 }",
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report a template literal that names a layer',
            code: 'const styles = { zIndex: `var(--z-top)` }',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report a custom property with no layer name',
            code: '({ "z-index": "var(--z)" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report a negative number',
            code: 'const styles = { zIndex: -1 }',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report a fractional number',
            code: 'const styles = { zIndex: 20.5 }',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report undefined',
            code: 'const styles = { zIndex: undefined }',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report a reference under the wrong case',
            code: 'const styles = { zIndex: Const.zIndex.sticky }',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report a computed key that is the property name',
            code: "const styles = { ['zIndex']: 5 }",
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report a token carrying an important flag',
            code: "({ 'z-index': 'var(--z-top) !important' });",
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report a conditional between two layers',
            code: 'const styles = { zIndex: active ? Const.ZIndex.top : Const.ZIndex.base }',
            errors: [{ message: ErrorMessage }],
        },
    ],
})
