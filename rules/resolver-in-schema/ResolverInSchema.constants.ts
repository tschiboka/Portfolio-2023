export const Description = 'A schema file exports its own bound resolver.'

export const MissingResolverMessage =
    'A schema file must export its own resolver, so a component reads one instead of building one.'

export const ForeignResolverMessage =
    'A resolver belongs in the schema file it validates, never in the component that reads it.'

/** The member a yup schema is built by — `yup.object(...)`. */
export const SchemaMethod = 'object'

/** The call a resolver is built by. */
export const ResolverName = 'yupResolver'

/** The suffix that names a schema file. */
export const SchemaSuffix = '.schema.ts'
