import type {
    CrudRepository,
    Deleteable,
    DocFrom,
    Filter,
    ModelLike,
    RepositoryBuilder,
    Saveable,
} from './Repository.types'

const makeCrud = <M extends ModelLike, D = DocFrom<M>>(Model: M): CrudRepository<M, D> => ({
    find: (filter?: Filter) => Model.find(filter) as Promise<D[]>,
    findById: (id: string) => Model.findById(id) as Promise<D | null>,
    findOne: (filter?: Filter) => Model.findOne(filter) as Promise<D | null>,
    count: (filter?: Filter) => Model.countDocuments(filter),
    create: (input: Partial<D>) => new (Model as unknown as new (input: Partial<D>) => D)(input),
    save: (doc: Saveable<D>) => doc.save(),
    delete: (doc: Deleteable<D>) => doc.deleteOne(),
})

/**
 * Duck-typed CRUD repository builder over a Mongoose-like model, inferring the document type
 * from the model's `findById` return. No mongoose dependency — works with any model/doc-like shape.
 *
 * Contract:
 * - `define(Model)` returns a repository with the full CRUD surface (`find`/`findById`/`findOne`/
 *   `count`/`create`/`save`/`delete`) plus `withQueries`.
 * - `withQueries(queries)` returns a **fresh** repository: the same CRUD plus every supplied query.
 * - On a name collision, the **custom query wins** over the CRUD method (it is spread last).
 * - `withQueries` may be chained; each stage produces a new repository, later queries accumulate,
 *   and a later definition of the same name overrides an earlier one.
 * - Deriving never mutates the parent repository or the supplied queries object.
 *
 * @example
 * const ExercisesRepository = Repository.define(GymExercise)
 *     .withQueries({
 *         findVisibleTo: (userId) => GymExercise.find({ ... }),
 *     })
 */
export const Repository = {
    define: <M extends ModelLike, D = DocFrom<M>>(Model: M): RepositoryBuilder<M, D> => {
        const layer = <Q extends object>(queries: Q): RepositoryBuilder<M, D, Q> => ({
            ...makeCrud<M, D>(Model),
            ...queries,
            withQueries: <Q2 extends object>(next: Q2) => layer({ ...queries, ...next }),
        })
        return layer({})
    },
}
