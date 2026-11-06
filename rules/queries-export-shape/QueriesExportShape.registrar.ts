import { Description } from './QueriesExportShape.constants.js'
import { Rules } from './QueriesExportShape.rules.js'
import type { RuleRegistrar } from '../types.js'

export const registrar: RuleRegistrar = {
    id: 'queries-export-shape',
    description: Description,
    scope: {
        include: ['**/*.queries.ts'],
        exclude: [],
    },
    enabled: true,
    severity: 'error',
    rules: [
        {
            requires: { linter: 'eslint', min: '9.0.0' },
            rule: Rules.Eslint.QueriesExportShape9,
        },
    ],
}
