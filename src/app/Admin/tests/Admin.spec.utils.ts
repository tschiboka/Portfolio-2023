import { Accessor } from '@common-ux/Test'
import { Section } from '@common-ux/Test/Section/Section'
import { SessionMocks } from '@common-mocks'
import { Test } from '@shared-components/Screen/tests'
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
        Test.Screen.Do.render({
            path: AppRoutes.Admin,
            handlers,
            session: { session: SessionMocks.build(), isAuthenticated: true },
        })

        return { user: Accessor.user }
    },
}
