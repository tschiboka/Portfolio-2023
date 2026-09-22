import { RequestBuilder, MockBuilder, HttpMethods } from '@common-ux/Test'
import { HttpStatus } from '@common-utils'
import { defaultSettings, mockLoginSuccess } from './Login.mocks'

export const handleGetSettings = RequestBuilder({
    path: '/api/settings',
    method: HttpMethods.GET,
    response: MockBuilder({ settings: defaultSettings }),
})

export const handlePostLogin = RequestBuilder({
    path: '/api/user/login',
    method: HttpMethods.POST,
    response: MockBuilder(mockLoginSuccess),
})

export const handlePostLoginError = (message: string, status = HttpStatus.BAD_REQUEST) =>
    RequestBuilder({
        path: '/api/user/login',
        method: HttpMethods.POST,
        response: MockBuilder({ message }),
        status,
    })

export const defaultHandlers = [handleGetSettings, handlePostLogin]
