import { ruleTester } from '../../config'
import { NoAdHocFileSuffixConstants } from '../NoAdHocFileSuffix.constants'
import { ErrorMessage, Rules } from '../NoAdHocFileSuffix.rules'

const { AllowedBareNames, AllowedParentFolders, AllowedRoles } = NoAdHocFileSuffixConstants

const rolesWithoutSpec = AllowedRoles.filter((role) => role !== 'spec')

const caseFor = (filename: string) => ({
    name: `should not throw for ${filename}`,
    code: '<></>',
    filename,
})

const messageFor = (suffix: string) => [ErrorMessage, `Got .${suffix}.`].join(' ')

const messageForName = (fileName: string) => [ErrorMessage, `Got ${fileName}.`].join(' ')

ruleTester.run('no-ad-hoc-file-suffix', Rules.Eslint.NoAdHocFileSuffix9, {
    valid: [
        ...AllowedBareNames.map((name) => caseFor(`/a/${name}.ts`)),
        caseFor('/a/Feature/Feature.tsx'),
        ...AllowedParentFolders.map((folder) => caseFor(`/a/Feature/${folder}/Thing.tsx`)),
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
            name: 'should throw for a bare name that is not an entry point',
            code: '<></>',
            filename: '/a/Thing.ts',
            errors: [{ message: messageForName('Thing.ts') }],
        },
        {
            name: 'should throw for a bare name that is not its own folder',
            code: '<></>',
            filename: '/a/Feature/Other.tsx',
            errors: [{ message: messageForName('Other.tsx') }],
        },
        {
            name: 'should throw for a bare name beside a role file',
            code: '<></>',
            filename: '/a/Article/Sooner.tsx',
            errors: [{ message: messageForName('Sooner.tsx') }],
        },
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
