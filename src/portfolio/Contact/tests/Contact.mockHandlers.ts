import { RequestBuilder, MockBuilder, HttpMethods } from '@common-ux/Test'
import { HttpStatus } from '@common-utils'
import { mockMessageSuccess } from './Contact.mocks'

export const handlePostMessage = RequestBuilder({
    path: '/api/message',
    method: HttpMethods.POST,
    response: MockBuilder(mockMessageSuccess),
})

export const handlePostMessageError = (message: string, status = HttpStatus.BAD_REQUEST) =>
    RequestBuilder({
        path: '/api/message',
        method: HttpMethods.POST,
        response: MockBuilder({ message }),
        status,
    })

export const defaultHandlers = [handlePostMessage]
