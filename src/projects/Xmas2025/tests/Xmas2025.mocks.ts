import type {
    GetXmasPingResponse,
    GetXmasMessagesResponse,
    PostXmasMessageResponse,
    GetXmasCandlesResponse,
    PutXmasCandlesResponse,
    XmasMessage,
    User,
} from '@common-types'

const user: User = {
    id: 'test-user-id',
    userName: 'TestUser',
    email: 'test@example.com',
    password: '',
    fullName: 'Test User',
}

const xmasPing: GetXmasPingResponse = {
    data: { message: 'Xmas API is running' },
}

const xmasMessages: XmasMessage[] = [
    {
        _id: '1',
        name: 'TestUser',
        message: 'Merry Christmas!',
        userId: 'test-user-id',
        createdAt: new Date('2025-12-24T10:00:00Z'),
    },
    {
        _id: '2',
        name: 'Friend',
        message: 'Happy holidays!',
        userId: 'other-user-id',
        createdAt: new Date('2025-12-25T12:00:00Z'),
    },
]

const xmasMessagesResponse: GetXmasMessagesResponse = {
    data: xmasMessages,
}

const postMessageSuccess: PostXmasMessageResponse = {
    message: 'Message sent successfully',
}

const xmasCandles: GetXmasCandlesResponse = {
    data: {
        candles: {
            _id: 'candles-1',
            candle1: true,
            candle2: false,
            candle3: true,
            candle4: false,
        },
    },
}

const putCandlesSuccess: PutXmasCandlesResponse = {
    data: {
        candles: {
            _id: 'candles-1',
            candle1: true,
            candle2: true,
            candle3: true,
            candle4: false,
        },
    },
}

export const Xmas2025Mocks = {
    user,
    xmasPing,
    xmasMessages,
    xmasMessagesResponse,
    postMessageSuccess,
    xmasCandles,
    putCandlesSuccess,
}
