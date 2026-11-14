import { Message } from '../NoInterface.constants'
import { Rules } from '../NoInterface.rules'
import { typescriptRuleTester } from '../../config'

typescriptRuleTester.run('no-interface', Rules.Eslint.NoInterface9, {
    valid: [
        {
            name: 'should accept a type alias',
            code: 'type Props = { children: string }',
        },
        {
            name: 'should accept an interface inside a global declaration',
            code: 'declare global {\n    interface Window {\n        appTheme: string\n    }\n}',
        },
        {
            name: 'should accept an interface inside a module declaration',
            code: "declare module 'vitest' {\n    interface Assertion {\n        toMatchShape(): void\n    }\n}",
        },
        {
            name: 'should accept an interface inside a declared namespace',
            code: 'declare namespace Project {\n    interface Shape {\n        id: string\n    }\n}',
        },
    ],
    invalid: [
        {
            name: 'should throw for a plain interface',
            code: 'interface Props {\n    children: string\n}',
            output: 'type Props = {\n    children: string\n}',
            errors: [{ message: Message }],
        },
        {
            name: 'should throw for an exported interface',
            code: 'export interface Props {\n    children: string\n}',
            output: 'export type Props = {\n    children: string\n}',
            errors: [{ message: Message }],
        },
        {
            name: 'should throw for an interface that extends another',
            code: 'interface Props extends Base {\n    children: string\n}',
            output: 'type Props = Base & {\n    children: string\n}',
            errors: [{ message: Message }],
        },
        {
            name: 'should throw for an interface inside a namespace that is not ambient',
            code: 'namespace Project {\n    interface Shape {\n        id: string\n    }\n}',
            output: 'namespace Project {\n    type Shape = {\n        id: string\n    }\n}',
            errors: [{ message: Message }],
        },
    ],
})
