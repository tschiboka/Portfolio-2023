import { RequestBuilder, MockBuilder } from '@common/ux/Test/Server'
import { HttpMethods } from '@common/ux/Test/Server/RequestBuilder'
import { HttpStatus } from '@common/utils'
import { mockRegisterSuccess } from './Register.mocks'

export const handlePostRegister = RequestBuilder({
    path: '/api/user',
    method: HttpMethods.POST,
    response: MockBuilder(mockRegisterSuccess),
})

export const handlePostRegisterError = (message: string, status = HttpStatus.BAD_REQUEST) =>
    RequestBuilder({
        path: '/api/user',
        method: HttpMethods.POST,
        response: MockBuilder({ message }),
        status,
    })

export const defaultHandlers = [handlePostRegister]
