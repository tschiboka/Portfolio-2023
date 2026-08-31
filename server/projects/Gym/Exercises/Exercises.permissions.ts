import { requireAdminManaged, requireOwned } from '@common-utils'
import type { CurrentUser } from '../../../../common/types'
import type { ExerciseOwnership } from './Exercises.types'

/** Authorisation rules for exercises. */
export const ExercisesPermissions = {
    /**
     * Throws FORBIDDEN unless the user may modify the exercise: admins may touch canonical
     * exercises; a user exercise may only be changed by its owner.
     */
    requireUserCanModify: (exercise: ExerciseOwnership, user: CurrentUser): void => {
        requireAdminManaged(exercise, user, 'canonical')
        requireOwned(exercise, user)
    },
}
