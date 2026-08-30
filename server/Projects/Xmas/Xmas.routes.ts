import express from 'express'
import { auth } from '../../App/Users/Users.middlewares'
import { ApiResponder, ApiMessage } from '@utils'
import { MessageSchema, CandleSchema } from './Xmas.schema'
import { XmasMessageModel, XmasCandleModel } from './Xmas.model'
import { UsersModel } from '../../App/Users/Users.model'
import { last } from 'ramda'
import { TypedRequest, TypedResponse } from '../../../common/types'
import type {
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
} from '../../../common/types'
import { isEmpty } from '@utils'

const router = express.Router()

type GetPingRes = TypedResponse<GetXmasPingResponse>
router.get('/', async (_req: TypedRequest, res: GetPingRes) => {
    return ApiResponder.ok(res, { data: { message: ApiMessage.ok() } })
})

router.get('/device', async (_req: TypedRequest, res) => {
    return ApiResponder.text(res, '<<<OK>>>')
})

type PostMessageReq = TypedRequest<{ body: PostXmasMessageRequest }>
type PostMessageRes = TypedResponse<PostXmasMessageResponse>
router.post('/message', auth, async (req: PostMessageReq, res: PostMessageRes) => {
    const { error } = MessageSchema.validate(req.body)
    if (error) throw ApiResponder.badRequest(error)

    const xmasMessage = new XmasMessageModel(req.body)
    await xmasMessage.save()

    return ApiResponder.created(res, { message: ApiMessage.sent('message') })
})

type GetMessagesReq = TypedRequest<{ query: GetXmasMessagesQuery }>
type GetMessagesRes = TypedResponse<GetXmasMessagesResponse>
router.get('/message', auth, async (req: GetMessagesReq, res: GetMessagesRes) => {
    const { userId } = req.query
    if (!userId) throw ApiResponder.badRequest(ApiMessage.required('userId'))

    const user = await UsersModel.findById(userId)
    if (!user) throw ApiResponder.notFound('user')

    if (user.isAdmin) {
        const messages = await XmasMessageModel.find()
            .sort({ createdAt: -1 })
            .lean<XmasMessageEntity[]>()
        return ApiResponder.ok(res, { data: messages })
    }

    const messages = await XmasMessageModel.find({ userId: user._id })
        .sort({ createdAt: -1 })
        .lean<XmasMessageEntity[]>()
    return ApiResponder.ok(res, { data: messages })
})

router.get('/message/device', async (_req: TypedRequest, res) => {
    const messages = await XmasMessageModel.find()
    const unreadMessages = messages.filter(({ isRead }: { isRead: boolean }) => !isRead)

    const lastMsg = last(messages)
    const lastMessage = lastMsg ? [lastMsg] : []
    const responseMessages = unreadMessages.length ? unreadMessages : lastMessage

    const textResponse = responseMessages.map(
        (msg) => `${msg.name}:${msg.message}:${!msg.isRead}`,
    )[0]
    return ApiResponder.text(res, `<<<${textResponse}>>>`)
})

router.put('/message/device/markread', async (_req: TypedRequest, res) => {
    await XmasMessageModel.updateOne({ isRead: { $ne: true } }, { $set: { isRead: true } })

    return ApiResponder.text(res, '<<<OK>>>')
})

type GetCandlesRes = TypedResponse<GetXmasCandlesResponse>
router.get('/candles', auth, async (_req: TypedRequest, res: GetCandlesRes) => {
    const candles = await XmasCandleModel.find().lean<XmasCandles[]>()

    if (isEmpty(candles)) {
        const newCandle = new XmasCandleModel({
            candle1: false,
            candle2: false,
            candle3: false,
            candle4: false,
        })
        await newCandle.save()
        return ApiResponder.ok(res, { data: { candles: newCandle.toObject() } })
    }

    return ApiResponder.ok(res, { data: { candles: candles[0] } })
})

type PutCandlesReq = TypedRequest<{ body: PutXmasCandlesRequest }>
type PutCandlesRes = TypedResponse<PutXmasCandlesResponse>
router.put('/candles', auth, async (req: PutCandlesReq, res: PutCandlesRes) => {
    const { error } = CandleSchema.validate(req.body)
    if (error) throw ApiResponder.badRequest(error)

    const candles = await XmasCandleModel.find()
    if (isEmpty(candles)) throw ApiResponder.notFound('candles')

    const firstCandle = candles[0]
    Object.assign(firstCandle, req.body)
    await firstCandle.save()

    return ApiResponder.ok(res, { data: { candles: firstCandle.toObject() } })
})

router.get('/candles/device', async (_req: TypedRequest, res) => {
    const candles = await XmasCandleModel.find()

    if (isEmpty(candles)) {
        return ApiResponder.text(res, '<<<0000>>>')
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
    return ApiResponder.text(res, `<<<${candleState}>>>`)
})

export { router as XmasRouter }
