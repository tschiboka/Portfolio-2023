import express from 'express'
import { ApiResponder } from '@utils'
import { MessageService } from './Message.service'
import type { PostMessageReq, PostMessageRes } from './Message.types'

const router = express.Router()

// POST /api/message â€” submit a contact message (validates + persists + notifies owner).
router.post('/', async (req: PostMessageReq, res: PostMessageRes) => {
    const data = await MessageService.create(req.body)
    ApiResponder.created(res, data)
})

export { router as MessageRouter }
