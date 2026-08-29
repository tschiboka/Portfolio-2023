import { describe, it, expect, vi, expectTypeOf } from 'vitest'
import { Repository } from '../Repository'
import { FakeModel } from './Repository.spec.utils'
import type { TestDoc } from './Repository.spec.types'

describe('Repository.define', () => {
    it('returns a repository with the full CRUD surface and withQueries', () => {
        const repo = Repository.define(FakeModel)
        expect(repo.find).toBeTypeOf('function')
        expect(repo.findById).toBeTypeOf('function')
        expect(repo.findOne).toBeTypeOf('function')
        expect(repo.count).toBeTypeOf('function')
        expect(repo.create).toBeTypeOf('function')
        expect(repo.save).toBeTypeOf('function')
        expect(repo.delete).toBeTypeOf('function')
        expect(repo.withQueries).toBeTypeOf('function')
    })

    it('does not invoke any model method during construction', () => {
        FakeModel.resetDocs([])
        Repository.define(FakeModel)
        expect(FakeModel.find).not.toHaveBeenCalled()
        expect(FakeModel.countDocuments).not.toHaveBeenCalled()
    })

    it('produces independent repository objects per call', () => {
        const a = Repository.define(FakeModel)
        const b = Repository.define(FakeModel)
        expect(a).not.toBe(b)
    })
})

describe('CRUD delegation', () => {
    it('find delegates to FakeModel.find and returns docs unchanged', async () => {
        FakeModel.resetDocs([{ _id: '1', name: 'a' }])
        const repo = Repository.define(FakeModel)
        const result = await repo.find()
        expect(FakeModel.find).toHaveBeenCalledWith(undefined)
        expect(result).toEqual([{ _id: '1', name: 'a' }])
    })

    it('findById delegates and preserves null vs found doc', async () => {
        FakeModel.resetDocs([{ _id: '1', name: 'a' }])
        const repo = Repository.define(FakeModel)
        const found = await repo.findById('1')
        expect(found).toEqual({ _id: '1', name: 'a' })
        expect(await repo.findById('missing')).toBeNull()
        expect(FakeModel.findById).toHaveBeenCalledWith('1')
    })

    it('findOne delegates and preserves null', async () => {
        FakeModel.resetDocs([{ _id: '1', name: 'a' }])
        const repo = Repository.define(FakeModel)
        expect(await repo.findOne({ name: 'a' })).toEqual({ _id: '1', name: 'a' })
        expect(await repo.findOne({ name: 'zzz' })).toBeNull()
        expect(FakeModel.findOne).toHaveBeenCalledWith({ name: 'zzz' })
    })

    it('count delegates and returns the number', async () => {
        FakeModel.resetDocs([{ _id: '1', name: 'a' }])
        const repo = Repository.define(FakeModel)
        expect(await repo.count()).toBe(1)
        expect(FakeModel.countDocuments).toHaveBeenCalledWith(undefined)
    })

    it('create constructs a new instance (not FakeModel.create) without saving', () => {
        FakeModel.resetDocs([])
        const repo = Repository.define(FakeModel)
        const built = repo.create({ name: 'push' })
        expect(built).toBeInstanceOf(FakeModel)
        expect(built.name).toBe('push')
        expect(FakeModel.find).not.toHaveBeenCalled()
    })

    it('save operates on the supplied document via doc.save()', async () => {
        FakeModel.resetDocs([])
        const repo = Repository.define(FakeModel)
        const doc = new FakeModel({ _id: '1', name: 'a' })
        await repo.save(doc)
        expect(doc.save).toHaveBeenCalledTimes(1)
    })

    it('delete operates on the supplied document via doc.deleteOne()', async () => {
        FakeModel.resetDocs([])
        const repo = Repository.define(FakeModel)
        const doc = new FakeModel({ _id: '1', name: 'a' })
        await repo.delete(doc)
        expect(doc.deleteOne).toHaveBeenCalledTimes(1)
    })

    it('propagates rejections from the underlying model', async () => {
        FakeModel.resetDocs([])
        FakeModel.find.mockRejectedValueOnce(new TypeError('boom'))
        const repo = Repository.define(FakeModel)
        await expect(repo.find()).rejects.toThrow('boom')
        FakeModel.find.mockClear()
    })
})

describe('withQueries', () => {
    it('preserves CRUD and adds custom queries', () => {
        FakeModel.resetDocs([{ _id: '1', name: 'a' }])
        const repo = Repository.define(FakeModel).withQueries({
            findVisible: (userId: string) => `visible-${userId}`,
        })
        expect(repo.find).toBeTypeOf('function')
        expect(repo.findVisible('7')).toBe('visible-7')
    })

    it('custom queries override CRUD methods on name collision', () => {
        FakeModel.resetDocs([])
        const repo = Repository.define(FakeModel).withQueries({
            find: () => 'overridden' as never,
        })
        expect(repo.find()).toBe('overridden')
        expect(FakeModel.find).not.toHaveBeenCalled()
    })

    it('does not mutate the parent repository', () => {
        FakeModel.resetDocs([])
        const base = Repository.define(FakeModel)
        const derived = base.withQueries({ findVisible: () => 'x' })
        expect((derived as unknown as { findVisible?: () => string }).findVisible).toBeTypeOf(
            'function',
        )
        expect((base as unknown as { findVisible?: () => string }).findVisible).toBeUndefined()
        expect(base).not.toBe(derived)
    })

    it('chaining accumulates queries and later definitions win', () => {
        FakeModel.resetDocs([])
        const repo = Repository.define(FakeModel)
            .withQueries({ a: () => 1, find: () => 'first' as never })
            .withQueries({ b: () => 2, find: () => 'second' as never })
        expect(repo.a()).toBe(1)
        expect(repo.b()).toBe(2)
        expect(repo.find()).toBe('second')
    })
})

describe('duck typing', () => {
    it('works with a duck-typed document (no mongoose instance) for save/delete', async () => {
        FakeModel.resetDocs([])
        const repo = Repository.define(FakeModel)
        const docish: TestDoc & { save: () => Promise<string>; deleteOne: () => Promise<string> } =
            {
                _id: '1',
                name: 'a',
                save: vi.fn(() => Promise.resolve('saved')),
                deleteOne: vi.fn(() => Promise.resolve('deleted')),
            }
        expect(await repo.save(docish)).toBe('saved')
        expect(await repo.delete(docish)).toBe('deleted')
    })
})

describe('type-level inference', () => {
    it('infers the doc type from the model findById return', () => {
        const repo = Repository.define(FakeModel)
        expectTypeOf(repo.findById).returns.toEqualTypeOf<Promise<TestDoc | null>>()
        expectTypeOf(repo.find).returns.toEqualTypeOf<Promise<TestDoc[]>>()
    })

    it('preserves custom query types through withQueries', () => {
        const repo = Repository.define(FakeModel).withQueries({
            findVisible: (id: string) => `v-${id}`,
        })
        expectTypeOf(repo.findVisible).parameter(0).toEqualTypeOf<string>()
        expectTypeOf(repo.findVisible('x')).toEqualTypeOf<string>()
    })
})
