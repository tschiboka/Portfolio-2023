import { Repository } from '@common-utils'
import { ExercisesModel } from './Exercises.model'
import type { IGymExercise } from './Exercises.types'

/** Data-access layer for exercises - generic CRUD plus exercise-specific queries. */
export const ExercisesRepository = Repository.define<typeof ExercisesModel, IGymExercise>(
    ExercisesModel,
).withQueries({
    /** Finds the exercises a user may see: canonical plus their own private ones. */
    findVisibleTo: (userId: string): Promise<IGymExercise[]> =>
        ExercisesModel.find({
            $or: [{ source: 'canonical' }, { source: 'user', ownerId: userId }],
        }),
})
