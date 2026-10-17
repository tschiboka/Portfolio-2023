import { RequestBuilder, MockBuilder, HttpMethods } from '@common-ux/Test'
import { PageSideMenuMockHandlers } from '@shared-components/PageSideMenu/tests'
import { XmasMocks } from './Xmas.mocks'

const getPing = RequestBuilder({
    path: '/projects/xmas_2025',
    method: HttpMethods.GET,
    response: MockBuilder(XmasMocks.xmasPing),
})

const getMessages = RequestBuilder({
    path: '/projects/xmas_2025/message',
    method: HttpMethods.GET,
    response: MockBuilder(XmasMocks.xmasMessagesResponse),
})

const postMessage = RequestBuilder({
    path: '/projects/xmas_2025/message',
    method: HttpMethods.POST,
    response: MockBuilder(XmasMocks.postMessageSuccess),
})

const getCandles = RequestBuilder({
    path: '/projects/xmas_2025/candles',
    method: HttpMethods.GET,
    response: MockBuilder(XmasMocks.xmasCandles),
})

const putCandles = RequestBuilder({
    path: '/projects/xmas_2025/candles',
    method: HttpMethods.PUT,
    response: MockBuilder(XmasMocks.putCandlesSuccess),
})

export const XmasMockHandlers = {
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
