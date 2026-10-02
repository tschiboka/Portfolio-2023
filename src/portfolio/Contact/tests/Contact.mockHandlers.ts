import { RequestBuilder, MockBuilder, HttpMethods } from '@common-ux/Test'
import { HttpStatus } from '@common-utils'
import { ContactMocks } from './Contact.mocks'

const postMessage = RequestBuilder({
    path: '/api/message',
    method: HttpMethods.POST,
    response: MockBuilder(ContactMocks.messageSuccess),
})

const postMessageRejected = RequestBuilder({
    path: '/api/message',
    method: HttpMethods.POST,
    status: HttpStatus.BAD_REQUEST,
    response: MockBuilder({ message: 'Failed to send message' }),
})

export const ContactMockHandlers = {
    Post: postMessage,
    PostRejected: postMessageRejected,
    Defaults: [postMessage],
}
