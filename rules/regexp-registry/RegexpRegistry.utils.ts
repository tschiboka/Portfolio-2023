import { isDefined } from '../../common/utils/Predicate/Predicate.js'
import type { NodeLike } from './RegexpRegistry.types.js'

const RegexpName = 'RegExp'

/** True where a literal node is a regular expression rather than a plain value. */
export const isRegexLiteral = (node: NodeLike): boolean => isDefined(node.regex)

/** True where a node builds a pattern of its own instead of reading the catalogue. */
export const buildsPattern = (node: NodeLike): boolean => node.callee?.name === RegexpName
