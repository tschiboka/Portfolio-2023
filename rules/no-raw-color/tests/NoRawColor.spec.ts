import { ruleTester } from '../../config'
import { ErrorMessage } from '../NoRawColor.constants'
import { Rules } from '../NoRawColor.rules'

ruleTester.run('no-raw-color', Rules.Eslint.NoRawColor9, {
    valid: [
        {
            name: 'should accept a custom property',
            code: '({ color: "var(--accent)" });',
        },
        {
            name: 'should accept a padded custom property call',
            code: '({ color: "var( --accent )" });',
        },
        {
            name: 'should accept a bare palette variable',
            code: '({ color: "$black_1" });',
        },
        {
            name: 'should accept a module-qualified palette variable',
            code: '({ color: "palette.$black_1" });',
        },
        {
            name: 'should accept a palette read in TS',
            code: 'const styles = { color: Const.Color.White[1] }',
        },
        {
            name: 'should accept a shorthand that mixes a token and a length',
            code: '({ border: "1px solid var(--black-3)" });',
        },
        {
            name: 'should accept a keyword rather than a literal',
            code: '({ color: "currentColor" });',
        },
        {
            name: 'should ignore a value that is not a colour',
            code: '({ width: "10px" });',
        },
        {
            name: 'should ignore a destructuring shortcut',
            code: 'const { color } = styles',
        },
        {
            name: 'should accept a url fragment that looks like a hash',
            code: '({ mask: "url(#mask)" });',
        },
        {
            name: 'should accept a hash that is not a colour length',
            code: '({ color: "#12345" });',
        },
        {
            name: 'should accept an interpolated palette variable',
            code: '({ color: "#{$black_1}" });',
        },
        {
            name: 'should accept a token with a keyword fallback',
            code: '({ color: "var(--accent, currentColor)" });',
        },
        {
            name: 'should accept a keyword that names no colour',
            code: '({ color: "transparent" });',
        },
        {
            name: 'should accept a ramp name inside a token',
            code: '({ color: "var(--white-1)" });',
        },
        {
            name: 'should accept a ramp name inside a palette variable',
            code: '({ color: "$white_1" });',
        },
        {
            name: 'should accept a keyword fallback inside a token',
            code: '({ color: "var(--accent, transparent)" });',
        },
        {
            name: 'should accept a translucent token',
            code: '({ background: "color-mix(in srgb, var(--black-0) 50%, transparent)" });',
        },
        {
            name: 'should accept an alpha variant of a colour token',
            code: '({ background: "var(--black-2a05)" });',
        },
        {
            name: 'should leave a token from another family alone',
            code: '({ padding: "var(--space-16)" });',
        },
        {
            name: 'should accept a bare palette name CSS also calls a colour',
            code: '({ color: "orange" });',
        },
        {
            name: 'should accept the palette purple as a bare word',
            code: '({ color: "purple" });',
        },
        {
            name: 'should accept the palette gray as a bare word',
            code: '({ color: "gray" });',
        },
        {
            name: 'should ignore a colour word under a key that names no property',
            code: '({ whatever: "red" });',
        },
        {
            name: 'should ignore a colour word under a list key',
            code: '({ key: "red" });',
        },
        {
            name: 'should ignore a colour word under a component prop',
            code: '({ iconColor: "red" });',
        },
        {
            name: 'should ignore a colour word under a label',
            code: '({ label: "white" });',
        },
    ],
    invalid: [
        {
            name: 'should report a short hex colour',
            code: '({ color: "#fff" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report a six-digit hex colour',
            code: '({ "background-color": "#191b21" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report an eight-digit hex colour',
            code: '({ color: "#191b2140" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report rgba',
            code: '({ "background-color": "rgba(0, 0, 0, 0.5)" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report rgb',
            code: '({ color: "rgb(1, 2, 3)" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report hsl',
            code: '({ color: "hsl(0 0% 0%)" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report hsla',
            code: '({ color: "hsla(0, 0%, 0%, 0.5)" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report a hex colour in a TS styles object',
            code: "const styles = { color: '#fff' }",
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report a colour inside a shorthand',
            code: '({ border: "1px solid #333" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report a four-digit hex colour',
            code: '({ color: "#fff8" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report a gradient holding colours',
            code: '({ background: "linear-gradient(#fff, rgba(0, 0, 0, 0.5))" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report a raw fallback inside a custom property call',
            code: '({ color: "var(--accent, #fff)" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report a named colour',
            code: '({ color: "white" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report a named colour in any case',
            code: '({ color: "WHITE" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report a named colour inside a shorthand',
            code: '({ border: "1px solid black" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report a gradient of named colours',
            code: '({ background: "linear-gradient(white, black)" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report a named fallback inside a custom property call',
            code: '({ color: "var(--accent, white)" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report a named colour the palette does not define',
            code: '({ color: "red" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report a palette name inside a shorthand',
            code: '({ border: "1px solid orange" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report a gradient of palette names',
            code: '({ background: "linear-gradient(orange, purple)" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report a palette name in a fallback',
            code: '({ color: "var(--accent, orange)" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report a palette name in the wrong case',
            code: '({ color: "Orange" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report the British spelling of a palette name',
            code: '({ color: "grey" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report a custom property holding a colour',
            code: '({ "--brand": "red" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report a colour under a camelCase property',
            code: '({ backgroundColor: "red" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report a colour under a quoted property',
            code: '({ "background-color": "red" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report a colour under fill',
            code: '({ fill: "red" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report a system colour',
            code: '({ color: "Canvas" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report a modern colour function',
            code: '({ color: "oklch(0.7 0.1 200)" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report a literal inside a mix',
            code: '({ background: "color-mix(in srgb, #000 50%, transparent)" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report a colour token the palette never defines',
            code: '({ color: "var(--black-2a55)" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report an undefined step in a named colour family',
            code: '({ color: "var(--accent-dark-9)" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report an unknown colour nested in a fallback',
            code: '({ color: "var(--space-16, var(--black-55))" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report device-cmyk',
            code: '({ color: "device-cmyk(0 0 0 1)" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report lab',
            code: '({ color: "lab(50% 0 0)" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report lch',
            code: '({ color: "lch(50% 0 0)" });',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should report hwb',
            code: '({ color: "hwb(0 0% 0%)" });',
            errors: [{ message: ErrorMessage }],
        },
    ],
})
