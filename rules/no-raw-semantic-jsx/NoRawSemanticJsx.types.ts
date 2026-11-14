import type { Rule } from 'eslint'
import type { RuleSeverity } from '../types.js'

/** One raw JSX element, and the `common/ux` components that replace it. */
export type LintRegistration = {
    tag: string
    severity: RuleSeverity
    replacements: string[]
    message: string
}

export type TagNameString = {
    context: Rule.RuleContext
    node: JsxElementNode
}

/**
 * ESLint types no JSX visitor: `Rule.Node` is built from `@types/estree`, which omits JSX, so the
 * shape a `JSXElement` listener receives has to be declared and narrowed rather than imported.
 */
export type JsxElementNode = {
    type: 'JSXElement'
    openingElement: { name: { range: [number, number] } }
}
