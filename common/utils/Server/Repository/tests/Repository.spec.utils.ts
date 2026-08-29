import { vi } from 'vitest'
import type { Dictionary } from '../../../Generics'
import type { TestDoc } from './Repository.spec.types'

/** A duck-typed model-like fixture: static query methods + a constructor that builds docs. */
export class FakeModel {
    static docs: TestDoc[] = []
    static resetDocs = (seed: TestDoc[]): void => {
        FakeModel.docs = [...seed]
        FakeModel.find.mockClear()
        FakeModel.findById.mockClear()
        FakeModel.findOne.mockClear()
        FakeModel.countDocuments.mockClear()
    }
    static find = vi.fn(
        (filter?: Dictionary): Promise<TestDoc[]> =>
            Promise.resolve(
                FakeModel.docs.filter((d) =>
                    filter
                        ? (Object.keys(filter) as (keyof TestDoc)[]).every(
                              (k) => d[k] === filter[k],
                          )
                        : true,
                ),
            ),
    )
    static findById = vi.fn(
        (id: string): Promise<TestDoc | null> =>
            Promise.resolve(FakeModel.docs.find((d) => d._id === id) ?? null),
    )
    static findOne = vi.fn(async (filter?: Dictionary): Promise<TestDoc | null> => {
        const all = await FakeModel.find(filter)
        return all[0] ?? null
    })
    static countDocuments = vi.fn((): Promise<number> => Promise.resolve(FakeModel.docs.length))

    _id: string
    name: string
    save = vi.fn((): Promise<this> => Promise.resolve(this))
    deleteOne = vi.fn((): Promise<unknown> => Promise.resolve({ deletedCount: 1 }))

    constructor(input: Partial<TestDoc>) {
        this._id = input._id ?? `id-${FakeModel.docs.length + 1}`
        this.name = input.name ?? ''
    }
}

/** Convenience for building a document fixture. */
export const makeDoc = (input: Partial<TestDoc> = {}): TestDoc => ({
    _id: input._id ?? '1',
    name: input.name ?? 'a',
})
