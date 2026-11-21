import { MatchingSpecTestUtils } from './MatchingSpec.spec.utils'
import { Rules } from '../MatchingSpec.rules'
import { ruleTester } from '../../config'

const { caseFor, inRepo, messageFor } = MatchingSpecTestUtils

ruleTester.run('matching-spec', Rules.Eslint.MatchingSpec9, {
    valid: [
        // A primary file with its feature spec, and role files whose specs exist beside them.
        caseFor('src/app/Admin/Admin.tsx'),
        caseFor('src/app/Categories/Categories.transformers.ts'),
        caseFor('src/app/Categories/Categories.options.ts'),
        caseFor('src/app/Categories/Categories.handlers.ts'),
        // Roles §1.3 marks as indirect or behaviour-free, and a file inside `tests/`.
        caseFor('src/app/Admin/Admin.types.ts'),
        caseFor('src/app/Admin/Admin.queries.ts'),
        caseFor('src/app/Home/tests/Home.harness.ts'),
    ],
    invalid: [
        {
            name: 'should throw for a primary file with no feature spec',
            code: 'export const x = 1',
            filename: inRepo('src/app/Nothing/Nothing.tsx'),
            errors: [{ message: messageFor('Nothing.spec.tsx') }],
        },
        {
            name: 'should throw for a tested role with no role spec',
            code: 'export const x = 1',
            filename: inRepo('src/app/Nothing/Nothing.utils.ts'),
            errors: [{ message: messageFor('Nothing.utils.spec.ts') }],
        },
        {
            name: 'should throw for a tested role whose spec is named for another role',
            code: 'export const x = 1',
            filename: inRepo('src/app/Admin/Admin.schema.ts'),
            errors: [{ message: messageFor('Admin.schema.spec.ts') }],
        },
    ],
})
