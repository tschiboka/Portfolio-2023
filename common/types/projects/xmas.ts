// XMAS TYPES

// Entity: a single xmas message
export type XmasMessage = {
    _id: string
    name: string
    message: string
    userId: string
    createdAt: Date
}

// Entity: candle states
export type XmasCandles = {
    _id: string
    candle1: boolean
    candle2: boolean
    candle3: boolean
    candle4: boolean
    __v?: number
}

// GET / response (ping)
export type GetXmasPingResponse = {
    data: { message: string }
}

// POST /message request body
export type PostXmasMessageRequest = {
    name: string
    message: string
    userId: string
}

// POST /message response
export type PostXmasMessageResponse = {
    message: string
}

// GET /message query params
export type GetXmasMessagesQuery = {
    userId?: string
}

// GET /message response
export type GetXmasMessagesResponse = {
    data: XmasMessage[]
}

// GET /candles response
export type GetXmasCandlesResponse = {
    data: { candles: XmasCandles }
}

// PUT /candles request body
export type PutXmasCandlesRequest = {
    candle1: boolean
    candle2: boolean
    candle3: boolean
    candle4: boolean
}

// PUT /candles response
export type PutXmasCandlesResponse = {
    data: { candles: XmasCandles }
}
