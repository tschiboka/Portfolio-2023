import { MockBuilder } from '@common-ux/Test'
import { TestMocks } from '@common-mocks'
import type { PostConfirmResponse } from '@common-types'

export const EmailVerificationMocks = {
    confirm: MockBuilder<PostConfirmResponse>({
        token: { token: TestMocks.token, created: new Date(TestMocks.createdAt) },
    }),
}
