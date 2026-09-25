import { ruleTester } from '../../config'
import { ErrorMessage, Rules } from '../NoNewlineInImports.rules'

ruleTester.run('no-newline-in-imports', Rules.Eslint.NoNewlineInImports9, {
    valid: [
        {
            name: 'should not throw for no imports at all',
            code: 'const foo = 1',
        },
        {
            name: 'should not throw for a single import',
            code: "import { foo } from 'foo'",
        },
        {
            name: 'should not throw for contiguous imports',
            code: ["import { foo } from 'foo'", "import { bar } from 'bar'"].join('\n'),
        },
        {
            name: 'should not throw for a wrapped braced import',
            code: ['import {', '    foo,', '    bar,', "} from 'foo'"].join('\n'),
        },
        {
            name: 'should not throw for a blank line after the last import',
            code: [
                "import { foo } from 'foo'",
                "import { bar } from 'bar'",
                '',
                'const baz = 1',
            ].join('\n'),
        },
        {
            name: 'should not throw for a blank line before the first import',
            code: ['const baz = 1', '', "import { foo } from 'foo'"].join('\n'),
        },
    ],
    invalid: [
        {
            name: 'should throw for a blank line between two imports',
            code: ["import { foo } from 'foo'", '', "import { bar } from 'bar'"].join('\n'),
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a blank line inside a wrapped import',
            code: ['import {', '', '    foo,', "} from 'foo'"].join('\n'),
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a blank line between the first and third import',
            code: [
                "import { foo } from 'foo'",
                "import { bar } from 'bar'",
                '',
                "import { baz } from 'baz'",
            ].join('\n'),
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw once for several blank lines',
            code: ["import { foo } from 'foo'", '', '', "import { bar } from 'bar'"].join('\n'),
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a blank line that contains spaces',
            code: ["import { foo } from 'foo'", '    ', "import { bar } from 'bar'"].join('\n'),
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a whitespace-only line inside a wrapped import',
            code: ['import {', '    ', '    foo,', "} from 'foo'"].join('\n'),
            errors: [{ message: ErrorMessage }],
        },
    ],
})
