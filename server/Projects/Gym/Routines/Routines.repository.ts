import { Repository } from '@common-utils'
import { RoutineModel } from './Routines.models'
import type { IGymRoutine } from './Routines.types'

/** Data-access layer for routines â€” generic CRUD plus routine-specific queries. */
export const RoutinesRepository = Repository.define<typeof RoutineModel, IGymRoutine>(
    RoutineModel,
).withQueries({
    /** Finds the routines a user may see: their own plus any system routines. */
    findVisibleTo: (userId: string): Promise<IGymRoutine[]> =>
        RoutineModel.find({ $or: [{ source: 'system' }, { source: 'user', ownerId: userId }] }),
})
