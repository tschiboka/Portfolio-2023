/** An argument, narrowed to the literal a bound or a pattern can be read from. */
export type ValueNode = {
    type: string
    value?: unknown
    regex?: unknown
}

/** A callee, narrowed to the member a call is made on. */
export type CalleeLike = {
    type: string
    computed?: boolean
    property?: {
        type: string
        name?: string
    }
}
