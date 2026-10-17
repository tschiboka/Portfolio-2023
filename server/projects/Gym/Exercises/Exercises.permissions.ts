import { Permissions } from '@common-utils'
import type { ExerciseOwnership } from './Exercises.types'
import type { CurrentUser } from '../../../../common/types'

/** Authorisation rules for exercises. */
export const ExercisesPermissions = {
    /**
     * Throws FORBIDDEN unless the user may modify the exercise: admins may touch canonical
     * exercises; a user exercise may only be changed by its owner.
     */
    requireUserCanModify: (exercise: ExerciseOwnership, user: CurrentUser): void => {
        Permissions.requireAdminManaged(exercise, user, 'canonical')
        Permissions.requireOwned(exercise, user)
    },
}
