import { isDefined } from '../../common/utils/Predicate/Predicate.js'
import type { NodeLike } from './NoInterface.types.js'

const AmbientBlockType = 'TSModuleDeclaration'

/** True for a `declare global` or `declare module` block, where anything inside is ambient. */
const isAmbientBlock = (node: NodeLike): boolean =>
    node.type === AmbientBlockType && node.declare === true

/** True where a declaration sits inside an ambient block, where merging is the only option. */
export const isAmbient = (node: NodeLike): boolean =>
    isDefined(node.parent) && (isAmbientBlock(node.parent) || isAmbient(node.parent))
