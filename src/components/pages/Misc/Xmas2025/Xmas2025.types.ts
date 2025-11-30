export type XmasFormData = {
    name: string,
    message: string
}

export type XmasMessageRequestResource = XmasFormData & {
    userId: string
}

export type CandleFormData = {
    candle1: boolean,
    candle2: boolean,
    candle3: boolean,
    candle4: boolean,
}
