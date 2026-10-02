import { RequestBuilder, HttpMethods } from '@common-ux/Test'
import { HttpStatus } from '@common-utils'
import { EmailVerificationMocks } from './EmailVerification.mocks'

/** POST /api/user/confirm — succeeds with a fresh session token. */
const postConfirm = RequestBuilder({
    path: '/api/user/confirm',
    method: HttpMethods.POST,
    response: EmailVerificationMocks.confirm,
})

/** POST /api/user/confirm — rejected with the server's message. */
const postConfirmRejected = RequestBuilder({
    path: '/api/user/confirm',
    method: HttpMethods.POST,
    status: HttpStatus.BAD_REQUEST,
    response: { message: 'Verification token expired' },
})

/** POST /api/user/confirm — rejected with no message, exercising the client fallback. */
const postConfirmRejectedNoMessage = RequestBuilder({
    path: '/api/user/confirm',
    method: HttpMethods.POST,
    status: HttpStatus.BAD_REQUEST,
    response: {},
})

export const EmailVerificationMockHandlers = {
    Confirm: {
        Post: postConfirm,
        PostRejected: postConfirmRejected,
        PostRejectedNoMessage: postConfirmRejectedNoMessage,
    },
    Defaults: [postConfirm],
}
