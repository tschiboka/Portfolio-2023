import type { PostConfirmResponse } from '@common-types'
import { TestMocks } from '@common-mocks'
import { MockBuilder, RequestBuilder, HttpMethods } from '@common-ux/Test'
import { HttpStatus } from '@common-utils'

export const EmailVerificationMocks = {
    confirm: MockBuilder<PostConfirmResponse>({
        token: { token: TestMocks.token, created: new Date(TestMocks.createdAt) },
    }),
}

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
