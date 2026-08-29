import type { GetVisitSummaryResponse, GetVisitResponse, PostVisitResponse } from '@common/types'
import { ApiResponder } from '../../common/utils/Server'
import { DateTime } from '../../common/utils/DateTime'
import { BreakdownModel } from '../Breakdown/Breakdown.model'
import { VisitRepository } from './Visit.repository'
import { VisitSchema } from './Visit.schema'
import type { VisitInput } from './Visit.types'

/** Business logic for visits — persistence via the repository, validation via the schema. */
export const VisitService = {
    /** Returns visits grouped by path, plus the paths that have at least one visit. */
    summary: async (): Promise<GetVisitSummaryResponse> => {
        const visits = await VisitRepository.find()
        const visitsByPath = visits.reduce<Record<string, number>>((grouped, visit) => {
            if (!visit.path) return grouped
            grouped[visit.path] = (grouped[visit.path] ?? 0) + 1
            return grouped
        }, {})
        return { visits: visitsByPath }
    },

    /** Returns the number of visits recorded for a single path. */
    countByPath: async (path: string): Promise<GetVisitResponse> => {
        const visits = await VisitRepository.countByPath(path)
        return { visits }
    },

    /** Records a visit and upserts the daily aggregate for fast breakdown queries. */
    create: async (input: VisitInput): Promise<PostVisitResponse> => {
        const { error } = VisitSchema.validate(input)
        if (error) throw ApiResponder.badRequest(error)

        const visit = VisitRepository.create(input)
        await VisitRepository.save(visit)

        const today = DateTime.Format.to('ApiDate', new Date()) ?? ''
        await BreakdownModel.updateOne(
            { date: today, path: input.path },
            { $inc: { visits: 1 } },
            { upsert: true },
        )

        return { visit: { path: input.path, visitDate: visit.visitDate } }
    },
}
