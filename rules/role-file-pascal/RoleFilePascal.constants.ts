export const ErrorMessage =
    'A role file is named `<Stem>.<role>.<ext>` — the stem opens uppercase, as in `Contact.schema.ts`.'

/** The assertion, as the registrar states it. */
export const Description = "A role file's stem is PascalCase."

/** A filename whose last two segments are a stem and a role — `Contact.schema.ts`. */
export const NamedFile = /^(.+)\.([A-Za-z][A-Za-z0-9]*)\.(?:ts|tsx)$/
