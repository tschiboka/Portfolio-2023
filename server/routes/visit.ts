import express from 'express'
import { Visit, validateVisit } from '../models/visit'
import {
    GetVisitQuery,
    GetVisitResponse,
    GetVisitSummaryResponse,
    PostVisitError,
    PostVisitRequest,
    PostVisitResponse,
    TypedRequest,
    TypedResponse,
} from '@common/types'
import { HttpStatus } from '../common/HttpStatus/HttpStatus'

const router = express.Router()

type GetVisitReq = TypedRequest<{ query: GetVisitQuery }>
type GetVisitRes = TypedResponse<GetVisitSummaryResponse | GetVisitResponse>

router.get('/', async (req: GetVisitReq, res: GetVisitRes) => {
    const path = req.query.path

    if (!path) {
        const visits = await Visit.find()
        const groupedVisits: Record<string, number> = {}
        visits.forEach((visit) => {
            if (!visit.path) return
            if (!groupedVisits[visit.path]) groupedVisits[visit.path] = 1
            else groupedVisits[visit.path] = groupedVisits[visit.path] + 1
        })
        res.status(HttpStatus.OK).json({ success: true, visits: groupedVisits })
    } else {
        const visits = await Visit.find({ path: path })
        res.status(HttpStatus.OK).json({ success: true, visits: visits.length })
    }
})

type PostVisitReq = TypedRequest<{ body: PostVisitRequest }>
type PostVisitRes = TypedResponse<PostVisitResponse | PostVisitError>

router.post('/', async (req: PostVisitReq, res: PostVisitRes) => {
    if (!req.body)
        return res.status(HttpStatus.BAD_REQUEST).json({ success: false, error: 'Bad Content' })

    const { error } = validateVisit(req.body)
    if (error)
        return res
            .status(HttpStatus.UNPROCESSABLE_ENTITY)
            .json({ success: false, error: error.details[0].message })
    const visit = new Visit(req.body)

    await visit.save()
    res.status(HttpStatus.OK).json({ success: true, visit })
})

export default router
