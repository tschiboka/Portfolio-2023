import type {
    CurrentUser,
    GymRoutineResource,
    PatchGymRoutineRequest,
    PostGymRoutineRequest,
} from '@common/types'
import { ApiResponder } from '../../../../common/utils/Server'
import { ApiTransformers } from '../../../../common/utils/Transformer'
import { isValidObjectId } from '../../../../common/utils/Predicate'
import { RoutinesRepository } from './Routines.repository'
import { RoutinesPermissions } from './Routines.permissions'
import { RoutineSchema } from './Routines.schema'

/** Business logic for routines — persistence via the repository, authorisation via permissions. */
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
        const { error, value } = RoutineSchema.validate({
            ...input,
            source: 'user',
            ownerId: user._id,
        })
        if (error) throw ApiResponder.badRequest(error)

        const routine = RoutinesRepository.create(value)
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
