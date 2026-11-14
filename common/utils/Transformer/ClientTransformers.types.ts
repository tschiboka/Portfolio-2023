/** Verbs a transformer may implement. Every verb is always present on the result. */
export type TransformerVerb = 'Get' | 'Post' | 'Put' | 'Patch' | 'Delete'

/** One verb's transform. `TContext` carries whatever the transform needs beyond the payload. */
export type TransformerFn<TInput, TOutput, TContext = never> = (
    input: TInput,
    context?: TContext,
) => TOutput

/** What a caller may supply — any subset of the verbs. */
export type TransformerVerbs<TInput, TOutput, TContext = never> = Partial<
    Record<TransformerVerb, TransformerFn<TInput, TOutput, TContext>>
>

/** What a transformer always returns — every verb, each callable. */
export type TransformerSurface<TInput, TOutput, TContext = never> = Record<
    TransformerVerb,
    TransformerFn<TInput, TOutput, TContext>
>
