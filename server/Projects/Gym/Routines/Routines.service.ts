import mongoose from 'mongoose'
import { ApiResponder, ApiTransformers, isValidObjectId } from '@common-utils'
import { RoutinesRepository } from './Routines.repository'
import { RoutinesPermissions } from './Routines.permissions'
import { RoutineSchema } from './Routines.schema'
import type {
    CurrentUser,
    GymRoutineResource,
    PatchGymRoutineRequest,
    PostGymRoutineRequest,
} from '../../../../common/types'

/** Business logic for routines - persistence via the repository, authorisation via permissions. */
export const RoutinesService = {
    /** Lists the requesting user's own routines plus any system routines. */
    listVisibleTo: async (user: CurrentUser): Promise<GymRoutineResource[]> => {
        const routines = await RoutinesRepository.findVisibleTo(user._id)
        return routines.map(ApiTransformers.toApiResource<GymRoutineResource>)
    },

    /** Creates a user-owned routine from validated input. */
    create: async (
        input: PostGymRoutineRequest,
        user: CurrentUser,
    ): Promise<GymRoutineResource> => {
        const result = RoutineSchema.validate({
            ...input,
            source: 'user',
            ownerId: user._id.toString(),
        })
        if (result.error) throw ApiResponder.badRequest(result.error)
        const { value } = result

        const routine = RoutinesRepository.create({
            ...value,
            ownerId: new mongoose.Types.ObjectId(String(value.ownerId)),
            entries: value.entries.map(({ exerciseId, order }) => ({
                exerciseId: new mongoose.Types.ObjectId(exerciseId),
                order,
            })),
        })
        await RoutinesRepository.save(routine)

        return ApiTransformers.toApiResource<GymRoutineResource>(routine)
    },

    /** Updates a routine the user is allowed to modify. */
    update: async (
        id: string,
        patch: PatchGymRoutineRequest,
        user: CurrentUser,
    ): Promise<GymRoutineResource> => {
        if (!isValidObjectId(id)) throw ApiResponder.invalidId('routine')

        const routine = await RoutinesRepository.findById(id)
        if (!routine) throw ApiResponder.notFound('routine')
        RoutinesPermissions.requireUserCanModify(routine, user)

        const { error } = RoutineSchema.validate({ ...routine.toObject(), ...patch })
        if (error) throw ApiResponder.badRequest(error)

        routine.set(patch)
        await RoutinesRepository.save(routine)

        return ApiTransformers.toApiResource<GymRoutineResource>(routine)
    },

    /** Deletes a routine the user is allowed to modify. */
    remove: async (id: string, user: CurrentUser): Promise<void> => {
        if (!isValidObjectId(id)) throw ApiResponder.invalidId('routine')

        const routine = await RoutinesRepository.findById(id)
        if (!routine) throw ApiResponder.notFound('routine')

        RoutinesPermissions.requireUserCanModify(routine, user)
        await RoutinesRepository.delete(routine)
    },
}
