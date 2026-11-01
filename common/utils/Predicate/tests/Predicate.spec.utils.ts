/** Valid 24-char lowercase hex ObjectId string. */
const objectIdHex = '64b000000000000000000000'

/** Duck-typed Mongo ObjectId: an object whose String() form is the given value. */
const objectId = (asString: string) => ({ toString: () => asString })

const statuses = ['active', 'inactive'] as const

export const PredicateTestUtils = { objectIdHex, objectId, statuses }
