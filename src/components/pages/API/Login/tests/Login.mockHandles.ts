import { RequestBuilder, MockBuilder } from '@common/ux/Test/Server'
import { HttpMethods } from '@common/ux/Test/Server/RequestBuilder'
import { HttpStatus } from '@common/utils'
import { defaultSettings, mockLoginSuccess } from './Login.mocks'

export const handleGetSettings = RequestBuilder({
    path: '/api/settings',
    method: HttpMethods.GET,
    response: MockBuilder({ data: defaultSettings }),
})

export const handlePostLogin = RequestBuilder({
    path: '/api/login',
    method: HttpMethods.POST,
    response: MockBuilder(mockLoginSuccess),
})

export const handlePostLoginError = (message: string, status = HttpStatus.BAD_REQUEST) =>
    RequestBuilder({
        path: '/api/login',
        method: HttpMethods.POST,
        response: MockBuilder({ message }),
        status,
    })

export const defaultHandlers = [handleGetSettings, handlePostLogin]
