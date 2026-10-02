import { RequestBuilder, MockBuilder, HttpMethods } from '@common-ux/Test'
import { PageSideMenuMockHandlers } from '@shared-components/PageSideMenu/tests/PageSideMenu.mockHandlers'
import { Xmas2025Mocks } from './Xmas2025.mocks'

const getPing = RequestBuilder({
    path: '/projects/xmas_2025',
    method: HttpMethods.GET,
    response: MockBuilder(Xmas2025Mocks.xmasPing),
})

const getMessages = RequestBuilder({
    path: '/projects/xmas_2025/message',
    method: HttpMethods.GET,
    response: MockBuilder(Xmas2025Mocks.xmasMessagesResponse),
})

const postMessage = RequestBuilder({
    path: '/projects/xmas_2025/message',
    method: HttpMethods.POST,
    response: MockBuilder(Xmas2025Mocks.postMessageSuccess),
})

const getCandles = RequestBuilder({
    path: '/projects/xmas_2025/candles',
    method: HttpMethods.GET,
    response: MockBuilder(Xmas2025Mocks.xmasCandles),
})

const putCandles = RequestBuilder({
    path: '/projects/xmas_2025/candles',
    method: HttpMethods.PUT,
    response: MockBuilder(Xmas2025Mocks.putCandlesSuccess),
})

export const Xmas2025MockHandlers = {
    Ping: { Get: getPing },
    Messages: { Get: getMessages, Post: postMessage },
    Candles: { Get: getCandles, Put: putCandles },
    Defaults: [
        ...PageSideMenuMockHandlers.Defaults,
        PageSideMenuMockHandlers.Likes.Post,
        getPing,
        getMessages,
        postMessage,
        getCandles,
        putCandles,
    ],
}
