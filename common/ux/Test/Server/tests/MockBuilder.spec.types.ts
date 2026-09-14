/** Minimal shape used to exercise `MockBuilder` generic inference. */
export type MockItem = {
    id: number
    name: string
    status: string
    meta: {
        hits: number
    }
}
