import type { RuleRegistrar } from '../types.js'
import { Rules } from './NoRawSemanticJsx.rules.js'

export const registrar: RuleRegistrar = {
    id: 'no-raw-semantic-jsx',
    description: 'A raw semantic element must not be used where a common/ux component exists.',
    scope: {
        include: ['src/**/*.tsx', 'src/**/*.jsx'],
        exclude: ['public/**', 'server/**', 'src/projects/WordDuelArena/**'],
    },
    enabled: true,
    severity: 'error',
    rules: [
        {
            requires: { linter: 'eslint', min: '9.0.0' },
            rule: Rules.Eslint.NoRawSemanticJsx9,
        },
    ],
}
