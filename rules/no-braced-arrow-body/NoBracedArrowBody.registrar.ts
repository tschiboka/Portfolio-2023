import { Description } from './NoBracedArrowBody.constants.js'
import { Rules } from './NoBracedArrowBody.rules.js'
import type { RuleRegistrar } from '../types.js'

export const registrar: RuleRegistrar = {
    id: 'no-braced-arrow-body',
    description: Description,
    scope: {
        include: ['**/*.{ts,tsx}'],
        exclude: ['**/*.code.{ts,tsx}'],
    },
    enabled: true,
    severity: 'error',
    rules: [
        {
            requires: { linter: 'eslint', min: '9.0.0' },
            rule: Rules.Eslint.NoBracedArrowBody9,
        },
    ],
}
