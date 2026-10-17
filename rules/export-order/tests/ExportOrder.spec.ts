import { parser } from 'typescript-eslint'
import { ruleTester } from '../../config'
import { ErrorMessage } from '../ExportOrder.constants'
import { Rules } from '../ExportOrder.rules'

const fileName = '/a/Feature/index.ts'
const typed = { languageOptions: { parser } }
const source = (...lines: string[]) => lines.join('\n')

ruleTester.run('export-order', Rules.Eslint.ExportOrder9, {
    valid: [
        {
            name: 'should not throw for the standard worked example',
            code: source(
                "export * as utils from './utils'",
                "export * from './helpers'",
                'export default Component',
                "export { default } from './Component'",
                "export { Button } from './Button'",
                'export const isDefined = (value: unknown) => value != null',
                "export type { User } from './types'",
                'export interface UserConfig {}',
                'const Component = 1',
            ),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw when a namespace re-export precedes a star re-export',
            code: source("export * as utils from './utils'", "export * from './helpers'"),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw when a star precedes a default declaration',
            code: source(
                "export * from './helpers'",
                'export default Component',
                'const Component = 1',
            ),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw when a declaration precedes the re-export of its kind',
            code: source(
                'export default Component',
                "export { default } from './Component'",
                'const Component = 1',
            ),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw when a named re-export precedes a named declaration',
            code: source(
                "export { Button } from './Button'",
                'export const isDefined = (value: unknown) => value != null',
            ),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw when a named declaration precedes a type-only export',
            code: source(
                'export const isDefined = (value: unknown) => value != null',
                "export type { User } from './types'",
            ),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw for two exports of one style and one path in any order',
            code: source("export { Button } from './Button'", "export { Heading } from './Button'"),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw when paths rise from package to parent-relative at one style',
            code: source(
                "export { A } from 'react'",
                "export { B } from '@tanstack/react-query'",
                "export { C } from '@common-utils'",
                "export { D } from './Button'",
                "export { E } from '../Overlay'",
            ),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw for two local declarations, which carry no path',
            code: source('export const first = 1', 'export const second = 2'),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not throw when a type-only star sits below every value export',
            code: source('export const value = 1', "export type * from './types'"),
            filename: fileName,
            ...typed,
        },
        {
            name: 'should not order imports, only exports',
            code: source(
                "import { Button } from './Button'",
                "export type { ButtonProps } from './Button'",
            ),
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
            name: 'should not throw for a file with one export',
            code: "export { Button } from './Button'",
            filename: fileName,
            ...typed,
        },
        {
            name: 'should rank a renamed default as a named re-export',
            code: source(
                "export { default } from './Component'",
                "export { default as Button } from './Component'",
            ),
            filename: fileName,
            ...typed,
        },
    ],
    invalid: [
        {
            name: 'should throw when a namespace re-export follows a star re-export',
            code: source("export * from './helpers'", "export * as utils from './utils'"),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw when a default declaration precedes a star re-export',
            code: source(
                'export default Component',
                "export * from './helpers'",
                'const Component = 1',
            ),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw when a named re-export precedes a default declaration',
            code: source(
                "export { Button } from './Button'",
                'export default Component',
                'const Component = 1',
            ),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw when a named declaration precedes a default re-export',
            code: source(
                'export const isDefined = (value: unknown) => value != null',
                "export { default } from './Component'",
            ),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw when a type-only export precedes a named declaration',
            code: source(
                "export type { User } from './types'",
                'export const isDefined = (value: unknown) => value != null',
            ),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw when an interface precedes a named declaration',
            code: source('export interface UserConfig {}', 'export const value = 1'),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw when a same-directory re-export precedes a package one',
            code: source("export { A } from './Button'", "export { B } from 'react'"),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw when a scoped package precedes a bare one',
            code: source("export { A } from '@tanstack/react-query'", "export { B } from 'react'"),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw when a parent-relative re-export precedes a same-directory one',
            code: source("export { A } from '../Overlay'", "export { B } from './Button'"),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw only once when two pairs are inverted',
            code: source(
                "export { A } from './Button'",
                "export { B } from 'react'",
                'export const value = 1',
                "export type { User } from './types'",
                "export { C } from './Heading'",
            ),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw when a default re-export precedes a default declaration',
            code: source(
                "export { default } from './Component'",
                'export default Component',
                'const Component = 1',
            ),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw when a named re-export precedes a default re-export',
            code: source(
                "export { Button } from './Button'",
                "export { default } from './Component'",
            ),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw when a named declaration precedes a named re-export',
            code: source('export const value = 1', "export { Button } from './Button'"),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw when an alias precedes a scoped package',
            code: source(
                "export { A } from '@common-utils'",
                "export { B } from '@tanstack/react-query'",
            ),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw when a deeper parent-relative export precedes a shallower one',
            code: source("export { A } from '../../Card'", "export { B } from '../Overlay'"),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw when an inline type re-export follows a type-only one',
            code: source(
                "export type { User } from './types'",
                "export { type ButtonProps } from './Button'",
            ),
            filename: fileName,
            ...typed,
            errors: [{ message: ErrorMessage }],
        },
    ],
})
