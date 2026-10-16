import { MockBuilder } from '@common-ux/Test'
import { TestMocks } from '@common-mocks'
import { Paths } from '@common-utils'
import type { GetLikeResponse, GetLikeSummaryResponse, PostLikeResponse } from '@common-types'

/** Base like response, recorded against the client home route. */
const postLike = MockBuilder<PostLikeResponse>({
    like: {
        path: Paths.Client.Home,
        likeDate: TestMocks.createdAt,
    },
})

/** The count for one path. */
const getLikes = MockBuilder<GetLikeResponse>({ likes: 1 })

/** Counts for every path, keyed by path. */
const getLikeSummary = MockBuilder<GetLikeSummaryResponse>({
    likes: { [Paths.Client.Home]: 1 },
})

export const LikeQueriesMocks = { postLike, getLikes, getLikeSummary }
