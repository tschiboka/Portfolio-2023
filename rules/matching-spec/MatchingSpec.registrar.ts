import { Rules } from './MatchingSpec.rules.js'
import type { RuleRegistrar } from '../types.js'

export const registrar: RuleRegistrar = {
    id: 'matching-spec',
    description: 'A file that carries behaviour must have a spec beside it.',
    scope: {
        include: [
            'src/**/*.ts',
            'src/**/*.tsx',
            'common/**/*.ts',
            'common/**/*.tsx',
            'server/**/*.ts',
            'server/**/*.tsx',
        ],
        exclude: ['**/*.d.ts', '**/tests/**', '**/*.spec.*', 'common/ux/Test/**'],
    },
    enabled: true,
    severity: 'error',
    rules: [
        {
            requires: { linter: 'eslint', min: '9.0.0' },
            rule: Rules.Eslint.MatchingSpec9,
        },
    ],
}
