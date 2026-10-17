import { waitFor } from '@testing-library/react'
import { Paths } from '@common-utils'
import { Test } from '@shared-components/Screen/tests'
import { VisitQueriesMockHandlers } from './Visit.queries.mockHandlers.ts'
import { VisitQueries } from '../../index.ts'

const { detectIncognito } = vi.hoisted(() => ({ detectIncognito: vi.fn() }))

vi.mock('detectincognitojs', () => ({ detectIncognito }))

/** Harness component: calls the visit recorder and renders nothing. */
const Recorder = ({ path }: { path: string }) => {
    VisitQueries.usePost(path)
    return null
}

/** Resolves once the recorder has settled, whether or not it issued a request. */
const settle = () => waitFor(() => expect(detectIncognito).toHaveBeenCalled())

export const VisitQueriesTestUtils = {
    spies: { detectIncognito },
    customRender: (path: string = Paths.Client.Home) =>
        Test.Screen.Do.render({
            path,
            children: <Recorder path={path} />,
            handlers: VisitQueriesMockHandlers.Defaults,
        }),
    settle,
}
