import { ruleTester } from '../../config'
import { ExactlyOneExportConstants } from '../ExactlyOneExport.constants'
import { Rules } from '../ExactlyOneExport.rules'
import { ExactlyOneExportTestUtils } from './ExactlyOneExport.spec.utils'

const { SingleExportRoles } = ExactlyOneExportConstants
const { messageFor, roleFile } = ExactlyOneExportTestUtils

ruleTester.run('exactly-one-export', Rules.Eslint.ExactlyOneExport9, {
    valid: [
        ...SingleExportRoles.map((role) => ({
            name: `should not throw for a ${role} file exporting one declaration`,
            code: 'export const Blog = 1',
            filename: roleFile(role),
        })),
        {
            name: 'should not throw for a role file exporting one function',
            code: 'export function format() {}',
            filename: roleFile('transformers'),
        },
        {
            name: 'should not throw for a role file exporting one specifier',
            code: 'const Blog = 1\nexport { Blog }',
            filename: roleFile('selectors'),
        },
        {
            name: 'should not throw for a role file exporting one default',
            code: 'export default {}',
            filename: roleFile('controller'),
        },
        {
            name: 'should not throw for a role file re-exporting one namespace',
            code: "export * as Blog from './Blog.utils'",
            filename: roleFile('mocks'),
        },
        {
            name: 'should not throw for a .tsx role file, which the extension does not change',
            code: 'export const Blog = () => null',
            filename: roleFile('provider', 'tsx'),
        },
        {
            name: 'should not throw for a spec helper, whose role segment is still utils',
            code: 'export const BlogTestUtils = 1',
            filename: '/a/Feature/Blog.spec.utils.ts',
        },
        {
            name: 'should not throw for a role outside the list',
            code: 'export const Blog = 1\nexport const BlogProps = {}',
            filename: roleFile('types'),
        },
        {
            name: 'should not throw for a barrel, which names no role',
            code: "export * from './Blog'\nexport * from './SubFeature'",
            filename: '/a/Feature/index.ts',
        },
        {
            name: 'should not throw for a bare component, which names no role',
            code: 'export const Blog = 1\nexport const BlogProps = {}',
            filename: '/a/Feature/Blog.tsx',
        },
        {
            name: 'should not throw for a spec, whose role is spec rather than the file it covers',
            code: 'export const a = 1\nexport const b = 2',
            filename: '/a/Feature/Blog.utils.spec.ts',
        },
    ],
    invalid: [
        ...SingleExportRoles.map((role) => ({
            name: `should throw for a ${role} file exporting two declarations`,
            code: 'export const a = 1\nexport const b = 2',
            filename: roleFile(role),
            errors: [{ message: messageFor(role, 2) }],
        })),
        {
            name: 'should throw for two bindings in one declaration',
            code: 'export const a = 1, b = 2',
            filename: roleFile('columns'),
            errors: [{ message: messageFor('columns', 2) }],
        },
        {
            name: 'should throw for two specifiers in one export statement',
            code: 'const a = 1\nconst b = 2\nexport { a, b }',
            filename: roleFile('selectors'),
            errors: [{ message: messageFor('selectors', 2) }],
        },
        {
            name: 'should throw for a value beside a default export',
            code: 'export const a = 1\nexport default {}',
            filename: roleFile('controller'),
            errors: [{ message: messageFor('controller', 2) }],
        },
        {
            name: 'should throw for a role file exporting nothing',
            code: 'const Blog = 1',
            filename: roleFile('utils'),
            errors: [{ message: messageFor('utils', 0) }],
        },
        {
            name: 'should throw for an empty export statement',
            code: 'export {}',
            filename: roleFile('utils'),
            errors: [{ message: messageFor('utils', 0) }],
        },
        {
            name: 'should throw for a re-export that names nothing',
            code: "export * from './Blog.utils'",
            filename: roleFile('utils'),
            errors: [{ message: messageFor('utils', 0) }],
        },
        {
            name: 'should throw for a .tsx role file exporting two components',
            code: 'export const a = () => null\nexport const b = () => null',
            filename: roleFile('provider', 'tsx'),
            errors: [{ message: messageFor('provider', 2) }],
        },
        {
            name: 'should throw for a displayed code sample exporting seven',
            code: 'export const a = 1\nexport const b = 2\nexport const c = 3\nexport const d = 4\nexport const e = 5\nexport const f = 6\nexport const g = 7',
            filename: roleFile('code'),
            errors: [{ message: messageFor('code', 7) }],
        },
    ],
})
