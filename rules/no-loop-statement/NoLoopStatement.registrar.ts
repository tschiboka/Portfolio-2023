import { Description } from './NoLoopStatement.constants.js'
import { Rules } from './NoLoopStatement.rules.js'
import type { RuleRegistrar } from '../types.js'

export const registrar: RuleRegistrar = {
    id: 'no-loop-statement',
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
            rule: Rules.Eslint.NoLoopStatement9,
        },
    ],
}
