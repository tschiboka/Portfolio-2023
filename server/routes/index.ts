import express from 'express'
import { GetHealthResponse, TypedResponse } from '@common/types'
import { HttpStatus } from '../common/HttpStatus/HttpStatus'

const router = express.Router()

type GetHealthRes = TypedResponse<GetHealthResponse>
router.get('/', (_req, res: GetHealthRes) => {
    return res.status(HttpStatus.OK).json({ success: true })
})

export default router
