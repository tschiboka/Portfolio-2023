import { Description } from './TodoTicketRef.constants.js'
import { Rules } from './TodoTicketRef.rules.js'
import type { RuleRegistrar } from '../types.js'

export const registrar: RuleRegistrar = {
    id: 'todo-ticket-ref',
    description: Description,
    scope: {
        include: ['**/*.{ts,tsx}'],
        exclude: ['**/*.code.{ts,tsx}', 'rules/**'],
    },
    enabled: true,
    severity: 'error',
    rules: [
        {
            requires: { linter: 'eslint', min: '9.0.0' },
            rule: Rules.Eslint.TodoTicketRef9,
        },
    ],
}
