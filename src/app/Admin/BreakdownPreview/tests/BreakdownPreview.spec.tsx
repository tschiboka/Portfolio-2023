import { describe, expect, it } from 'vitest'
import { BreakdownPreviewTestUtils } from './BreakdownPreview.spec.utils'
import { BreakdownPreviewMocks } from './BreakdownPreview.mocks'

const labels = BreakdownPreviewTestUtils.labels

describe('BreakdownPreview', () => {
    describe('Header', () => {
        it('should render the daily breakdown title', () => {
            const preview = BreakdownPreviewTestUtils.renderPreview()
            expect(preview.Get.heading(labels.titles.header)).toBeDefined()
        })

        it('should render the automated analytics summary', () => {
            const preview = BreakdownPreviewTestUtils.renderPreview()
            expect(preview.Get.byText(labels.sub)).toBeDefined()
        })
    })

    describe('Data sections', () => {
        it('should render a Visits section with an eye icon', () => {
            const preview = BreakdownPreviewTestUtils.renderPreview()
            expect(preview.Get.heading(labels.titles.visits)).toBeDefined()
            expect(preview.Get.icon(labels.icons.eye)).toBeDefined()
        })

        it('should render a Likes section with a heart icon', () => {
            const preview = BreakdownPreviewTestUtils.renderPreview()
            expect(preview.Get.heading(labels.titles.likes)).toBeDefined()
            expect(preview.Get.icon(labels.icons.heart)).toBeDefined()
        })
    })

    describe('Stat cards', () => {
        it('should render Today and Total stat labels', () => {
            const preview = BreakdownPreviewTestUtils.renderPreview()
            expect(preview.Get.allByText(labels.statLabels[0]).length).toBeGreaterThan(0)
            expect(preview.Get.allByText(labels.statLabels[1]).length).toBeGreaterThan(0)
        })

        it('should render the visits totals from the mock', () => {
            const preview = BreakdownPreviewTestUtils.renderPreview()
            expect(
                preview.Get.statValue(BreakdownPreviewMocks.breakdown.visits.todayCount),
            ).toBeDefined()
            expect(
                preview.Get.statValue(BreakdownPreviewMocks.breakdown.visits.totalCount),
            ).toBeDefined()
        })
    })

    describe('Breakdown table', () => {
        it('should render a row for each visited path', () => {
            const preview = BreakdownPreviewTestUtils.renderPreview()
            for (const item of BreakdownPreviewMocks.breakdown.visits.today) {
                expect(preview.Get.allByText(item.path).length).toBeGreaterThan(0)
            }
        })

        it('should render the today count for a path', () => {
            const preview = BreakdownPreviewTestUtils.renderPreview()
            expect(
                preview.Get.statValue(BreakdownPreviewMocks.breakdown.visits.today[0].count),
            ).toBeDefined()
        })

        it('should match a total against its path', () => {
            const preview = BreakdownPreviewTestUtils.renderPreview()
            const first = BreakdownPreviewMocks.breakdown.visits.total[0]
            expect(preview.Get.statValue(first.count)).toBeDefined()
        })

        it('should fall back to 0 for the total when a path is absent from totals', () => {
            BreakdownPreviewTestUtils.render({ breakdown: BreakdownPreviewMocks.fallbackBreakdown })
            const preview = BreakdownPreviewTestUtils.get()
            const totalCell = preview.Get.tableRowTotal('/orphan')
            expect(totalCell?.textContent).toBe('0')
        })
    })

    describe('Signature', () => {
        it('should render the signature name', () => {
            const preview = BreakdownPreviewTestUtils.renderPreview()
            expect(preview.Get.byText('Tivadar Debnar')).toBeDefined()
        })

        it('should render the signature avatar', () => {
            const preview = BreakdownPreviewTestUtils.renderPreview()
            expect(preview.Get.icon('Tivadar Debnar')).toBeDefined()
        })
    })
})

describe('BreakdownPreview — empty data', () => {
    it('should show the empty-state message for both sections', () => {
        BreakdownPreviewTestUtils.render({ breakdown: BreakdownPreviewMocks.emptyBreakdown })
        const preview = BreakdownPreviewTestUtils.get()
        expect(preview.Get.allByText(labels.empty)).toHaveLength(2)
    })

    it('should render zero stat values', () => {
        BreakdownPreviewTestUtils.render({ breakdown: BreakdownPreviewMocks.emptyBreakdown })
        const preview = BreakdownPreviewTestUtils.get()
        expect(preview.Get.allByText('0').length).toBeGreaterThan(0)
    })
})
