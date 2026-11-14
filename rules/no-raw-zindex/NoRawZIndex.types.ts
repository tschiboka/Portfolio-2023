import type { Rule } from 'eslint'
import type { Defined } from '../../common/utils/Generics/Generics.types.js'

/** The node the parser hands the listener, read from its own signature. */
export type PropertyNode = Parameters<Defined<Rule.NodeListener['Property']>>[0]

/** An AST node seen as its type plus whatever fields the check reads. */
export type AstNode = { type: string; [field: string]: unknown }
