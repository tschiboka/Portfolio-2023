import express, { Request, Response } from 'express'
import { Visit, validateVisit } from '../models/visit'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    const path = req.query.path

    if (!path) {
        const visits = await Visit.find()
        const groupedVisits: Record<string, number> = {}
        visits.forEach((visit: any) => {
            if (!groupedVisits[visit.path]) groupedVisits[visit.path] = 1
            else groupedVisits[visit.path] = groupedVisits[visit.path] + 1
        })
        res.status(200).json({ success: true, visits: groupedVisits })
    } else {
        const visits = await Visit.find({ path: path })
        res.status(200).json({ success: true, visits: visits.length })
    }
})

router.post('/', async (req: Request, res: Response) => {
    if (!req.body) return res.status(400).json({ success: false, error: 'Bad Content' })

    const { error } = validateVisit(req.body)
    if (error) return res.status(422).json({ success: false, error: error.details[0].message })
    const visit = new Visit(req.body)

    await visit.save()
    res.status(200).json({ success: true, visit })
})

export default router
