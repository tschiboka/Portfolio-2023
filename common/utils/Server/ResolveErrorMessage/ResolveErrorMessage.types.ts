import type { Optional } from '../../Generics'

/** A tolerated validation-result shape exposing a human-readable message. */
export type ValidationResultLike = {
    error: Optional<{
        details: Optional<Array<{ message: string }>>
        message: string
    }>
}
