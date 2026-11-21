import { SessionMocks } from '@common-mocks'
import { Accessor, Harness } from '@common-ux/Test'
import { AppRoutes } from '@app'
import { Test } from '@shared-components/Screen/tests'
import { AdminMockHandlers } from './Admin.mockHandlers'
import type { ElementMap } from '@common-ux/Test'
import type { Buildable } from '@common-ux/Test/Server'

/**
 * Admin: the page's sections and the job it can trigger.
 *
 * The sections keep their own accessor, so `title()` and `toggle()` are never restated, and the
 * backfill flow composes both expansions with the click that fires it.
 */
export class AdminHarness extends Harness {
    /** Renders the Admin screen behind the given handlers and returns the bound harness. */
    static Render({
        handlers = AdminMockHandlers.Defaults,
    }: { handlers?: Buildable[] } = {}): AdminHarness {
        const { container } = Test.Screen.Do.render({
            path: AppRoutes.Admin,
            handlers,
            session: { session: SessionMocks.build(), isAuthenticated: true },
        })
        const harness = new AdminHarness()
        harness.markRendered(container)

        return harness
    }

    constructor() {
        super('Admin')
    }

    override get Elements() {
        return {
            heading: { role: 'heading', name: 'Admin' },
            dailyBreakdown: { via: () => Test.Section('Portfolio and API Daily Breakdown') },
            dailyBreakdownButton: { role: 'button', name: 'Action Daily Breakdown' },
            sendingButton: { role: 'button', name: 'Sending...' },
            response: { via: () => Test.Section('Response') },
            responseCode: { via: () => Test.Code('Daily breakdown response') },
            emailPreview: { via: () => Test.Section('Email Preview') },
            backfill: { via: () => Test.Section('Backfill Breakdowns') },
            backfillButton: { role: 'button', name: 'Backfill DailyBreakdown from raw data' },
            backfillingButton: { role: 'button', name: 'Backfilling...' },
            backfillCode: { via: () => Test.Code('Backfill response') },
        } satisfies ElementMap
    }

    override get Flow() {
        return {
            ...super.Flow,
            runDailyBreakdown: async () => {
                await this.Get.dailyBreakdown().Do.toggle()
                await Accessor.user.click(this.Get.dailyBreakdownButton())
            },
            runBackfill: async () => {
                await this.Get.dailyBreakdown().Do.toggle()
                await this.Get.backfill().Do.toggle()
                await Accessor.user.click(this.Get.backfillButton())
            },
        }
    }
}
