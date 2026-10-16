import express from 'express'
import { ApiResponder } from '@common-utils'
import { SettingsService } from './Settings.service'
import type {
    GetSettingsReq,
    GetSettingsRes,
    PostSettingsReq,
    PostSettingsRes,
} from './Settings.types'
const router = express.Router()

// GET /api/settings - retrieve the current settings.
router.get('/', async (req: GetSettingsReq, res: GetSettingsRes) => {
    const settings = await SettingsService.get()
    ApiResponder.ok(res, { settings })
})
// POST /api/settings - create or update the settings.
router.post('/', async (req: PostSettingsReq, res: PostSettingsRes) => {
    const settings = await SettingsService.create(req.body)
    ApiResponder.created(res, { settings })
})

export { router as SettingsRouter }
