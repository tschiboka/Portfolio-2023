/** A type node, narrowed to the parts a written shape is read from. */
export type TypeLike = {
    type: string
    operator?: string
    types?: TypeLike[]
    params?: TypeLike[]
    typeName?: { type: string; name?: string }
    elementType?: TypeLike
    elementTypes?: TypeLike[]
    typeAnnotation?: TypeLike
    typeArguments?: { params?: TypeLike[] }
    objectType?: TypeLike
    indexType?: TypeLike
    returnType?: TypeLike
    constraint?: TypeLike
    nameType?: TypeLike
    falseType?: TypeLike
}

/** The source a node was written from, so a shape compares what the author typed. */
export type TextOf = (node: TypeLike) => string

/** One written shape, and the generic that already says it. */
export type AliasShape = {
    alias: string
    message: string
    matches: (node: TypeLike, text: TextOf) => boolean
}
