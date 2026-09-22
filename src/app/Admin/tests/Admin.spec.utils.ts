import { Accessor } from '@common-ux/Test'
import { Section } from '@common-ux/Test/Section/Section'
import { MockSession } from '@common-mocks'
import { TestScreen } from '@shared-components/Screen/tests/Screen.spec.utils'
import { AppRoutes } from '../../../app'
import { AdminMockHandlers } from './Admin.mockHandlers'
import type { Buildable } from '@common-ux/Test/Server/RequestBuilder'

export const AdminTestUtils = {
    labels: {
        heading: 'Admin',
        sections: {
            dailyBreakdown: 'Portfolio and API Daily Breakdown',
            backfill: 'Backfill Breakdowns',
        },
        buttons: {
            backfill: /Backfill DailyBreakdown from raw data/,
        },
    },
    section: (label: string) => Section(label),
    customRender: (
        handlers: Buildable[] = AdminMockHandlers.Defaults,
    ): { user: typeof Accessor.user } => {
        TestScreen.Do.render({
            path: AppRoutes.Admin,
            handlers,
            session: { session: MockSession.build(), isAuthenticated: true },
        })

        return { user: Accessor.user }
    },
}
