import type {
    GetXmasPingResponse,
    GetXmasMessagesResponse,
    PostXmasMessageResponse,
    GetXmasCandlesResponse,
    PutXmasCandlesResponse,
    XmasMessage,
    User,
} from '@common/types'

export const mockUser: User = {
    id: 'test-user-id',
    userName: 'TestUser',
    email: 'test@example.com',
    password: '',
    fullName: 'Test User',
}

export const mockXmasPing: GetXmasPingResponse = {
    data: { message: 'Xmas API is running' },
}

export const mockXmasMessages: XmasMessage[] = [
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

export const mockXmasMessagesResponse: GetXmasMessagesResponse = {
    success: true,
    data: mockXmasMessages,
}

export const mockPostMessageSuccess: PostXmasMessageResponse = {
    success: true,
    message: 'Message sent successfully',
}

export const mockXmasCandles: GetXmasCandlesResponse = {
    success: true,
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

export const mockPutCandlesSuccess: PutXmasCandlesResponse = {
    success: true,
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
