import { describe, it, expect, vi, expectTypeOf } from 'vitest'
import { RepositoryTestUtils } from './Repository.spec.utils'
import { Repository } from '..'
import type { TestDoc } from './Repository.spec.types'

const { FakeModel } = RepositoryTestUtils

describe('Repository.define', () => {
    it('should return a repository with the full CRUD surface and withQueries', () => {
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

    it('should not invoke any model method during construction', () => {
        FakeModel.resetDocs([])
        Repository.define(FakeModel)
        expect(FakeModel.find).not.toHaveBeenCalled()
        expect(FakeModel.countDocuments).not.toHaveBeenCalled()
    })

    it('should produce independent repository objects per call', () => {
        const a = Repository.define(FakeModel)
        const b = Repository.define(FakeModel)
        expect(a).not.toBe(b)
    })
})

describe('CRUD delegation', () => {
    it('should delegate to FakeModel.find and return the docs unchanged', async () => {
        FakeModel.resetDocs([{ _id: '1', name: 'a' }])
        const repo = Repository.define(FakeModel)
        const result = await repo.find()
        expect(FakeModel.find).toHaveBeenCalledWith(undefined)
        expect(result).toEqual([{ _id: '1', name: 'a' }])
    })

    it('should delegate to FakeModel.findById and preserve null versus a found doc', async () => {
        FakeModel.resetDocs([{ _id: '1', name: 'a' }])
        const repo = Repository.define(FakeModel)
        const found = await repo.findById('1')
        expect(found).toEqual({ _id: '1', name: 'a' })
        expect(await repo.findById('missing')).toBeNull()
        expect(FakeModel.findById).toHaveBeenCalledWith('1')
    })

    it('should delegate to FakeModel.findOne and preserve null', async () => {
        FakeModel.resetDocs([{ _id: '1', name: 'a' }])
        const repo = Repository.define(FakeModel)
        expect(await repo.findOne({ name: 'a' })).toEqual({ _id: '1', name: 'a' })
        expect(await repo.findOne({ name: 'zzz' })).toBeNull()
        expect(FakeModel.findOne).toHaveBeenCalledWith({ name: 'zzz' })
    })

    it('should delegate the count query and return the number', async () => {
        FakeModel.resetDocs([{ _id: '1', name: 'a' }])
        const repo = Repository.define(FakeModel)
        expect(await repo.count()).toBe(1)
        expect(FakeModel.countDocuments).toHaveBeenCalledWith(undefined)
    })

    it('should construct a new instance (not FakeModel.create) without saving', () => {
        FakeModel.resetDocs([])
        const repo = Repository.define(FakeModel)
        const built = repo.create({ name: 'push' })
        expect(built).toBeInstanceOf(FakeModel)
        expect(built.name).toBe('push')
        expect(FakeModel.find).not.toHaveBeenCalled()
    })

    it('should operate on the supplied document via doc.save()', async () => {
        FakeModel.resetDocs([])
        const repo = Repository.define(FakeModel)
        const doc = new FakeModel({ _id: '1', name: 'a' })
        await repo.save(doc)
        expect(doc.save).toHaveBeenCalledTimes(1)
    })

    it('should operate on the supplied document via doc.deleteOne()', async () => {
        FakeModel.resetDocs([])
        const repo = Repository.define(FakeModel)
        const doc = new FakeModel({ _id: '1', name: 'a' })
        await repo.delete(doc)
        expect(doc.deleteOne).toHaveBeenCalledTimes(1)
    })

    it('should propagate rejections from the underlying model', async () => {
        FakeModel.resetDocs([])
        FakeModel.find.mockRejectedValueOnce(new TypeError('boom'))
        const repo = Repository.define(FakeModel)
        await expect(repo.find()).rejects.toThrow('boom')
        FakeModel.find.mockClear()
    })
})

describe('withQueries', () => {
    it('should preserve CRUD and adds custom queries', () => {
        FakeModel.resetDocs([{ _id: '1', name: 'a' }])
        const repo = Repository.define(FakeModel).withQueries({
            findVisible: (userId: string) => `visible-${userId}`,
        })
        expect(repo.find).toBeTypeOf('function')
        expect(repo.findVisible('7')).toBe('visible-7')
    })

    it('should let a custom query override the CRUD method on a name collision', () => {
        FakeModel.resetDocs([])
        const repo = Repository.define(FakeModel).withQueries({
            find: () => 'overridden' as never,
        })
        expect(repo.find()).toBe('overridden')
        expect(FakeModel.find).not.toHaveBeenCalled()
    })

    it('should not mutate the parent repository', () => {
        FakeModel.resetDocs([])
        const base = Repository.define(FakeModel)
        const derived = base.withQueries({ findVisible: () => 'x' })
        expect((derived as unknown as { findVisible?: () => string }).findVisible).toBeTypeOf(
            'function',
        )
        expect((base as unknown as { findVisible?: () => string }).findVisible).toBeUndefined()
        expect(base).not.toBe(derived)
    })

    it('should accumulate queries and let the later definition win', () => {
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
    it('should work with a duck-typed document (no mongoose instance) for save/delete', async () => {
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
    it('should infer the doc type from the model findById return', () => {
        const repo = Repository.define(FakeModel)
        expectTypeOf(repo.findById).returns.toEqualTypeOf<Promise<TestDoc | null>>()
        expectTypeOf(repo.find).returns.toEqualTypeOf<Promise<TestDoc[]>>()
    })

    it('should preserve custom query types through withQueries', () => {
        const repo = Repository.define(FakeModel).withQueries({
            findVisible: (id: string) => `v-${id}`,
        })
        expectTypeOf(repo.findVisible).parameter(0).toEqualTypeOf<string>()
        expectTypeOf(repo.findVisible('x')).toEqualTypeOf<string>()
    })
})
