import type { Dictionary } from '../../Generics'

/** The document type a model's `findById` resolves to (duck-typed, no mongoose dep). */
export type DocFrom<M> = M extends { findById: (id: string) => Promise<infer D | null> } ? D : never

/** A doc that supports `.save()` (duck-typed). */
export type Saveable<D> = D & { save: () => Promise<unknown> }

/** A doc that supports `.deleteOne()` (duck-typed). */
export type Deleteable<D> = D & { deleteOne: () => Promise<unknown> }

/** A Mongo query filter (duck-typed as a plain object). */
export type Filter = Dictionary

/** The generic CRUD methods every repository starts with. `D` is the document type. */
export type CrudRepository<M, D = DocFrom<M>> = {
    find: (filter?: Filter) => Promise<D[]>
    findById: (id: string) => Promise<D | null>
    findOne: (filter?: Filter) => Promise<D | null>
    count: (filter?: Filter) => Promise<number>
    create: (input: Partial<D>) => D
    save: (doc: Saveable<D>) => Promise<unknown>
    delete: (doc: Deleteable<D>) => Promise<unknown>
}

/** A Mongoose-like model exposing the query methods the CRUD layer relies on. */
export type ModelLike = {
    find: (filter?: Filter) => Promise<unknown[]>
    findById: (id: string) => Promise<unknown>
    findOne: (filter?: Filter) => Promise<unknown>
    countDocuments: (filter?: Filter) => Promise<number>
}

/**
 * The builder returned by `Repository.define`: CRUD plus `.withQueries()` to layer feature queries.
 * `withQueries` is re-exposed so chaining accumulates; later definitions of the same name win.
 * `D` is the document type the CRUD methods operate on; `Q` is the accumulated set of custom
 * queries added so far.
 */
export type RepositoryBuilder<M, D = DocFrom<M>, Q extends object = object> = CrudRepository<M, D> &
    Q & {
        withQueries: <Q2 extends object>(queries: Q2) => RepositoryBuilder<M, D, Q & Q2>
    }
