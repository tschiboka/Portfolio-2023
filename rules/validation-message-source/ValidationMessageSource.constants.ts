export const Description = 'A validation message is built by ValidationMessage, never written out.'

export const MessageErrorMessage =
    'A validation message must be built by ValidationMessage, so one wording serves every field.'

/**
 * The argument each yup method carries its message in.
 *
 * A method that names none is absent rather than defaulted to a position: `shape` takes fields,
 * `oneOf` takes a list, and guessing a slot for either would report correct code.
 */
export const MessageArguments: Record<string, number> = {
    defined: 0,
    email: 0,
    integer: 0,
    length: 1,
    matches: 1,
    max: 1,
    min: 1,
    negative: 0,
    notOneOf: 1,
    oneOf: 1,
    positive: 0,
    required: 0,
    test: 1,
    url: 0,
    uuid: 0,
}

/** The property a yup options object carries its message in — `.test({ name, message })`. */
export const MessageProperty = 'message'
