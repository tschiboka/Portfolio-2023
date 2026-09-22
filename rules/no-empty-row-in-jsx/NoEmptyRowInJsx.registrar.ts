import type { RuleRegistrar } from '../types.js'
import { Rules } from './NoEmptyRowInJsx.rules.js'

export const registrar: RuleRegistrar = {
    id: 'no-empty-row-in-jsx',
    description: 'A jsx element must not contain an empty row.',
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
