import { RequestBuilder, MockBuilder } from '@common/ux/Test/Server'
import { HttpMethods } from '@common/ux/Test/Server/RequestBuilder'
import { HttpStatus } from '@common/utils'
import { RequestHandler } from 'msw'
import { defaultSettings, mockLoginSuccess } from './Login.mocks'

export const handleSettings = RequestBuilder({
    path: '/api/settings',
    method: HttpMethods.GET,
    response: MockBuilder({ data: defaultSettings }),
})

export const handleLoginSuccess = RequestBuilder({
    path: '/api/login',
    method: HttpMethods.POST,
    response: MockBuilder(mockLoginSuccess),
})

export const handleLoginError = (message: string, status = HttpStatus.BAD_REQUEST) =>
    RequestBuilder({
        path: '/api/login',
        method: HttpMethods.POST,
        response: MockBuilder({ message }),
        status,
    })

export const defaultHandlers: RequestHandler[] = [
    handleSettings.build(),
    handleLoginSuccess.build(),
]
