import { Repository } from '../../common/utils/Server'
import { VisitModel } from './Visit.model'
import type { IVisit } from './Visit.types'

/** Data-access layer for visits — generic CRUD over the visit model. */
export const VisitRepository = Repository.define<typeof VisitModel, IVisit>(VisitModel).withQueries(
    {
        countByPath: (path: string) => VisitModel.countDocuments({ path }),
    },
)
