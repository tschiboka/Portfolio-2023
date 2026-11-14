/** Any object that can serialise itself to a plain object via `toObject()` (e.g. a Mongoose document). */
export type SerializableDocument = { toObject(): unknown }
