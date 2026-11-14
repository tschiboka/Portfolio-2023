import { ErrorMessage } from '../RoleFilePascal.constants'
import { Rules } from '../RoleFilePascal.rules'
import { ruleTester } from '../../config'

ruleTester.run('role-file-pascal', Rules.Eslint.RoleFilePascal9, {
    valid: [
        {
            name: 'should accept a PascalCase stem before a role',
            code: 'const Contact = {}',
            filename: 'src/app/Contact/Contact.schema.ts',
        },
        {
            name: 'should accept a PascalCase stem before a compound role',
            code: 'const MergeStatus = {}',
            filename: 'common/utils/Query/MergeStatus.types.ts',
        },
        {
            name: 'should accept a bare barrel name before a role',
            code: 'export const Ui = {}',
            filename: 'common/ux/index.types.ts',
        },
        {
            name: 'should ignore a file that carries no role',
            code: 'export const Contact = 1',
            filename: 'src/app/Contact/Contact.tsx',
        },
        {
            name: 'should ignore a suffix that is no role',
            code: 'export const thing = 1',
            filename: 'src/app/Thing/thing.helpers.ts',
        },
        {
            name: 'should ignore a single-segment filename',
            code: 'export const x = 1',
            filename: 'src/app/routes.tsx',
        },
    ],
    invalid: [
        {
            name: 'should throw for a lowercase stem before a role',
            code: 'const contact = {}',
            filename: 'src/app/Contact/contact.schema.ts',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a camelCase stem before a role',
            code: 'const controller = {}',
            filename: 'common/ux/table/useTableController.mocks.ts',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a lowercase stem on the server',
            code: 'const repository = {}',
            filename: 'server/projects/gym/Exercises/level.repository.ts',
            errors: [{ message: ErrorMessage }],
        },
    ],
})
