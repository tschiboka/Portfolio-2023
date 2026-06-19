import { RequestBuilder, MockBuilder } from '@common/ux/Test/Server'
import { HttpMethods } from '@common/ux/Test/Server/RequestBuilder'
import {
    pageSideMenuHandlers,
    handlePostLike,
} from '../../../../sharedComponents/PageSideMenu/tests/PageSideMenu.mockHandles'
import {
    mockXmasPing,
    mockXmasMessagesResponse,
    mockPostMessageSuccess,
    mockXmasCandles,
    mockPutCandlesSuccess,
} from './Xmas2025.mocks'

const handleXmasPing = RequestBuilder({
    path: '/projects/xmas_2025',
    method: HttpMethods.GET,
    response: MockBuilder(mockXmasPing),
})

const handleXmasGetMessages = RequestBuilder({
    path: '/projects/xmas_2025/message',
    method: HttpMethods.GET,
    response: MockBuilder(mockXmasMessagesResponse),
})

const handleXmasPostMessage = RequestBuilder({
    path: '/projects/xmas_2025/message',
    method: HttpMethods.POST,
    response: MockBuilder(mockPostMessageSuccess),
})

const handleXmasGetCandles = RequestBuilder({
    path: '/projects/xmas_2025/candles',
    method: HttpMethods.GET,
    response: MockBuilder(mockXmasCandles),
})

const handleXmasPutCandles = RequestBuilder({
    path: '/projects/xmas_2025/candles',
    method: HttpMethods.PUT,
    response: MockBuilder(mockPutCandlesSuccess),
})

export const handlers = [
    ...pageSideMenuHandlers,
    handlePostLike,
    handleXmasPing,
    handleXmasGetMessages,
    handleXmasPostMessage,
    handleXmasGetCandles,
    handleXmasPutCandles,
]
