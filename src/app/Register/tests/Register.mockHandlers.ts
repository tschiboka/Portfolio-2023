import { RequestBuilder, MockBuilder, HttpMethods } from '@common-ux/Test'
import { HttpStatus } from '@common-utils'
import { RegisterMocks } from './Register.mocks'

const postRegister = RequestBuilder({
    path: '/api/user/register',
    method: HttpMethods.POST,
    response: MockBuilder(RegisterMocks.registerSuccess),
})

const postRegisterRejected = RequestBuilder({
    path: '/api/user/register',
    method: HttpMethods.POST,
    status: HttpStatus.BAD_REQUEST,
    response: MockBuilder({ message: 'Registration failed' }),
})

export const RegisterMockHandlers = {
    Post: postRegister,
    PostRejected: postRegisterRejected,
    Defaults: [postRegister],
}
