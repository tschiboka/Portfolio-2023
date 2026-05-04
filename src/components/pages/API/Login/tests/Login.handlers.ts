import { RequestBuilder, MockBuilder } from '@common/ux/Test/Server'
import { HttpMethods } from '@common/ux/Test/Server/RequestBuilder'
import { defaultSettings, mockLoginSuccess } from './Login.mocks'

export const loginHandlers = {
    settings: (data = defaultSettings) =>
        RequestBuilder({
            path: '/api/settings',
            method: HttpMethods.GET,
            response: MockBuilder({ data }),
        }).build(),

    success: (data = mockLoginSuccess) =>
        RequestBuilder({
            path: '/api/login',
            method: HttpMethods.POST,
            response: MockBuilder({ data }),
        }).build(),

    error: (message: string, status = 400) =>
        RequestBuilder({
            path: '/api/login',
            method: HttpMethods.POST,
            response: MockBuilder({ message }),
            status,
        }).build(),
}

export const defaultHandlers = [loginHandlers.settings(), loginHandlers.success()]
