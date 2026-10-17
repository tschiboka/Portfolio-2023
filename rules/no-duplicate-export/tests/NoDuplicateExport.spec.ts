import { parser } from 'typescript-eslint'
import { ruleTester } from '../../config'
import { ErrorMessage } from '../NoDuplicateExport.constants'
import { Rules } from '../NoDuplicateExport.rules'

const fileName = '/a/Feature/index.ts'
const typed = { languageOptions: { parser } }
const source = (...lines: string[]) => lines.join('\n')

ruleTester.run('no-duplicate-export', Rules.Eslint.NoDuplicateExport9, {
    valid: [
        {
            name: 'should not throw for two named re-exports of different paths',
            code: source(
                "export { Button } from './Button'",
                "export { Heading } from './Heading'",
            ),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw when one path carries a value and a type re-export',
            code: source(
                "export { Button } from './Button'",
                "export type { ButtonProps } from './Button'",
            ),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw when one path carries a star and a named re-export',
            code: source("export * from './Button'", "export { ButtonProps } from './Button'"),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw when one path carries a star of each kind',
            code: source("export * from './Button'", "export type * from './Button'"),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw when a local export sits beside its re-export',
            code: source(
                "export { Button } from './Button'",
                'const Heading = 1',
                'export { Heading }',
            ),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw for a default re-export of a different path',
            code: source(
                "export { default } from './Screen'",
                "export { Heading } from './Heading'",
            ),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw for a file with one re-export',
            code: "export { Button } from './Button'",
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw for a file with no exports',
            code: 'const value = 1',
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw for two type-only re-exports of different paths',
            code: source(
                "export type { ButtonProps } from './Button'",
                "export type { HeadingProps } from './Heading'",
            ),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw when one path carries a type-only star and a named one',
            code: source(
                "export type * from './Button'",
                "export type { ButtonProps } from './Button'",
            ),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw when a path is both imported and re-exported',
            code: source("import { Button } from './Button'", "export { Button } from './Button'"),
            filename: fileName,
            ...typed,
        },
    ],
    invalid: [
        {
            name: 'should throw when two named re-exports share one path',
            code: source(
                "export { Button } from './Button'",
                "export { ButtonProps } from './Button'",
            ),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw when a default re-export shares a path with a named one',
            code: source(
                "export { default } from './Screen'",
                "export { ScreenProps } from './Screen'",
            ),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a repeated star re-export',
            code: source("export * from './Button'", "export * from './Button'"),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for two type-only named re-exports of one path',
            code: source(
                "export type { ButtonProps } from './Button'",
                "export type { ButtonSize } from './Button'",
            ),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a repeated type-only star re-export',
            code: source("export type * from './Button'", "export type * from './Button'"),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw once per redundant re-export',
            code: source(
                "export { Button } from './Button'",
                "export { ButtonProps } from './Button'",
                "export { ButtonSize } from './Button'",
            ),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }, { message: ErrorMessage }],
        },
        {
            name: 'should throw when a renamed default re-export shares a path with a named one',
            code: source(
                "export { default as Button } from './Button'",
                "export { ButtonProps } from './Button'",
            ),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw when an inline type re-export shares a path with a named one',
            code: source(
                "export { type ButtonProps } from './Button'",
                "export { ButtonSize } from './Button'",
            ),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
    ],
})
