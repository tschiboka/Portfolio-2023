import {
    fileName,
    getHomeMessage,
    getNameMessage,
    getPlacementMessage,
} from './SingleLocalType.spec.utils'
import { Rules } from '../SingleLocalType.rules'
import { typescriptRuleTester } from '../../config'

typescriptRuleTester.run('single-local-type', Rules.Eslint.SingleLocalType9, {
    valid: [
        {
            name: 'should accept a component with its props above it',
            code: 'type LoginFormProps = { email: string }\nexport const LoginForm = (props: LoginFormProps) => props.email',
        },
        {
            name: 'should accept a function with its props above it',
            code: 'type CalculateTaxProps = { rate: number }\nconst calculateTax = (options: CalculateTaxProps) => options.rate',
        },
        {
            name: 'should accept a declared function with its props above it',
            code: 'type LoginFormProps = { email: string }\nexport function LoginForm(props: LoginFormProps) {\n    return props.email\n}',
        },
        {
            name: 'should accept a file that declares no type',
            code: 'export const answer = () => 42',
        },
        {
            name: 'should accept an exported props type above its component',
            code: 'export type LoginFormProps = { email: string }\nexport const LoginForm = (props: LoginFormProps) => props.email',
        },
        {
            name: 'should accept an interface above its component',
            code: 'interface LoginFormProps {\n    email: string\n}\nexport const LoginForm = (props: LoginFormProps) => props.email',
        },
        {
            name: 'should accept a default-exported function with its props above it',
            code: 'type LoginFormProps = { email: string }\nexport default function LoginForm(props: LoginFormProps) {\n    return props.email\n}',
        },
        {
            name: 'should accept two components that each declare their props',
            code: 'type LoginFormProps = { email: string }\nexport const LoginForm = (props: LoginFormProps) => props.email\n\ntype LoginNoticeProps = { text: string }\nexport const LoginNotice = (props: LoginNoticeProps) => props.text',
        },
        {
            name: 'should accept a comment between the type and its function',
            code: 'type LoginFormProps = { email: string }\n// The form the login page renders.\nexport const LoginForm = (props: LoginFormProps) => props.email',
        },
        {
            name: 'should accept a props type above a function expression',
            code: 'type LoginFormProps = { email: string }\nexport const LoginForm = function (props: LoginFormProps) {\n    return props.email\n}',
        },
        {
            name: 'should accept a props type above an async function',
            code: 'type FetchJsonProps = { url: string }\nconst fetchJson = async (options: FetchJsonProps) => options.url',
        },
        {
            name: 'should accept a props type above a function declared inside a block',
            code: 'const build = () => {\n    type LoginFormProps = { email: string }\n    const LoginForm = (props: LoginFormProps) => props.email\n    return LoginForm\n}',
        },
        {
            name: 'should accept a props type above a statement that declares two names',
            code: 'type LoginFormProps = { email: string }\nconst answer = 42, LoginForm = (props: LoginFormProps) => props.email',
        },
    ],
    invalid: [
        {
            name: 'should throw for a type no function below it types',
            code: 'type Helper = { id: string }\nexport const answer = () => 42',
            filename: fileName,
            errors: [{ message: getHomeMessage('Helper') }],
        },
        {
            name: 'should throw for a props type that takes the bare name',
            code: 'type Props = { email: string }\nexport const LoginForm = (props: Props) => props.email',
            filename: fileName,
            errors: [{ message: getNameMessage('Props', 'LoginFormProps') }],
        },
        {
            name: 'should throw for a function props type that takes the bare name',
            code: 'type Props = { rate: number }\nconst calculateTax = (options: Props) => options.rate',
            filename: fileName,
            errors: [{ message: getNameMessage('Props', 'CalculateTaxProps') }],
        },
        {
            name: 'should throw for a type held away from its function',
            code: 'type LoginFormProps = { email: string }\nconst answer = 42\nexport const LoginForm = (props: LoginFormProps) => props.email',
            filename: fileName,
            errors: [{ message: getPlacementMessage('LoginFormProps') }],
        },
        {
            name: 'should throw for a type declared inside a function',
            code: 'export const LoginForm = (props: unknown) => {\n    type Local = { id: string }\n    return props\n}',
            filename: fileName,
            errors: [{ message: getHomeMessage('Local') }],
        },
        {
            name: 'should throw for an enum',
            code: 'export enum Mode {\n    On,\n    Off,\n}',
            filename: fileName,
            errors: [{ message: getHomeMessage('Mode') }],
        },
        {
            name: 'should throw for an enum beside the component it does not type',
            code: 'export enum Mode {\n    On,\n    Off,\n}\nexport const LoginForm = (props: unknown) => props',
            filename: fileName,
            errors: [{ message: getHomeMessage('Mode') }],
        },
        {
            name: 'should throw for a props type that names another function',
            code: 'type LoginNoticeProps = { email: string }\nexport const LoginForm = (props: LoginNoticeProps) => props.email',
            filename: fileName,
            errors: [{ message: getNameMessage('LoginNoticeProps', 'LoginFormProps') }],
        },
        {
            name: 'should throw for a type whose suffix is not `Props`',
            code: 'type LoginFormOptions = { email: string }\nexport const LoginForm = (props: LoginFormOptions) => props.email',
            filename: fileName,
            errors: [{ message: getHomeMessage('LoginFormOptions') }],
        },
        {
            name: 'should throw for a props type declared below its component',
            code: 'export const LoginForm = (props: LoginFormProps) => props.email\ntype LoginFormProps = { email: string }',
            filename: fileName,
            errors: [{ message: getPlacementMessage('LoginFormProps') }],
        },
        {
            name: 'should throw for a props type below its function and above another',
            code: 'const calculateTax = (options: CalculateTaxProps) => options.rate\ntype CalculateTaxProps = { rate: number }\nconst getRate = () => 1',
            filename: fileName,
            errors: [{ message: getPlacementMessage('CalculateTaxProps') }],
        },
        {
            name: 'should throw only for the declaration beside no function',
            code: 'type LoginFormProps = { email: string }\nexport const LoginForm = (props: LoginFormProps) => props.email\n\ntype Helper = { id: string }',
            filename: fileName,
            errors: [{ message: getHomeMessage('Helper') }],
        },
        {
            name: 'should report the home of a rule file',
            code: 'type ImportNode = { type: string }',
            filename: 'C:/project/rules/import-order/ImportOrder.rules.ts',
            errors: [{ message: getHomeMessage('ImportNode', 'ImportOrder.types.ts') }],
        },
        {
            name: 'should throw for an exported props type below its component',
            code: 'export const LoginForm = (props: LoginFormProps) => props.email\nexport type LoginFormProps = { email: string }',
            filename: fileName,
            errors: [{ message: getPlacementMessage('LoginFormProps') }],
        },
        {
            name: 'should throw for a props type above a nameless default export',
            code: 'type LoginFormProps = { email: string }\nexport default (props: LoginFormProps) => props.email',
            filename: fileName,
            errors: [{ message: getHomeMessage('LoginFormProps') }],
        },
        {
            name: 'should throw for a type alias declared inside a function',
            code: 'const build = () => {\n    type Shape = { id: string }\n    return 1\n}',
            filename: fileName,
            errors: [{ message: getHomeMessage('Shape') }],
        },
    ],
})
