import type { Rule } from 'eslint'
import { ViolationPrefix } from './constants.js'
import type { RuleRegistrar } from './types.js'

/** Adds the prefix when the report carries a message; a `messageId` report passes through. */
const prefixed = (descriptor: Rule.ReportDescriptor): Rule.ReportDescriptor =>
    'message' in descriptor
        ? { ...descriptor, message: `${ViolationPrefix}${descriptor.message}` }
        : descriptor

/** A context that shadows ESLint's non-writable `report` with a prefixing one. */
const prefixingContext = (context: Rule.RuleContext): Rule.RuleContext => {
    /** `Object.create` is typed `any`, hence the assertion. */
    const derived = Object.create(context) as Rule.RuleContext

    return Object.defineProperty(derived, 'report', {
        value: (descriptor: Rule.ReportDescriptor) => context.report(prefixed(descriptor)),
        writable: true,
        configurable: true,
        enumerable: true,
    })
}

/** Wraps a rule so every report it makes carries the prefix. */
export const withViolationPrefix = (rule: Rule.RuleModule): Rule.RuleModule => ({
    ...rule,
    create: (context) => rule.create(prefixingContext(context)),
})

/** A registrar whose rules all report with the prefix. */
export const withPrefixedReports = (registrar: RuleRegistrar): RuleRegistrar => {
    const [rule] = registrar.rules

    return {
        ...registrar,
        rules: [{ ...rule, rule: withViolationPrefix(rule.rule) }],
    }
}
