import express from 'express'
import { ApiResponder } from '../../common/utils/Server'
import type { ServiceHealthRes } from './ServiceHealth.types'

const router = express.Router()

// GET / — health probe for uptime monitors; `success` is the meaningful signal.
router.get('/', (_req, res: ServiceHealthRes) => {
    return ApiResponder.ok(res, { success: true })
})

export { router as ServiceHealthRouter }
