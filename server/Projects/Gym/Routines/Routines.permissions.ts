import { requireAdminManaged, requireOwned } from '@utils'
import type { CurrentUser } from '../../../../common/types'
import type { RoutineOwnership } from './Routines.types'

/** Authorisation rules for routines. */
export const RoutinesPermissions = {
    /**
     * Throws FORBIDDEN unless the user may modify the routine: admins may touch system
     * routines; a user routine may only be changed by its owner.
     */
    requireUserCanModify: (routine: RoutineOwnership, user: CurrentUser): void => {
        requireAdminManaged(routine, user, 'system')
        requireOwned(routine, user)
    },
}
