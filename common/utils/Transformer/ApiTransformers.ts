import { isArray, isObject, isObjectId } from '../Predicate'
import type { Dictionary } from '../Generics'

/** Any object that can serialise itself to a plain object via `toObject()` (e.g. a Mongoose document). */
type SerializableDocument = { toObject(): unknown }

/** Recursively convert `ObjectId`s → strings and strip Mongoose version keys (`__v`/`__t`). */
const toApiValue = (value: unknown): unknown => {
    if (isArray(value)) return value.map(toApiValue)
    if (isObject(value)) {
        if (isObjectId(value)) return String(value)
        return Object.entries(value).reduce<Dictionary>((out, [key, item]) => {
            if (key === '__v' || key === '__t') return out
            out[key] = toApiValue(item)
            return out
        }, {})
    }
    return value
}

/**
 * Server-side transforms from Mongoose documents to client-facing API resources.
 * Distinct from the FE `BaseTransformer` (API-wire shape ↔ app-layer object): this converts raw
 * docs to their API-resource form (ObjectId → string, `__v`/`__t` stripped).
 */
export const ApiTransformers = {
    /**
     * Convert a Mongoose document to its client-facing resource form: `ObjectId`s → strings and
     * `__v`/`__t` stripped (type-safe version of what `res.json` serialises).
     *
     * The result is typed as the caller-provided resource `T`; the deep recursive conversion
     * cannot be statically proven to equal `T`, so the runtime normalisation is asserted once at
     * this boundary.
     */
    toApiResource: <T>(doc: SerializableDocument): T => toApiValue(doc.toObject()) as T,
}
