import { ruleTester } from '../../config'
import { NoAdHocFileSuffixConstants } from '../NoAdHocFileSuffix.constants'
import { ErrorMessage, Rules } from '../NoAdHocFileSuffix.rules'

const { AllowedRoles } = NoAdHocFileSuffixConstants

const rolesWithoutSpec = AllowedRoles.filter((role) => role !== 'spec')

const caseFor = (filename: string) => ({
    name: `should not throw for ${filename}`,
    code: '<></>',
    filename,
})

const messageFor = (suffix: string) => [ErrorMessage, `Got .${suffix}.`].join(' ')

ruleTester.run('no-ad-hoc-file-suffix', Rules.Eslint.NoAdHocFileSuffix9, {
    valid: [
        caseFor('a.ts'),
        caseFor('a.tsx'),
        ...AllowedRoles.map((role) => caseFor(`a.${role}.ts`)),
        ...rolesWithoutSpec.map((role) => caseFor(`a.spec.${role}.ts`)),
        ...rolesWithoutSpec.map((role) => caseFor(`a.${role}.spec.ts`)),
        caseFor('a.queries.mocks.ts'),
        caseFor('a.renderers.spec.tsx'),
        caseFor('a.spec.renderers.tsx'),
        caseFor('a.spec.x.tsx'),
    ],
    invalid: [
        {
            name: 'should throw for an unknown role',
            code: '<></>',
            filename: 'a.x.tsx',
            errors: [{ message: messageFor('x.tsx') }],
        },
        {
            name: 'should throw for an unknown role before spec',
            code: '<></>',
            filename: 'a.x.spec.utils.tsx',
            errors: [{ message: messageFor('x.spec.utils.tsx') }],
        },
        {
            name: 'should throw for three roles without spec',
            code: '<></>',
            filename: 'a.utils.mocks.types.tsx',
            errors: [{ message: messageFor('utils.mocks.types.tsx') }],
        },
        {
            name: 'should throw for two roles that are not a spec composite',
            code: '<></>',
            filename: 'a.x.types.tsx',
            errors: [{ message: messageFor('x.types.tsx') }],
        },
        {
            name: 'should throw for an unknown role after a spec composite',
            code: '<></>',
            filename: 'a.spec.utils.x.tsx',
            errors: [{ message: messageFor('spec.utils.x.tsx') }],
        },
    ],
})
