/** An expression, narrowed to the parts a comparison is read from. */
export type ExpressionLike = {
    type: string
    operator?: string
    left?: ExpressionLike
    right?: ExpressionLike
    callee?: ExpressionLike
    object?: ExpressionLike
    argument?: ExpressionLike
    expression?: ExpressionLike
    computed?: boolean
    property?: { type: string; name?: string; value?: unknown }
    name?: string
    value?: unknown
}

/** What a comparison restates, named for the predicate family that already asks it. */
export type ShapeKind = 'length' | 'nullish' | 'typeof' | 'instance' | 'array' | 'truthy'
