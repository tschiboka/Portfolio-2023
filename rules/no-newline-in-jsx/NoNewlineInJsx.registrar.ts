import type { RuleRegistrar } from '../types.js'
import { Rules } from './NoNewlineInJsx.rules.js'

export const registrar: RuleRegistrar = {
    id: 'no-newline-in-jsx',
    description: 'A file must not begin with a newline.',
    scope: {
        include: ['**/*.tsx', '**/*.jsx'],
        exclude: [],
    },
    enabled: true,
    severity: 'error',
    rules: [
        {
            requires: { linter: 'eslint', min: '9.0.0' },
            rule: Rules.Eslint.Min9,
        },
    ],
}
