import { waitFor } from '@testing-library/react'
import { Paths } from '@common-utils'
import { TestScreen } from '@shared-components/Screen/tests/Screen.spec.utils'
import { VisitsQueries } from '../index.ts'
import { VisitsMockHandlers } from './Visits.queries.mockHandles'

const { detectIncognito } = vi.hoisted(() => ({ detectIncognito: vi.fn() }))

vi.mock('detectincognitojs', () => ({ detectIncognito }))

/** Harness component: calls the visit recorder and renders nothing. */
const Recorder = ({ path }: { path: string }) => {
    VisitsQueries.useRecord(path)
    return null
}

/** Resolves once the recorder has settled, whether or not it issued a request. */
const settle = () => waitFor(() => expect(detectIncognito).toHaveBeenCalled())

export const VisitsTestUtils = {
    spies: { detectIncognito },
    customRender: (path: string = Paths.Client.Home) =>
        TestScreen.Do.render({
            path,
            children: <Recorder path={path} />,
            handlers: VisitsMockHandlers.Defaults,
        }),
    settle,
}
