import { MockBuilder } from '@common-ux/Test'
import { TestMocks } from '@common-mocks'
import { Paths } from '@common-utils'
import type { PostVisitResponse } from '@common-types'

/** Base visit response, recorded against the client home route. */
const postVisit = MockBuilder<PostVisitResponse>({
    visit: {
        path: Paths.Client.Home,
        visitDate: TestMocks.createdAt,
    },
})

export const VisitsMocks = { postVisit }
