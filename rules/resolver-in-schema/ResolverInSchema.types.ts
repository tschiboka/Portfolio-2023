/** A callee, narrowed to the name a call is made under, or the member it is made on. */
export type CalleeLike = {
    type: string
    name?: string
    computed?: boolean
    property?: {
        type: string
        name?: string
    }
}
