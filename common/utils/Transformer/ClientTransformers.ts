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

/**
 * Builds a `<Domain>Transformer` — every verb is on the result, always:
 * `DomainTransformers.Get('visits')` and `.Post(payload)` both type-check.
 *
 * A verb the caller did not implement throws when called, naming the missing verb, so the
 * surface is complete but nothing is silently mapped by the wrong rule.
 */
export const ClientTransformers = <TInput, TOutput, TContext = never>(
    verbs: TransformerVerbs<TInput, TOutput, TContext>,
): TransformerSurface<TInput, TOutput, TContext> => {
    const notImplemented = (verb: TransformerVerb) => (): never => {
        throw new Error(`${verb} is not implemented`)
    }

    return {
        Get: verbs.Get ?? notImplemented('Get'),
        Post: verbs.Post ?? notImplemented('Post'),
        Put: verbs.Put ?? notImplemented('Put'),
        Patch: verbs.Patch ?? notImplemented('Patch'),
        Delete: verbs.Delete ?? notImplemented('Delete'),
    }
}
