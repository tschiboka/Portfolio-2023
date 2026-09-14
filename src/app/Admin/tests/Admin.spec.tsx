import { screen, waitFor } from '@testing-library/react'
import { AdminMocks } from './Admin.mocks'
import { AdminTestUtils } from './Admin.spec.utils'

const { buttons, heading, sections } = AdminTestUtils.labels

describe('Admin', () => {
    describe('Layout', () => {
        it('should render the page heading', () => {
            AdminTestUtils.customRender()
            expect(screen.getByRole('heading', { name: heading })).toBeDefined()
        })

        it('should render the daily breakdown section', () => {
            AdminTestUtils.customRender()
            expect(AdminTestUtils.section(sections.dailyBreakdown).Get.title()).toBe(
                sections.dailyBreakdown,
            )
        })
    })

    describe('Backfill', () => {
        it('should render the upserted count from the response', async () => {
            const { user } = AdminTestUtils.customRender()

            await AdminTestUtils.section(sections.dailyBreakdown).Do.toggle()
            await AdminTestUtils.section(sections.backfill).Do.toggle()
            await user.click(await screen.findByRole('button', { name: buttons.backfill }))

            await waitFor(() =>
                expect(
                    screen.getByText(String(AdminMocks.backfill.build().upserted)),
                ).toBeDefined(),
            )
        })
    })
})
