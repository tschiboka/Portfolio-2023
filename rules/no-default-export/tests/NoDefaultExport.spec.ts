import { ruleTester } from '../../config'
import { ErrorMessage } from '../NoDefaultExport.constants'
import { Rules } from '../NoDefaultExport.rules'

const fileName = '/a/Feature/Blog.tsx'

ruleTester.run('no-default-export', Rules.Eslint.NoDefaultExport9, {
    valid: [
        {
            name: 'should not throw for a module whose exports are all named',
            code: 'export const Blog = () => null',
            filename: fileName,
        },
        {
            name: 'should not throw for a named export re-exported',
            code: 'const Blog = 1\nexport { Blog }',
            filename: fileName,
        },
        {
            name: 'should not throw for a named export aliased to another name',
            code: 'const blog = 1\nexport { blog as BlogPost }',
            filename: fileName,
        },
        {
            name: 'should not throw for an export named with a literal',
            code: "const blog = 1\nexport { blog as 'blog-post' }",
            filename: fileName,
        },
    ],
    invalid: [
        {
            name: 'should throw for a named default export',
            code: 'export default Blog',
            filename: fileName,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a bare default expression',
            code: 'export default () => null',
            filename: fileName,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a default function declaration',
            code: 'export default function init() {}',
            filename: fileName,
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw when a named export is aliased to default',
            code: 'const blog = 1\nexport { blog as default }',
            filename: fileName,
            errors: [{ message: ErrorMessage }],
        },
    ],
})
