import express from 'express'
import { validateSettings, Settings } from '../models/setting'
import {
    ErrorResponse,
    GetSettingsResponse,
    PostSettingsRequest,
    PostSettingsResponse,
    TypedRequest,
    TypedResponse,
} from '@common/types'
import { HttpStatus } from '../common/HttpStatus/HttpStatus'

const route = express.Router()

type GetSettingsReq = TypedRequest
type GetSettingsRes = TypedResponse<GetSettingsResponse | ErrorResponse>

route.get('/', async (req: GetSettingsReq, res: GetSettingsRes) => {
    const settings = await Settings.find()
    if (!settings.length)
        return res
            .status(HttpStatus.NOT_FOUND)
            .json({ success: false, message: 'Content not Found' })
    return res.status(HttpStatus.OK).json({ success: true, data: settings[0] })
})

type PostSettingsReq = TypedRequest<{ body: PostSettingsRequest }>
type PostSettingsRes = TypedResponse<PostSettingsResponse | ErrorResponse>

route.post('/', async (req: PostSettingsReq, res: PostSettingsRes) => {
    const body = req.body

    const settingsExists = (await Settings.find()).length
    if (settingsExists)
        return res.status(HttpStatus.CONFLICT).json({
            success: false,
            message: 'Resource already exsists: Settings',
        })

    const { error } = validateSettings(body)
    if (error)
        return res.status(HttpStatus.BAD_REQUEST).json({
            success: false,
            message: error.message,
        })

    const settings = new Settings(body)
    await settings.save()
    res.status(HttpStatus.CREATED).json({ success: true, data: settings })
})

export default route
