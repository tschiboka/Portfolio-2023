/** An AST node, narrowed to the fields a chain read needs. */
export type NodeLike = {
    type: string
    name?: string
}

/** An import, narrowed to the module it names. */
export type SourceLike = {
    source: { value?: unknown }
}

/** An import specifier, narrowed to the local name it binds. */
export type SpecifierLike = NodeLike & {
    local?: NodeLike
}

/** An import, narrowed to the specifiers it binds. */
export type SpecifierListLike = {
    specifiers: SpecifierLike[]
}

/** A member chain, whose object may be the binding itself. */
export type MemberChainLike = NodeLike & {
    object?: NodeLike
    property?: NodeLike
}

/** A dotted chain, whose left side may be the binding itself. */
export type NameChainLike = NodeLike & {
    left?: NodeLike
    right?: NodeLike
}
