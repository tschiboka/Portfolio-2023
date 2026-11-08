import { ruleTester } from '../../config'
import { ForeignResolverMessage, MissingResolverMessage } from '../ResolverInSchema.constants'
import { Rules } from '../ResolverInSchema.rules'

ruleTester.run('resolver-in-schema', Rules.Eslint.ResolverInSchema9, {
    valid: [
        {
            name: 'should accept a schema that exports its own resolver',
            filename: 'Login.schema.ts',
            code: 'export const LoginSchema = yup.object({})\nexport const LoginResolver = yupResolver(LoginSchema)',
        },
        {
            name: 'should accept a factory resolver beside a factory schema',
            filename: 'Categories.schema.ts',
            code: 'export const CategoriesSchema = { schema: (options) => yup.object({}) }\nexport const CategoriesResolver = (options) => yupResolver(CategoriesSchema.schema(options))',
        },
        {
            name: 'should ignore a schema file that declares no schema',
            filename: 'Types.schema.ts',
            code: 'export const Label = "login"',
        },
        {
            name: 'should ignore a component that builds no resolver',
            filename: 'Login.tsx',
            code: 'export const Login = () => null',
        },
    ],
    invalid: [
        {
            name: 'should throw for a resolver built in a component',
            filename: 'Login.tsx',
            code: 'const form = useForm({ resolver: yupResolver(LoginSchema) })',
            errors: [{ message: ForeignResolverMessage }],
        },
        {
            name: 'should throw for a schema file that exports no resolver',
            filename: 'Login.schema.ts',
            code: 'export const LoginSchema = yup.object({})',
            errors: [{ message: MissingResolverMessage }],
        },
        {
            name: 'should throw for a factory schema that exports no resolver',
            filename: 'Categories.schema.ts',
            code: 'export const CategoriesSchema = { schema: (options) => yup.object({}) }',
            errors: [{ message: MissingResolverMessage }],
        },
    ],
})
