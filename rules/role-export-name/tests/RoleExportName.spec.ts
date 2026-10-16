import { ruleTester } from '../../config'
import { Rules } from '../RoleExportName.rules'
import { RoleExportNameTestUtils } from './RoleExportName.spec.utils'

const { messageFor, roleFile, fileName, expectedName, roleCases } = RoleExportNameTestUtils

ruleTester.run('role-export-name', Rules.Eslint.RoleExportName9, {
    valid: [
        ...roleCases.map(({ role, filename, expected }) => ({
            name: `should not throw when a ${role} file exports ${expected}`,
            code: `export const ${expected} = 1`,
            filename,
        })),
        {
            name: 'should not throw for a primary file exporting its own name',
            code: 'export const Blog = () => null',
            filename: '/a/Feature/Blog.tsx',
        },
        {
            name: 'should not throw for a primary file whose default export is named after it',
            code: 'export default Blog',
            filename: '/a/Feature/Blog.tsx',
        },
        {
            name: 'should not throw for a spec utils file, which reads TestUtils',
            code: 'export const BlogTestUtils = 1',
            filename: '/a/Feature/Blog.spec.utils.ts',
        },
        {
            name: 'should not throw for a spec utils file whose chain carries a role too',
            code: 'export const BlogQueriesTestUtils = 1',
            filename: '/a/Feature/Blog.queries.spec.utils.ts',
        },
        {
            name: 'should not throw for a chain carrying two roles, which both compose',
            code: 'export const BlogQueriesMocks = 1',
            filename: '/a/Feature/Blog.queries.mocks.ts',
        },
        {
            name: 'should not throw for a chain whose middle role is not in the map',
            code: 'export const Row = {}\nexport const Page = {}',
            filename: '/a/Feature/Blog.queries.types.ts',
        },
        {
            name: 'should not throw for a spec, which names no role',
            code: 'export const a = 1\nexport const b = 2',
            filename: '/a/Feature/Blog.utils.spec.ts',
        },
        {
            name: 'should not throw for a barrel, which names no role',
            code: "export * from './Blog'",
            filename: '/a/Feature/index.ts',
        },
        {
            name: 'should not throw for an entry point, which names no role',
            code: 'export const setup = 1',
            filename: '/src/setupTests.ts',
        },
        {
            name: 'should not throw for a role the map does not carry',
            code: 'export const Row = {}\nexport const Page = {}',
            filename: '/a/Feature/Blog.types.ts',
        },
        {
            name: 'should not throw for a declaration file, whose role segment is d',
            code: 'export {}',
            filename: '/a/Feature/Blog.d.ts',
        },
        {
            name: 'should not throw for a lowercase stem, which names no feature',
            code: 'export const TableControllerMocks = {}\nexport const other = 1',
            filename: '/a/Table/useTableController.mocks.ts',
        },
    ],
    invalid: [
        {
            name: 'should throw for a role file whose name is not the role name',
            code: 'export const blogUtils = 1',
            filename: roleFile('utils'),
            errors: [
                {
                    message: messageFor(fileName('utils'), 'utils', expectedName('utils'), [
                        'blogUtils',
                    ]),
                },
            ],
        },
        {
            name: 'should throw for a role file that exports nothing',
            code: '',
            filename: roleFile('selectors'),
            errors: [
                {
                    message: messageFor(
                        fileName('selectors'),
                        'selectors',
                        expectedName('selectors'),
                        [],
                    ),
                },
            ],
        },
        {
            name: 'should throw for a role file that exports a default',
            code: 'export default {}',
            filename: roleFile('controller'),
            errors: [
                {
                    message: messageFor(
                        fileName('controller'),
                        'controller',
                        expectedName('controller'),
                        ['default'],
                    ),
                },
            ],
        },
        {
            name: 'should throw for a primary file not named after itself',
            code: 'export const BlogPage = 1',
            filename: '/a/Feature/Blog.tsx',
            errors: [{ message: messageFor('Blog.tsx', 'Blog', 'Blog', ['BlogPage']) }],
        },
        {
            name: 'should throw for a spec utils file named for the plain role',
            code: 'export const BlogUtils = 1',
            filename: '/a/Feature/Blog.spec.utils.ts',
            errors: [
                {
                    message: messageFor('Blog.spec.utils.ts', 'spec.utils', 'BlogTestUtils', [
                        'BlogUtils',
                    ]),
                },
            ],
        },
        {
            name: 'should throw for an umbrella whose name carries the wrong role',
            code: 'export const BlogHandlers = 1',
            filename: roleFile('mocks'),
            errors: [
                {
                    message: messageFor(fileName('mocks'), 'mocks', expectedName('mocks'), [
                        'BlogHandlers',
                    ]),
                },
            ],
        },
        {
            name: 'should throw for a composite file whose name drops a role',
            code: 'export const BlogTestUtils = 1',
            filename: '/a/Feature/Blog.queries.spec.utils.ts',
            errors: [
                {
                    message: messageFor(
                        'Blog.queries.spec.utils.ts',
                        'queries.spec.utils',
                        'BlogQueriesTestUtils',
                        ['BlogTestUtils'],
                    ),
                },
            ],
        },
    ],
})
