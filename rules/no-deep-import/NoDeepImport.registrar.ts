import { Description } from './NoDeepImport.constants.js'
import { Rules } from './NoDeepImport.rules.js'
import type { RuleRegistrar } from '../types.js'

export const registrar: RuleRegistrar = {
    id: 'no-deep-import',
    description: Description,
    scope: {
        include: [
            'src/**/*.ts',
            'src/**/*.tsx',
            'common/**/*.ts',
            'common/**/*.tsx',
            'server/**/*.ts',
            'server/**/*.tsx',
        ],
        exclude: ['**/*.d.ts', '**/*.code.*', '**/tests/**'],
    },
    enabled: true,
    severity: 'error',
    rules: [
        {
            requires: { linter: 'eslint', min: '9.0.0' },
            rule: Rules.Eslint.NoDeepImport9,
        },
    ],
}
