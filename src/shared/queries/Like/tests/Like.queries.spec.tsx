import { screen } from '@testing-library/react'
import { Paths } from '@common-utils'
import { LikeQueriesMocks } from './Like.queries.mocks'
import { LikeQueriesMockHandlers } from './Like.queries.mockHandlers'
import { LikeQueriesTestUtils } from './Like.queries.spec.utils'

const { Counter, Summary, Poster, countText } = LikeQueriesTestUtils

describe('LikeQueries', () => {
    describe('useGet', () => {
        it('should render the count for the given path', async () => {
            LikeQueriesTestUtils.customRender(<Counter path={Paths.Client.Home} />, [
                LikeQueriesMockHandlers.Get,
            ])

            expect(
                await screen.findByText(countText(LikeQueriesMocks.getLikes.build().likes)),
            ).toBeDefined()
        })

        it('should not request when the path is empty', () => {
            const likes = LikeQueriesTestUtils.trackRequests('/api/like')

            LikeQueriesTestUtils.customRender(<Counter path="" />, [
                LikeQueriesMockHandlers.Get,
            ])
            likes.stop()

            expect(likes.calls).toEqual([])
            expect(screen.getByText('count:none')).toBeDefined()
        })
    })

    describe('Summary.useGet', () => {
        it('should render a count for every path', async () => {
            LikeQueriesTestUtils.customRender(<Summary />, [LikeQueriesMockHandlers.GetSummary])

            const paths = Object.keys(LikeQueriesMocks.getLikeSummary.build().likes).length

            expect(await screen.findByText(`paths:${paths}`)).toBeDefined()
        })
    })

    describe('usePost', () => {
        it('should report success when the post lands with a session', async () => {
            LikeQueriesTestUtils.customRender(<Poster path={Paths.Client.Home} />)

            expect(await screen.findByText('posted:true')).toBeDefined()
        })
    })
})
