import { RuleTester } from 'eslint'
import { ErrorMessage, Rules } from '../NoRawSemanticJsx.rules'

const ruleTester = new RuleTester({
    languageOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        parserOptions: { ecmaFeatures: { jsx: true } },
    },
})

const messageFor = (detail: string) => [ErrorMessage, detail].join(' ')

ruleTester.run('no-raw-semantic-jsx', Rules.Eslint.NoRawSemanticJsx9, {
    valid: [
        {
            name: 'should not throw for a div, which has no single replacement',
            code: '<div />',
            filename: 'a.tsx',
        },
        {
            name: 'should not throw for a component, however it is named',
            code: '<Heading />',
            filename: 'a.tsx',
        },
        {
            name: 'should not throw for a member expression, which strips to no known tag',
            code: '<Form.Input />',
            filename: 'a.tsx',
        },
        {
            name: 'should not throw for a custom element, which is not in the table',
            code: '<my-element />',
            filename: 'a.tsx',
        },
        {
            name: 'should not throw for a fragment, which has no tag',
            code: '<></>',
            filename: 'a.tsx',
        },
        {
            name: 'should not throw for an element outside the error table',
            code: '<article />',
            filename: 'a.tsx',
        },
        {
            name: 'should not throw for an uppercase tag, which is a component',
            code: '<P />',
            filename: 'a.tsx',
        },
    ],
    invalid: [
        {
            name: 'should throw for each heading level',
            code: '<div>\n<h1 /><h2 /><h3 /><h4 /><h5 /><h6 />\n</div>',
            filename: 'a.tsx',
            errors: Array.from({ length: 6 }, (_, index) => ({
                message: messageFor(`Use Heading instead of h${index + 1}.`),
            })),
        },
        {
            name: 'should throw for a paragraph',
            code: '<p />',
            filename: 'a.tsx',
            errors: [{ message: messageFor('Use Paragraph instead of p.') }],
        },
        {
            name: 'should throw for a caption',
            code: '<small />',
            filename: 'a.tsx',
            errors: [{ message: messageFor('Use Caption instead of small.') }],
        },
        {
            name: 'should throw for code text',
            code: '<code />',
            filename: 'a.tsx',
            errors: [{ message: messageFor('Use CodeText instead of code.') }],
        },
        {
            name: 'should throw for a block quote',
            code: '<blockquote />',
            filename: 'a.tsx',
            errors: [{ message: messageFor('Use BlockQuote instead of blockquote.') }],
        },
        {
            name: 'should throw for an unordered list',
            code: '<ul />',
            filename: 'a.tsx',
            errors: [{ message: messageFor('Use List instead of ul.') }],
        },
        {
            name: 'should throw for an ordered list',
            code: '<ol />',
            filename: 'a.tsx',
            errors: [{ message: messageFor('Use List instead of ol.') }],
        },
        {
            name: 'should throw for an anchor',
            code: '<a />',
            filename: 'a.tsx',
            errors: [{ message: messageFor('Use Link instead of a.') }],
        },
        {
            name: 'should throw for a table',
            code: '<table />',
            filename: 'a.tsx',
            errors: [{ message: messageFor('Use Table instead of table.') }],
        },
        {
            name: 'should throw for a figure',
            code: '<figure />',
            filename: 'a.tsx',
            errors: [{ message: messageFor('Use Figure instead of figure.') }],
        },
        {
            name: 'should throw for a dialog',
            code: '<dialog />',
            filename: 'a.tsx',
            errors: [{ message: messageFor('Use Dialog instead of dialog.') }],
        },
        {
            name: 'should throw for a form element',
            code: '<form />',
            filename: 'a.tsx',
            errors: [{ message: messageFor('Use Form instead of form.') }],
        },
        {
            name: 'should throw for a label',
            code: '<label />',
            filename: 'a.tsx',
            errors: [{ message: messageFor('Use Form.Label instead of label.') }],
        },
        {
            name: 'should throw for an input',
            code: '<input />',
            filename: 'a.tsx',
            errors: [{ message: messageFor('Use Form.Input instead of input.') }],
        },
        {
            name: 'should throw for a textarea',
            code: '<textarea />',
            filename: 'a.tsx',
            errors: [{ message: messageFor('Use Form.TextArea instead of textarea.') }],
        },
        {
            name: 'should throw for a button',
            code: '<button />',
            filename: 'a.tsx',
            errors: [{ message: messageFor('Use Form.Button instead of button.') }],
        },
        {
            name: 'should throw for a fieldset',
            code: '<fieldset />',
            filename: 'a.tsx',
            errors: [{ message: messageFor('Use Form.Fieldset instead of fieldset.') }],
        },
        {
            name: 'should throw for a header',
            code: '<header />',
            filename: 'a.tsx',
            errors: [{ message: messageFor('Use Header instead of header.') }],
        },
        {
            name: 'should throw for a main element',
            code: '<main />',
            filename: 'a.tsx',
            errors: [{ message: messageFor('Use Main instead of main.') }],
        },
        {
            name: 'should throw for an aside',
            code: '<aside />',
            filename: 'a.tsx',
            errors: [{ message: messageFor('Use Sidebar instead of aside.') }],
        },
        {
            name: 'should throw once per element, not once per nesting',
            code: '<div>\n<h1 />\n<p />\n</div>',
            filename: 'a.tsx',
            errors: [
                { message: messageFor('Use Heading instead of h1.') },
                { message: messageFor('Use Paragraph instead of p.') },
            ],
        },
        {
            name: 'should throw for an element with attributes and children',
            code: '<p id="a">\n    text\n</p>',
            filename: 'a.tsx',
            errors: [{ message: messageFor('Use Paragraph instead of p.') }],
        },
    ],
})
