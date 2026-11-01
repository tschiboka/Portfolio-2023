/** Duck-typed Mongo ObjectId (its toString() is a 24-char hex string) — no mongoose dep in tests. */
const objectId = (hex: string) => ({ toString: () => hex })

export const ApiTransformersTestUtils = { objectId }
