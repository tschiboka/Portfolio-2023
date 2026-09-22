import { RequestBuilder, MockBuilder, HttpMethods } from '@common-ux/Test'
import { HttpStatus } from '@common-utils'
import { mockRegisterSuccess } from './Register.mocks'

export const handlePostRegister = RequestBuilder({
    path: '/api/user/register',
    method: HttpMethods.POST,
    response: MockBuilder(mockRegisterSuccess),
})

export const handlePostRegisterError = (message: string, status = HttpStatus.BAD_REQUEST) =>
    RequestBuilder({
        path: '/api/user/register',
        method: HttpMethods.POST,
        response: MockBuilder({ message }),
        status,
    })

export const defaultHandlers = [handlePostRegister]
