import { Repository } from '@common-utils'
import { RoutinesModel } from './Routines.model'
import type { IGymRoutine } from './Routines.types'

/** Data-access layer for routines - generic CRUD plus routine-specific queries. */
export const RoutinesRepository = Repository.define<typeof RoutinesModel, IGymRoutine>(
    RoutinesModel,
).withQueries({
    /** Finds the routines a user may see: their own plus any system routines. */
    findVisibleTo: (userId: string): Promise<IGymRoutine[]> =>
        RoutinesModel.find({ $or: [{ source: 'system' }, { source: 'user', ownerId: userId }] }),
})
