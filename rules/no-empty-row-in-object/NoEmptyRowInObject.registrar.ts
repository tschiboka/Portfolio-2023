import type { RuleRegistrar } from '../types.js'
import { Rules } from './NoEmptyRowInObject.rules.js'

export const registrar: RuleRegistrar = {
    id: 'no-empty-row-in-object',
    description: 'An object must not contain an empty row between its properties.',
    scope: {
        include: ['**/*.{ts,tsx}'],
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
