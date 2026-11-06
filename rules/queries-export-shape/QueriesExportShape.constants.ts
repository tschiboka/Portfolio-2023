export const LeafKeyMessage =
    'A queries leaf must be named use followed by the verb — useGet, usePost.'

export const GroupKeyMessage = 'A queries group must be PascalCase and carry no use prefix.'

export const NestingMessage = 'A queries group holds leaves only; a group does not nest again.'

/** The assertion, as the registrar states it. */
export const Description =
    'A queries object exports use* leaves, and groups them by sub-resource in PascalCase.'

/** The suffix that marks the object every queries file exports. */
export const QueriesSuffix = 'Queries'

/** A leaf key is `use` and the verb alone — `useGetSummary` names a sub-resource, not a verb. */
export const LeafPattern = /^use(Get|Post|Put|Patch|Delete)$/

/** A group key is PascalCase, which a `use` key never is. */
export const GroupPattern = /^[A-Z][A-Za-z0-9]*$/
