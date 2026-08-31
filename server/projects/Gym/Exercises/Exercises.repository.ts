import { Repository } from '@common-utils'
import { ExerciseModel } from './Exercises.models'
import type { IGymExercise } from './Exercises.types'

/** Data-access layer for exercises â€” generic CRUD plus exercise-specific queries. */
export const ExercisesRepository = Repository.define<typeof ExerciseModel, IGymExercise>(
    ExerciseModel,
).withQueries({
    /** Finds the exercises a user may see: canonical plus their own private ones. */
    findVisibleTo: (userId: string): Promise<IGymExercise[]> =>
        ExerciseModel.find({ $or: [{ source: 'canonical' }, { source: 'user', ownerId: userId }] }),
})
