import { Rules } from './NoMisnamedPrimaryFile.rules.js'
import type { RuleRegistrar } from '../types.js'

export const registrar: RuleRegistrar = {
    id: 'no-misnamed-primary-file',
    description: 'A file must not be misnamed as a primary file.',
    scope: {
        include: ['src/**/*.tsx'],
        exclude: ['public/**'],
    },
    enabled: true,
    severity: 'error',
    rules: [
        {
            requires: { linter: 'eslint', min: '9.0.0' },
            rule: Rules.Eslint.NoMisnamedPrimaryFile9,
        },
    ],
}
