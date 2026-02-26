import express from 'express'
import auth from '../../middlewares/auth'
import { validateMessage, XmasMessage, validateCandle, XmasCandle } from './models'
import { User } from '../../models/user'
import { last } from 'ramda'
import { TypedRequest, TypedResponse } from '@common/types'
import type {
    ErrorResponse,
    XmasMessage as XmasMessageEntity,
    XmasCandles,
    GetXmasCandlesResponse,
    GetXmasMessagesQuery,
    GetXmasMessagesResponse,
    GetXmasPingResponse,
    PostXmasMessageRequest,
    PostXmasMessageResponse,
    PutXmasCandlesRequest,
    PutXmasCandlesResponse,
} from '@common/types'
import { HttpStatus } from '../../common/HttpStatus/HttpStatus'

const router = express.Router()

type GetPingRes = TypedResponse<GetXmasPingResponse>
router.get('/', async (_req: TypedRequest, res: GetPingRes) => {
    res.status(HttpStatus.OK).json({ data: { message: 'OK' } })
})

router.get('/device', async (_req: TypedRequest, res) => {
    res.status(HttpStatus.OK).send('<<<OK>>>')
})

type PostMessageReq = TypedRequest<{ body: PostXmasMessageRequest }>
type PostMessageRes = TypedResponse<PostXmasMessageResponse>
router.post('/message', auth, async (req: PostMessageReq, res: PostMessageRes) => {
    const { error } = validateMessage(req.body)
    if (error)
        return res
            .status(HttpStatus.BAD_REQUEST)
            .json({ success: false, message: error.details[0].message })

    const xmasMessage = new XmasMessage(req.body)
    await xmasMessage.save()

    res.status(HttpStatus.CREATED).json({ success: true, message: 'Message sent successfully' })
})

type GetMessagesReq = TypedRequest<{ query: GetXmasMessagesQuery }>
type GetMessagesRes = TypedResponse<GetXmasMessagesResponse | ErrorResponse>
router.get('/message', auth, async (req: GetMessagesReq, res: GetMessagesRes) => {
    const { userId } = req.query
    if (!userId)
        return res
            .status(HttpStatus.BAD_REQUEST)
            .json({ success: false, message: 'User ID is required' })

    const user = await User.findById(userId)
    if (!user)
        return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'User not found' })

    if (user.isAdmin) {
        const messages = await XmasMessage.find()
            .sort({ createdAt: -1 })
            .lean<XmasMessageEntity[]>()
        return res.status(HttpStatus.OK).json({ success: true, data: messages })
    }

    const messages = await XmasMessage.find({ userId: user._id })
        .sort({ createdAt: -1 })
        .lean<XmasMessageEntity[]>()
    res.status(HttpStatus.OK).json({ success: true, data: messages })
})

router.get('/message/device', async (_req: TypedRequest, res) => {
    const messages = await XmasMessage.find()
    console.log(messages)
    const unreadMessages = messages.filter(({ isRead }: { isRead: boolean }) => !isRead)

    const lastMsg = last(messages)
    const lastMessage = lastMsg ? [lastMsg] : []
    const responseMessages = unreadMessages.length ? unreadMessages : lastMessage

    const textResponse = responseMessages.map(
        (msg) => `${msg.name}:${msg.message}:${!msg.isRead}`,
    )[0]
    return res.status(HttpStatus.OK).send(`<<<${textResponse}>>>`)
})

router.put('/message/device/markread', async (_req: TypedRequest, res) => {
    await XmasMessage.updateOne({ isRead: { $ne: true } }, { $set: { isRead: true } })

    res.status(HttpStatus.OK).send('<<<OK>>>')
})

type GetCandlesRes = TypedResponse<GetXmasCandlesResponse>
router.get('/candles', auth, async (_req: TypedRequest, res: GetCandlesRes) => {
    const candles = await XmasCandle.find().lean<XmasCandles[]>()

    if (candles?.length === 0) {
        const newCandle = new XmasCandle({
            candle1: false,
            candle2: false,
            candle3: false,
            candle4: false,
        })
        await newCandle.save()
        return res.status(HttpStatus.OK).json({
            success: true,
            data: { candles: newCandle.toObject() as unknown as XmasCandles },
        })
    }

    res.status(HttpStatus.OK).json({ success: true, data: { candles: candles[0] } })
})

type PutCandlesReq = TypedRequest<{ body: PutXmasCandlesRequest }>
type PutCandlesRes = TypedResponse<PutXmasCandlesResponse | ErrorResponse>
router.put('/candles', auth, async (req: PutCandlesReq, res: PutCandlesRes) => {
    const { error } = validateCandle(req.body)
    if (error)
        return res
            .status(HttpStatus.BAD_REQUEST)
            .json({ success: false, message: error.details[0].message })

    const candles = await XmasCandle.find()
    if (candles?.length === 0) {
        return res
            .status(HttpStatus.NOT_FOUND)
            .json({ success: false, message: 'No candles found to update' })
    }

    const firstCandle = candles[0]
    Object.assign(firstCandle, req.body)
    await firstCandle.save()

    res.status(HttpStatus.OK).json({
        success: true,
        data: { candles: firstCandle.toObject() as unknown as XmasCandles },
    })
})

router.get('/candles/device', async (_req: TypedRequest, res) => {
    const candles = await XmasCandle.find()

    if (candles?.length === 0) {
        return res.status(HttpStatus.OK).send('<<<0000>>>')
    }

    const firstCandle = candles[0]
    const candleState = [
        firstCandle.candle1,
        firstCandle.candle2,
        firstCandle.candle3,
        firstCandle.candle4,
    ]
        .map((c: boolean) => (c ? '1' : '0'))
        .join('')
    return res.status(HttpStatus.OK).send(`<<<${candleState}>>>`)
})

export default router
