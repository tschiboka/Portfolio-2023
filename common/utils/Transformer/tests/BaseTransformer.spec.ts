import { describe, it, expect } from 'vitest'
import { BaseTransformer } from '../BaseTransformer'

/** Minimal concrete transformer: overrides Get only, the rest default to Get. */
class GetOnlyTransformer<T> extends BaseTransformer<T, string> {
    Get(input: T): string {
        return `get:${String(input)}`
    }
}

/** Concrete transformer that overrides every method independently. */
class FullTransformer<T> extends BaseTransformer<T, string> {
    Get(input: T): string {
        return `get:${String(input)}`
    }
    Post(input: T): string {
        return `post:${String(input)}`
    }
    Put(input: T): string {
        return `put:${String(input)}`
    }
    Patch(input: T): string {
        return `patch:${String(input)}`
    }
    Delete(input: T): string {
        return `delete:${String(input)}`
    }
}

describe('BaseTransformer', () => {
    it('throws by default from Get (abstract contract)', () => {
        class BareTransformer extends BaseTransformer<unknown, unknown> {}
        const transformer = new BareTransformer()
        expect(() => transformer.Get('anything')).toThrow('Get is not implemented')
    })

    it('delegates Post to Get by default', () => {
        const transformer = new GetOnlyTransformer<string>()
        expect(transformer.Post('x')).toBe('get:x')
    })

    it('delegates Put to Get by default', () => {
        const transformer = new GetOnlyTransformer<string>()
        expect(transformer.Put('x')).toBe('get:x')
    })

    it('delegates Patch to Get by default', () => {
        const transformer = new GetOnlyTransformer<string>()
        expect(transformer.Patch('x')).toBe('get:x')
    })

    it('delegates Delete to Get by default', () => {
        const transformer = new GetOnlyTransformer<string>()
        expect(transformer.Delete('x')).toBe('get:x')
    })

    it('uses an overridden Post instead of Get', () => {
        const transformer = new FullTransformer<string>()
        expect(transformer.Post('x')).toBe('post:x')
        expect(transformer.Get('x')).toBe('get:x')
    })

    it('uses overridden Put, Patch and Delete independently', () => {
        const transformer = new FullTransformer<string>()
        expect(transformer.Put('x')).toBe('put:x')
        expect(transformer.Patch('x')).toBe('patch:x')
        expect(transformer.Delete('x')).toBe('delete:x')
    })

    it('passes the input through to Get unchanged', () => {
        const transformer = new GetOnlyTransformer<number>()
        expect(transformer.Get(42)).toBe('get:42')
    })

    it('handles non-string inputs via the subclass mapping', () => {
        const transformer = new GetOnlyTransformer<object>()
        expect(transformer.Get({ a: 1 })).toBe('get:[object Object]')
    })

    it('throws from every default method on a bare subclass', () => {
        class BareTransformer extends BaseTransformer<unknown, unknown> {}
        const transformer = new BareTransformer()
        expect(() => transformer.Post('x')).toThrow('Get is not implemented')
        expect(() => transformer.Put('x')).toThrow('Get is not implemented')
        expect(() => transformer.Patch('x')).toThrow('Get is not implemented')
        expect(() => transformer.Delete('x')).toThrow('Get is not implemented')
    })

    it('preserves instance method dispatch when delegating', () => {
        // Dispatch goes through this.Get, so subclasses that override Get win over the base throw.
        const transformer = new GetOnlyTransformer<string>()
        expect(transformer.Get('a')).toBe('get:a')
        expect(transformer.Post('a')).toBe('get:a')
    })
})
