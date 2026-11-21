import type { Nullable } from '../../common/utils/Generics/Generics.types.js'

/** The part of an import statement this rule reads: its module source, when it has one. */
export type NodeLike = { source?: Nullable<{ value?: unknown; raw?: string }> }
