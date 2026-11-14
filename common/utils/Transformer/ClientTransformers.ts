import type {
    TransformerVerb,
    TransformerVerbs,
    TransformerSurface,
} from './ClientTransformers.types'

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

export type {
    TransformerFn,
    TransformerSurface,
    TransformerVerb,
    TransformerVerbs,
} from './ClientTransformers.types'
