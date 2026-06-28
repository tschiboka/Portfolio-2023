export abstract class BaseTransformer<TInput, TOutput> {
    Get(_input: TInput): TOutput {
        throw new Error('Get is not implemented')
    }

    Post(input: TInput): TOutput {
        return this.Get(input)
    }

    Put(input: TInput): TOutput {
        return this.Get(input)
    }

    Patch(input: TInput): TOutput {
        return this.Get(input)
    }

    Delete(input: TInput): TOutput {
        return this.Get(input)
    }
}
