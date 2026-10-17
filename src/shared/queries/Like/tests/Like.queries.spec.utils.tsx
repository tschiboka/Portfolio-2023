import { useEffect } from 'react'
import { TestMocks } from '@common-mocks'
import { Paths } from '@common-utils'
import { Server } from '@common-ux/Test'
import { Test } from '@shared-components/Screen/tests'
import { LikeQueriesMockHandlers } from './Like.queries.mockHandlers.ts'
import { LikeQueries } from '../../index.ts'
import type { ReactElement } from 'react'
import type { Buildable } from '@common-ux/Test/Server/RequestBuilder'

/** Harness component: reads the like count for one path. */
const Counter = ({ path }: { path: string }) => {
    const { data } = LikeQueries.useGet(path)

    return <span>{`count:${data ? data.likes : 'none'}`}</span>
}

/** Harness component: reads the count of every path. */
const Summary = () => {
    const { data } = LikeQueries.Summary.useGet()

    return <span>{`paths:${data ? Object.keys(data.likes).length : 'none'}`}</span>
}

/** Harness component: posts one like and reports whether it landed. */
const Poster = ({ path }: { path: string }) => {
    const { mutate, isSuccess } = LikeQueries.usePost()

    useEffect(() => {
        mutate({ path })
    }, [mutate, path])

    return <span>{`posted:${isSuccess}`}</span>
}

/**
 * The requests made to one path, so a case can assert that none was made.
 * MSW matches a handler by path alone, so the server is the only place this is visible.
 */
const trackRequests = (path: string) => {
    const calls: string[] = []
    const listener = ({ request }: { request: Request }) => {
        if (new URL(request.url).pathname === path) calls.push(request.method)
    }

    Server.events.on('request:start', listener)

    return { calls, stop: () => Server.events.removeListener('request:start', listener) }
}

/**
 * Shared wiring for the Likes suite: the harness components, a render carrying a session
 * token, and the request log.
 *
 * @example
 * LikeQueriesTestUtils.customRender(<Counter path={Paths.Client.Home} />)
 */
export const LikeQueriesTestUtils = {
    Counter,
    Summary,
    Poster,
    countText: (likes: number) => `count:${likes}`,
    trackRequests,
    customRender: (
        children: ReactElement,
        handlers: Buildable[] = LikeQueriesMockHandlers.Defaults,
    ) =>
        Test.Screen.Do.render({
            path: Paths.Client.Home,
            children,
            handlers,
            session: { session: { token: TestMocks.token } },
        }),
}
