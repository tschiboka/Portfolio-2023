import { Permissions } from '@common-utils'
import type { RoutineOwnership } from './Routines.types'
import type { CurrentUser } from '../../../../common/types'

/** Authorisation rules for routines. */
export const RoutinesPermissions = {
    /**
     * Throws FORBIDDEN unless the user may modify the routine: admins may touch system
     * routines; a user routine may only be changed by its owner.
     */
    requireUserCanModify: (routine: RoutineOwnership, user: CurrentUser): void => {
        Permissions.requireAdminManaged(routine, user, 'system')
        Permissions.requireOwned(routine, user)
    },
}
