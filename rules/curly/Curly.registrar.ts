import { Linter } from 'eslint'
import type { Rule } from 'eslint'
import type { RuleRegistrar } from '../types.js'

/** ESLint's own `curly` — `@eslint/js` publishes its config, not the rule modules. */
const curlyRule = new Linter({ configType: 'eslintrc' }).getRules().get('curly') as Rule.RuleModule

export const registrar: RuleRegistrar = {
    id: 'curly',
    description: 'A control body takes braces only when it holds more than one statement.',
    scope: {
        include: ['**/*.{ts,tsx}'],
        exclude: [],
    },
    enabled: true,
    severity: 'error',
    options: ['multi'],
    rules: [
        {
            requires: { linter: 'eslint', min: '9.0.0' },
            rule: curlyRule,
        },
    ],
}
