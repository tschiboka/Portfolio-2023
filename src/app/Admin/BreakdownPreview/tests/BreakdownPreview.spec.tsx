import { describe, expect, it } from 'vitest'
import { BreakdownPreviewTestUtils } from './BreakdownPreview.spec.utils'
import { EmptyBreakdown, FallbackBreakdown, MockBreakdown } from './BreakdownPreview.mocks'

const labels = BreakdownPreviewTestUtils.labels

describe('BreakdownPreview', () => {
    describe('Header', () => {
        it('renders the daily breakdown title', () => {
            const preview = BreakdownPreviewTestUtils.renderPreview()
            expect(preview.Get.heading(labels.titles.header)).toBeDefined()
        })

        it('renders the automated analytics summary', () => {
            const preview = BreakdownPreviewTestUtils.renderPreview()
            expect(preview.Get.byText(labels.sub)).toBeDefined()
        })
    })

    describe('Data sections', () => {
        it('renders a Visits section with an eye icon', () => {
            const preview = BreakdownPreviewTestUtils.renderPreview()
            expect(preview.Get.heading(labels.titles.visits)).toBeDefined()
            expect(preview.Get.icon(labels.icons.eye)).toBeDefined()
        })

        it('renders a Likes section with a heart icon', () => {
            const preview = BreakdownPreviewTestUtils.renderPreview()
            expect(preview.Get.heading(labels.titles.likes)).toBeDefined()
            expect(preview.Get.icon(labels.icons.heart)).toBeDefined()
        })
    })

    describe('Stat cards', () => {
        it('renders Today and Total stat labels', () => {
            const preview = BreakdownPreviewTestUtils.renderPreview()
            expect(preview.Get.allByText(labels.statLabels[0]).length).toBeGreaterThan(0)
            expect(preview.Get.allByText(labels.statLabels[1]).length).toBeGreaterThan(0)
        })

        it('renders the visits totals from the mock', () => {
            const preview = BreakdownPreviewTestUtils.renderPreview()
            expect(preview.Get.statValue(MockBreakdown.visits.todayCount)).toBeDefined()
            expect(preview.Get.statValue(MockBreakdown.visits.totalCount)).toBeDefined()
        })
    })

    describe('Breakdown table', () => {
        it('renders a row for each visited path', () => {
            const preview = BreakdownPreviewTestUtils.renderPreview()
            for (const item of MockBreakdown.visits.today) {
                expect(preview.Get.allByText(item.path).length).toBeGreaterThan(0)
            }
        })

        it('renders the today count for a path', () => {
            const preview = BreakdownPreviewTestUtils.renderPreview()
            expect(preview.Get.statValue(MockBreakdown.visits.today[0].count)).toBeDefined()
        })

        it('matches a total against its path', () => {
            const preview = BreakdownPreviewTestUtils.renderPreview()
            const first = MockBreakdown.visits.total[0]
            expect(preview.Get.statValue(first.count)).toBeDefined()
        })

        it('falls back to 0 for the total when a path is absent from totals', () => {
            BreakdownPreviewTestUtils.render({ breakdown: FallbackBreakdown })
            const preview = BreakdownPreviewTestUtils.get()
            const totalCell = preview.Get.tableRowTotal('/orphan')
            expect(totalCell?.textContent).toBe('0')
        })
    })

    describe('Signature', () => {
        it('renders the signature name', () => {
            const preview = BreakdownPreviewTestUtils.renderPreview()
            expect(preview.Get.byText('Tivadar Debnar')).toBeDefined()
        })

        it('renders the signature avatar', () => {
            const preview = BreakdownPreviewTestUtils.renderPreview()
            expect(preview.Get.icon('Tivadar Debnar')).toBeDefined()
        })
    })
})

describe('BreakdownPreview — empty data', () => {
    it('shows the empty-state message for both sections', () => {
        BreakdownPreviewTestUtils.render({ breakdown: EmptyBreakdown })
        const preview = BreakdownPreviewTestUtils.get()
        expect(preview.Get.allByText(labels.empty)).toHaveLength(2)
    })

    it('renders zero stat values', () => {
        BreakdownPreviewTestUtils.render({ breakdown: EmptyBreakdown })
        const preview = BreakdownPreviewTestUtils.get()
        expect(preview.Get.allByText('0').length).toBeGreaterThan(0)
    })
})
