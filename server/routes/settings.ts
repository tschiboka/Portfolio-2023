import express, { Request, Response } from 'express'
import { validateSettings, Settings } from '../models/setting'

const route = express.Router()

route.get('/', async (req: Request, res: Response) => {
    const settings = await Settings.find()
    if (!settings.length)
        return res.status(204).json({ success: false, message: 'Content not Found' })
    return res.status(200).json({ success: true, data: settings[0] })
})

route.post('/', async (req: Request, res: Response) => {
    const body = req.body

    const settingsExists = (await Settings.find()).length
    if (settingsExists)
        return res.status(409).json({
            success: false,
            message: 'Resource already exsists: Settings',
        })

    const { error } = validateSettings(body)
    if (error)
        return res.status(400).json({
            success: false,
            message: error.message,
        })

    const settings = new Settings(body)
    await settings.save()
    res.status(201).json({ success: true, data: settings })
})

export default route
