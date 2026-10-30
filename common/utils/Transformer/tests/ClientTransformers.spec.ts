import { describe, it, expect } from 'vitest'
import { ClientTransformers } from '..'

describe('ClientTransformers', () => {
    it('should return every verb, whatever the caller supplied', () => {
        const transformer = ClientTransformers({ Get: () => 'get' })

        expect(Object.keys(transformer).sort()).toEqual(['Delete', 'Get', 'Patch', 'Post', 'Put'])
    })

    it.each([
        ['Get', 'get:x'],
        ['Post', 'post:x'],
        ['Put', 'put:x'],
        ['Patch', 'patch:x'],
        ['Delete', 'delete:x'],
    ] as const)('should use the supplied %s verb', (verb, expected) => {
        const transformer = ClientTransformers({
            [verb]: (input: string) => `${verb.toLowerCase()}:${input}`,
        })

        expect(transformer[verb]('x')).toBe(expected)
    })

    it.each(['Get', 'Post', 'Put', 'Patch', 'Delete'] as const)(
        'should throw from an unsupplied %s verb, naming it',
        (verb) => {
            const transformer = ClientTransformers({})

            expect(() => transformer[verb]('x')).toThrow(`${verb} is not implemented`)
        },
    )

    it('should keep a supplied verb even when others are missing', () => {
        const transformer = ClientTransformers({ Post: () => 'post' })

        expect(transformer.Post('x')).toBe('post')
        expect(() => transformer.Get('x')).toThrow('Get is not implemented')
    })

    it('should throw from every verb when given no verbs at all', () => {
        const transformer = ClientTransformers({})

        expect(() => transformer.Get('x')).toThrow('Get is not implemented')
        expect(() => transformer.Post('x')).toThrow('Post is not implemented')
        expect(() => transformer.Put('x')).toThrow('Put is not implemented')
        expect(() => transformer.Patch('x')).toThrow('Patch is not implemented')
        expect(() => transformer.Delete('x')).toThrow('Delete is not implemented')
    })

    it('should pass the input through to the verb unchanged', () => {
        const transformer = ClientTransformers({ Get: (input: number) => `get:${input}` })

        expect(transformer.Get(42)).toBe('get:42')
    })

    it('should map an object input through a field the verb reads', () => {
        const transformer = ClientTransformers({
            Get: (input: { id: string }) => `get:${input.id}`,
        })

        expect(transformer.Get({ id: 'visits' })).toBe('get:visits')
    })

    it('should carry an optional second argument through to the verb', () => {
        const transformer = ClientTransformers<{ name: string }, string, { userId: string }>({
            Post: (input, context) => `post:${input.name}:${context?.userId ?? 'anonymous'}`,
        })

        expect(transformer.Post({ name: 'xmas' }, { userId: 'u1' })).toBe('post:xmas:u1')
    })

    it('should call a context-taking verb with no context at all', () => {
        const transformer = ClientTransformers<{ name: string }, string, { userId: string }>({
            Post: (input, context) => `post:${input.name}:${context?.userId ?? 'anonymous'}`,
        })

        expect(transformer.Post({ name: 'xmas' })).toBe('post:xmas:anonymous')
    })

    it('should keep each verb independent of the others', () => {
        const transformer = ClientTransformers({
            Get: () => 'from-get',
            Post: () => 'from-post',
        })

        expect(transformer.Get('x')).toBe('from-get')
        expect(transformer.Post('x')).toBe('from-post')
    })
})
