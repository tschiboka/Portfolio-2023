export const MissingMessage =
    'A TODO opens with its reference — `TODO: [0009] - what remains`, never with the note first.'

export const MalformedMessage =
    'A TODO reference is `[0009]` or `[ABC-0009]` — 1 to 3 capitals, a dash, then 1 to 6 digits.'

export const UnresolvedMessage = 'A TODO reference must name a document that exists in `docs/`.'

/** The assertion, as the registrar states it. */
export const Description = 'A TODO opens with a ticket reference, and that ticket has a document.'

/** The word that opens a TODO — bounded, so a `TODOS` heading is left alone. */
export const TodoWord = /\bTODO\b/

/** The reference a TODO opens with, once an optional colon is passed. */
export const TodoRef = /\bTODO\b\s*:?\s*\[([^\]]+)\]/

/** A core reference, `0009`, or a project one, `ABC-0009`. */
export const RefShape = /^(?:\d{1,6}|[A-Z]{1,3}-\d{1,6})$/

/** The folder every ticket document sits in. */
export const DocumentsFolder = 'docs'
