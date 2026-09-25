import { ruleTester } from '../../config'
import { NoMisnamedPrimaryFileConstants } from '../NoMisnamedPrimaryFile.constants'
import { ErrorMessage, Rules } from '../NoMisnamedPrimaryFile.rules'

const messageFor = (file: string, folder: string, extension: string) =>
    [ErrorMessage, `Got ${file}, expected ${folder}.${extension}`].join('\n')

const { AllowedParentFolders } = NoMisnamedPrimaryFileConstants

ruleTester.run('no-misnamed-primary-file', Rules.Eslint.NoMisnamedPrimaryFile9, {
    valid: [
        {
            name: 'should not throw for a primary file named after its folder',
            code: '<></>',
            filename: '/a/Feature/Feature.tsx',
        },
        {
            name: 'should not throw for a role file, which no-ad-hoc-file-suffix owns',
            code: '<></>',
            filename: '/a/Feature/Feature.utils.tsx',
        },
        {
            name: 'should not throw for a spec file',
            code: '<></>',
            filename: '/a/Feature/Feature.spec.tsx',
        },
        {
            name: 'should not throw for a declaration file',
            code: '<></>',
            filename: '/a/Feature/Feature.d.ts',
        },
        ...AllowedParentFolders.map((folder) => ({
            name: `should not throw inside an allowed ${folder} folder`,
            code: '<></>',
            filename: `/a/Feature/${folder}/SomethingElse.tsx`,
        })),
    ],
    invalid: [
        {
            name: 'should throw for a feature folder whose primary file is misnamed',
            code: '<></>',
            filename: '/a/Feature/Wrong.tsx',
            errors: [{ message: messageFor('Wrong.tsx', 'Feature', 'tsx') }],
        },
        {
            name: 'should throw when the folder name is a prefix of the file name',
            code: '<></>',
            filename: '/a/Feature/FeatureExtra.tsx',
            errors: [{ message: messageFor('FeatureExtra.tsx', 'Feature', 'tsx') }],
        },
        {
            name: 'should throw for an internal folder in a feature',
            code: '<></>',
            filename: '/a/Feature/internal/Helper.tsx',
            errors: [{ message: messageFor('Helper.tsx', 'internal', 'tsx') }],
        },
        {
            name: 'should throw for a misnamed .ts file, keeping its own extension',
            code: '<></>',
            filename: '/a/Feature/Wrong.ts',
            errors: [{ message: messageFor('Wrong.ts', 'Feature', 'ts') }],
        },
    ],
})
