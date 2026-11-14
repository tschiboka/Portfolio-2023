import { builtMessage, inlineMessage } from './RegexpRegistry.spec.utils'
import { Rules } from '../RegexpRegistry.rules'
import { typescriptRuleTester } from '../../config'

typescriptRuleTester.run('regexp-registry', Rules.Eslint.RegexpRegistry9, {
    valid: [
        {
            name: 'should accept a pattern read from the catalogue',
            code: "import { Regexp } from '@common-utils'\nconst isName = (value: string) => Regexp.NameText.test(value)",
        },
        {
            name: 'should accept a pattern built by the catalogue',
            code: "import { Regexp } from '@common-utils'\nconst isWord = (word: string) => Regexp.exactWord(word).test(word)",
        },
        {
            name: 'should accept a plain string literal',
            code: "const label = 'name'",
        },
        {
            name: 'should accept a plain string carrying a slash',
            code: "const path = 'a/b'",
        },
        {
            name: 'should accept a division between two values',
            code: 'const ratio = (total: number, count: number) => total / count',
        },
    ],
    invalid: [
        {
            name: 'should report a regex literal written inline',
            code: 'const isDigits = (value: string) => /^[0-9]+$/.test(value)',
            errors: [{ message: inlineMessage }],
        },
        {
            name: 'should report a regex literal passed as an argument',
            code: 'const split = (value: string) => value.split(/,\\s*/)',
            errors: [{ message: inlineMessage }],
        },
        {
            name: 'should report a regex literal with flags',
            code: 'const isName = /^[a-z ]+$/i',
            errors: [{ message: inlineMessage }],
        },
        {
            name: 'should report a regex literal nested in a function',
            code: 'const build = () => () => /^name$/i.test(value)',
            errors: [{ message: inlineMessage }],
        },
        {
            name: 'should report each literal a file writes',
            code: 'const a = /one/\nconst b = /two/',
            errors: [{ message: inlineMessage }, { message: inlineMessage }],
        },
        {
            name: 'should report a pattern built from a written string',
            code: "const isDigits = new RegExp('^[0-9]+$')",
            errors: [{ message: builtMessage }],
        },
        {
            name: 'should report a pattern built from a written string with flags',
            code: "const isName = new RegExp('^[a-z ]+$', 'i')",
            errors: [{ message: builtMessage }],
        },
        {
            name: 'should report a pattern built by a call rather than a constructor',
            code: "const isDigits = RegExp('^[0-9]+$')",
            errors: [{ message: builtMessage }],
        },
        {
            name: 'should report a pattern written as a template with no hole',
            code: 'const isDigits = new RegExp(`^[0-9]+$`)',
            errors: [{ message: builtMessage }],
        },
        {
            name: 'should report a pattern built from a template with a hole',
            code: 'const build = (prefix: string) => new RegExp(`^${prefix}$`)',
            errors: [{ message: builtMessage }],
        },
        {
            name: 'should report a pattern built from a variable',
            code: 'const build = (pattern: string) => new RegExp(pattern)',
            errors: [{ message: builtMessage }],
        },
        {
            name: 'should report a pattern built with no argument',
            code: 'const build = () => new RegExp()',
            errors: [{ message: builtMessage }],
        },
        {
            name: 'should report a pattern built from an escaped value',
            code: "import { Regexp } from '@common-utils'\nconst build = (value: string) => new RegExp(Regexp.escape(value))",
            errors: [{ message: builtMessage }],
        },
    ],
})
