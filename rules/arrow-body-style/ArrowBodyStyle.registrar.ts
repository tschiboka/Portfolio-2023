import { Linter } from 'eslint'
import type { Rule } from 'eslint'
import type { RuleRegistrar } from '../types.js'

/** ESLint's own `arrow-body-style` — `@eslint/js` publishes its config, not the rule modules. */
const arrowBodyStyleRule = new Linter({ configType: 'eslintrc' })
    .getRules()
    .get('arrow-body-style') as Rule.RuleModule

export const registrar: RuleRegistrar = {
    id: 'arrow-body-style',
    description: 'An arrow body holding a returned value writes it after the =>.',
    scope: {
        include: ['**/*.{ts,tsx}'],
        exclude: ['**/*.code.{ts,tsx}'],
    },
    enabled: true,
    severity: 'error',
    options: ['as-needed'],
    rules: [
        {
            requires: { linter: 'eslint', min: '9.0.0' },
            rule: arrowBodyStyleRule,
        },
    ],
}
