import { TestScreen } from '@shared-components/Screen/tests/Screen.spec.utils'
import { AppRoutes } from '../../../app'
import { TestMocks } from '@common-mocks'
import { Paths } from '@common-utils'
import { EmailVerificationMockHandlers } from './EmailVerification.mocks'
import type { Buildable } from '@common-ux/Test/Server/RequestBuilder'

export const EmailVerificationTestUtils = {
    token: TestMocks.token,
    route: `/api/email-verification/${TestMocks.token}`,
    loginPath: Paths.Client.Login,
    labels: {
        heading: 'Verifying your email address',
    },
    messages: {
        rejected: 'Verification token expired',
    },
    rejectedHandlers: [EmailVerificationMockHandlers.Confirm.PostRejected] as Buildable[],
    rejectedWithoutMessageHandlers: [
        EmailVerificationMockHandlers.Confirm.PostRejectedNoMessage,
    ] as Buildable[],
    customRender: (handlers: Buildable[] = EmailVerificationMockHandlers.Defaults) => {
        TestScreen.Do.render({
            path: AppRoutes.EmailVerification,
            route: [EmailVerificationTestUtils.route],
            handlers,
        })
    },
}
