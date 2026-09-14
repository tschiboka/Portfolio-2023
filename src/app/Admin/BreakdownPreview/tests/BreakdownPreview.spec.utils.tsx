import { render } from '@testing-library/react'
import { Accessor } from '@common-ux/Test'
import { BreakdownPreview as BreakdownPreviewComponent } from '../BreakdownPreview'
import { MockBreakdown } from './BreakdownPreview.mocks'
import type { BreakdownPreviewProps } from '../BreakdownPreview.types'

class BreakdownPreviewAccessor extends Accessor {
    get Get() {
        return {
            ...super.Get,
            icon: (name: string) => this.scope.getByRole('img', { name }),
            heading: (name: string | RegExp) => this.scope.getByRole('heading', { name }),
            statValue: (value: number) => this.scope.getByText(String(value)),
            allByText: (text: string | RegExp) => this.scope.getAllByText(text),
            tableRowTotal: (path: string) =>
                this.scope.getByText(path).closest('tr')?.querySelector('td:last-child'),
        }
    }
}

export const BreakdownPreviewTestUtils = {
    labels: {
        titles: {
            header: /Daily Breakdown Report/i,
            visits: /Visits/i,
            likes: /Likes/i,
        },
        sub: 'Automated analytics summary',
        statLabels: ['Today', 'Total'],
        empty: 'No data today',
        icons: { eye: 'eye', heart: 'heart' },
    } as const,

    /** Returns a preview accessor bound to the rendered shell. */
    get: (context = 'BreakdownPreview'): BreakdownPreviewAccessor => {
        const element = Accessor.screen
            .getByText(BreakdownPreviewTestUtils.labels.titles.header)
            .closest('.bp-shell') as HTMLElement
        return new BreakdownPreviewAccessor(element, context)
    },

    /** Mounts the preview with the given props. */
    render: (props: BreakdownPreviewProps) => render(<BreakdownPreviewComponent {...props} />),

    /** Renders the preview with the standard mock and returns an accessor bound to it. */
    renderPreview: (): BreakdownPreviewAccessor => {
        BreakdownPreviewTestUtils.render({ breakdown: MockBreakdown })
        return BreakdownPreviewTestUtils.get()
    },
}
