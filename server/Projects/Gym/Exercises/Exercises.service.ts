import type {
    CurrentUser,
    GymExerciseResource,
    PatchGymExerciseRequest,
} from '../../../../common/types'
import { ApiResponder } from '@common-utils'
import { ApiTransformers } from '@common-utils'
import { isValidObjectId } from '@common-utils'
import { ExercisesRepository } from './Exercises.repository'
import { ExercisesPermissions } from './Exercises.permissions'
import { ExerciseSchema } from './Exercises.schema'
import type { ExerciseValidationInput } from './Exercises.types'

/** Business logic for exercises â€” persistence via the repository, authorisation via permissions. */
export const ExercisesService = {
    /** Lists canonical exercises plus the requesting user's own private ones. */
    listVisibleTo: async (user: CurrentUser): Promise<GymExerciseResource[]> => {
        const exercises = await ExercisesRepository.findVisibleTo(user._id)
        return exercises.map(ApiTransformers.toApiResource<GymExerciseResource>)
    },

    /** Creates a canonical exercise from validated input. */
    create: async (input: ExerciseValidationInput): Promise<GymExerciseResource> => {
        const { error, value } = ExerciseSchema.validate(input)
        if (error) throw ApiResponder.badRequest(error)

        const exercise = ExercisesRepository.create({ ...value, source: 'canonical' })
        await ExercisesRepository.save(exercise)

        return ApiTransformers.toApiResource<GymExerciseResource>(exercise)
    },

    /** Updates an exercise the user is allowed to modify. */
    update: async (
        id: string,
        patch: PatchGymExerciseRequest,
        user: CurrentUser,
    ): Promise<GymExerciseResource> => {
        if (!isValidObjectId(id)) throw ApiResponder.invalidId('exercise')

        const exercise = await ExercisesRepository.findById(id)
        if (!exercise) throw ApiResponder.notFound('exercise')
        ExercisesPermissions.requireUserCanModify(exercise, user)

        const { error } = ExerciseSchema.validate({ ...exercise.toObject(), ...patch })
        if (error) throw ApiResponder.badRequest(error)

        exercise.set(patch)
        await ExercisesRepository.save(exercise)

        return ApiTransformers.toApiResource<GymExerciseResource>(exercise)
    },

    /** Deletes an exercise the user is allowed to modify. */
    remove: async (id: string, user: CurrentUser): Promise<void> => {
        if (!isValidObjectId(id)) throw ApiResponder.invalidId('exercise')

        const exercise = await ExercisesRepository.findById(id)
        if (!exercise) throw ApiResponder.notFound('exercise')

        ExercisesPermissions.requireUserCanModify(exercise, user)
        await ExercisesRepository.delete(exercise)
    },
}
