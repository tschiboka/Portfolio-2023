import { TestMocks } from '@common-mocks'
import { ClientMessage } from '@common-utils'
import { AdminHarness } from './Admin.harness'
import { AdminMockHandlers } from './Admin.mockHandlers'
import { AdminMocks } from './Admin.mocks'

describe('Admin', () => {
    describe('Layout', () =>
        it('should render every section behind the heading', async () => {
            const { Expect, Get } = AdminHarness.Render()
            Expect.text.heading('Admin')
            await Get.dailyBreakdown().Do.toggle()

            Expect.text.dailyBreakdown('Portfolio and API Daily Breakdown')
            Expect.text.emailPreview('Email Preview')
            Expect.text.backfill('Backfill Breakdowns')
        }))

    describe('Daily breakdown', () => {
        it('should render the response once the job is triggered', async () => {
            const { Expect, Flow, Wait } = AdminHarness.Render()
            await Flow.runDailyBreakdown()
            await Wait.responseCode()

            Expect.text.responseCode(AdminMocks.expected.dailyBreakdown)
        })

        it('should disable the button and label it until the job answers', async () => {
            const dailyBreakdown = AdminMockHandlers.DailyBreakdown.Hold()
            const { Expect, Flow, WaitFor } = AdminHarness.Render({ handlers: [dailyBreakdown] })

            await Flow.runDailyBreakdown()
            Expect.disabled.sendingButton()
            dailyBreakdown.release()

            await WaitFor.gone.sendingButton()
        })

        it('should render the server message when the job is rejected', async () => {
            const { Expect, Flow, Wait } = AdminHarness.Render({
                handlers: [AdminMockHandlers.DailyBreakdown.PostRejected],
            })

            await Flow.runDailyBreakdown()
            await Wait.response()
            Expect.text.response(TestMocks.message)
        })

        it('should fall back to the client message when the rejection carries none', async () => {
            const { Expect, Flow, Wait } = AdminHarness.Render({
                handlers: [AdminMockHandlers.DailyBreakdown.PostRejectedNoMessage],
            })

            await Flow.runDailyBreakdown()

            await Wait.response()
            Expect.text.response(ClientMessage.Failure.Handle('daily breakdown'))
        })
    })

    describe('Backfill', () => {
        it('should render the upserted count from the response', async () => {
            const { Expect, Flow, Wait } = AdminHarness.Render()

            await Flow.runBackfill()
            await Wait.backfillCode()

            Expect.text.backfillCode(AdminMocks.expected.backfill)
        })

        it('should disable the button and label it until the job answers', async () => {
            const backfill = AdminMockHandlers.Backfill.Hold()
            const { Expect, Flow, WaitFor } = AdminHarness.Render({ handlers: [backfill] })

            await Flow.runBackfill()
            Expect.disabled.backfillingButton()

            backfill.release()
            await WaitFor.gone.backfillingButton()
        })
    })
})
