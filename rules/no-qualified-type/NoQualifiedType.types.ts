import type { Nullable } from '../../common/utils/Generics/Generics.types.js'

/** A node whose parent may be absent, which is all the parent questions need. */
export type WithParent = { parent: Nullable<{ type: string }> }

/** A dotted chain, whose first name is the one that has to be imported. */
export type NameChain = { type: string; name?: string; left?: NameChain }

/** A member chain, whose first name is the one that has to be imported. */
export type MemberChain = { type: string; name?: string; object?: MemberChain }
