import express from 'express'
import { Visit } from '../models/visit'
import { Like } from '../models/like'
import { Message } from '../models/message'
import { Log } from '../models/log'
import {
    GetActivityFeedQuery,
    GetActivityFeedResponse,
    TypedRequest,
    TypedResponse,
    ActivityEvent,
} from '@common/types'
import { HttpStatus } from '../../common/utils/Server/HttpStatus'
import auth from '../middlewares/auth'
import admin from '../middlewares/admin'

const router = express.Router()

type GetActivityReq = TypedRequest<{ query: GetActivityFeedQuery }>
type GetActivityRes = TypedResponse<GetActivityFeedResponse>

router.get('/admin', [auth, admin], async (req: GetActivityReq, res: GetActivityRes) => {
    const { path, type, dateFrom, dateTo, sortBy, asc, page, pageSize } = req.query

    const pageNumber = Math.max(parseInt(page ?? '1', 10), 1)
    const limit = Math.min(Math.max(parseInt(pageSize ?? '10', 10), 1), 100)
    const skip = (pageNumber - 1) * limit
    const dir = asc === 'true' ? 1 : -1

    // Build parallel queries from each collection
    const queries: Promise<{ rows: ActivityEvent[]; total: number }>[] = []

    if (!type || type === 'visit') {
        const visitFilter: Record<string, unknown> = {}
        if (path) visitFilter.path = { $regex: path, $options: 'i' }

        queries.push(
            Visit.find(visitFilter)
                .lean()
                .then((docs) => ({
                    rows: docs.map((d) => ({
                        id: (d._id as string).toString(),
                        datetime: (d.visitDate as Date).toISOString(),
                        path: d.path,
                        type: 'visit' as const,
                    })),
                    total: docs.length,
                })),
        )
    }

    if (!type || type === 'like') {
        const likeFilter: Record<string, unknown> = {}
        if (path) likeFilter.path = { $regex: path, $options: 'i' }

        queries.push(
            Like.find(likeFilter)
                .lean()
                .then((docs) => ({
                    rows: docs.map((d) => ({
                        id: (d._id as string).toString(),
                        datetime: (d.likeDate as Date).toISOString(),
                        path: d.path,
                        type: 'like' as const,
                    })),
                    total: docs.length,
                })),
        )
    }

    if (!type || type === 'message') {
        const msgFilter: Record<string, unknown> = {}
        if (path) msgFilter.path = { $regex: path, $options: 'i' }

        queries.push(
            Message.find(msgFilter)
                .lean()
                .then((docs) => ({
                    rows: docs.map((d) => ({
                        id: (d._id as string).toString(),
                        datetime: (d.date as Date).toISOString(),
                        path: `message/${d._id}`,
                        type: 'message' as const,
                        details: JSON.stringify({
                            name: d.name,
                            email: d.email,
                            phone: d.phone ?? null,
                            message: d.message,
                            isRead: d.isRead,
                        }),
                    })),
                    total: docs.length,
                })),
        )
    }

    if (!type || type === 'error') {
        const logFilter: Record<string, unknown> = {}
        if (path) logFilter.path = { $regex: path, $options: 'i' }

        queries.push(
            Log.find(logFilter)
                .lean()
                .then((docs) => ({
                    rows: docs.map((d) => ({
                        id: (d._id as string).toString(),
                        datetime: d.timestamp
                            ? new Date(d.timestamp).toISOString()
                            : new Date().toISOString(),
                        path: `error/${d.name ?? 'unknown'}`,
                        type: 'error' as const,
                        details: JSON.stringify({
                            name: d.name,
                            message: d.message,
                            stack: d.stack,
                        }),
                    })),
                    total: docs.length,
                })),
        )
    }

    const results = await Promise.all(queries)

    // Merge all rows
    let allRows = results.flatMap((r) => r.rows)

    // Apply date range filter client-side
    const fromMs = dateFrom ? new Date(dateFrom).getTime() : undefined
    const toMs = dateTo ? new Date(dateTo).getTime() + 86400000 : undefined
    if (fromMs || toMs) {
        allRows = allRows.filter((row) => {
            const t = new Date(row.datetime).getTime()
            if (fromMs && t < fromMs) return false
            if (toMs && t > toMs) return false
            return true
        })
    }

    // Apply sorting
    const sortField = sortBy ?? 'datetime'
    allRows.sort((a, b) => {
        let cmp = 0
        switch (sortField) {
            case 'datetime':
                cmp = new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
                break
            case 'path':
                cmp = a.path.localeCompare(b.path)
                break
            case 'type':
                cmp = a.type.localeCompare(b.type)
                break
        }
        return dir * cmp
    })

    // Compute summary counts across all (pre-paginated) rows
    const summary = {
        visits: allRows.filter((r) => r.type === 'visit').length,
        likes: allRows.filter((r) => r.type === 'like').length,
        messages: allRows.filter((r) => r.type === 'message').length,
        errors: allRows.filter((r) => r.type === 'error').length,
    }

    // Paginate merged results
    const totalItems = allRows.length
    const paginatedRows = allRows.slice(skip, skip + limit)

    res.status(HttpStatus.OK).json({
        success: true,
        data: paginatedRows,
        meta: {
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            pageNumber,
        },
        context: summary,
    })
})

export default router
