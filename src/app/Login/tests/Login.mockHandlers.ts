import { RequestBuilder, MockBuilder, HttpMethods } from '@common-ux/Test'
import { HttpStatus } from '@common-utils'
import { MockSettings } from '@common-mocks'
import { LoginMocks } from './Login.mocks'

const getSettings = RequestBuilder({
    path: '/api/settings',
    method: HttpMethods.GET,
    response: MockBuilder({ settings: MockSettings.build() }),
})

const postLogin = RequestBuilder({
    path: '/api/user/login',
    method: HttpMethods.POST,
    response: MockBuilder(LoginMocks.loginSuccess),
})

const postLoginRejected = RequestBuilder({
    path: '/api/user/login',
    method: HttpMethods.POST,
    status: HttpStatus.BAD_REQUEST,
    response: MockBuilder({ message: 'Invalid email or password' }),
})

export const LoginMockHandlers = {
    Settings: { Get: getSettings },
    Login: { Post: postLogin, PostRejected: postLoginRejected },
    Defaults: [getSettings, postLogin],
}
